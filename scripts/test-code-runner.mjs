import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { Worker as NodeWorker } from 'node:worker_threads';
import { computed, ref, watch } from 'vue';
import ts from 'typescript';
import { useEditorKeyboard } from '../docs/.vitepress/theme/components/editorKeyboard.ts';

const component = readFileSync(new URL('../docs/.vitepress/theme/components/CodeRunner.vue', import.meta.url), 'utf8');
const script = component.match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1].replace(/^import .*\r?\n/gm, '');
const compiled = ts.transpile(script + `
globalThis.runner = {
  runCode,
  setCode: code => { editableCode.value = code; },
  state: () => ({ status: runState.value, stdout: output.value, rubyResult: rubyResult.value, stderr: standardError.value, error: executionError.value, label: statusText.value }),
};`, { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 });

function createRunner({ language = 'javascript', code = '', runtime = {}, loadScript, shortenLoadTimeout = false, fetchRuntimeImpl, compileRuntime } = {}) {
  const urls = new Map();
  const workers = new Set();
  const terminations = [];
  const hooks = [];
  const scripts = [];
  let nextUrl = 0;
  const windowState = {
    setTimeout: (callback, delay) => setTimeout(callback, shortenLoadTimeout && delay === 30000 ? 10 : delay),
    clearTimeout,
    ...runtime,
  };
  class WorkerAdapter {
    constructor(url) {
      const source = urls.get(url);
      this.worker = new NodeWorker(`
        const { parentPort } = require('node:worker_threads');
        const self = globalThis;
        self.postMessage = data => parentPort.postMessage(data);
        ${source}
        parentPort.on('message', data => self.onmessage({ data }));
      `, { eval: true });
      workers.add(this);
      this.worker.on('message', data => this.onmessage?.({ data }));
      this.worker.on('error', error => this.onerror?.({ message: error.message }));
    }
    postMessage(code) { this.worker.postMessage(code); }
    terminate() { workers.delete(this); terminations.push(this.worker.terminate()); }
  }
  const context = vm.createContext({
    computed, ref, watch, useEditorKeyboard,
    useId: () => 'runner-keyboard-test',
    useData: () => ({ isDark: ref(false) }),
    defineProps: () => ({ language, initialCode: code }),
    withDefaults: (props, defaults) => ({ ...defaults, ...props }),
    onBeforeUnmount: callback => hooks.push(callback),
    performance, AbortController, window: windowState,
    Blob: class { constructor(parts) { this.source = parts.join(''); } },
    URL: {
      createObjectURL: blob => { const url = `test:${++nextUrl}`; urls.set(url, blob.source); return url; },
      revokeObjectURL: url => urls.delete(url),
    },
    Worker: WorkerAdapter,
    document: {
      createElement: () => ({ src: '', removed: false, remove() { this.removed = true; } }),
      head: { appendChild(script) { scripts.push(script); loadScript?.(script, windowState); } },
    },
    fetch: fetchRuntimeImpl || (() => Promise.reject(new Error('Unexpected network access in unit test'))),
    WebAssembly: { compile: compileRuntime || WebAssembly.compile },
  });
  vm.runInContext(compiled, context);
  return { ...context.runner, scripts, urls, workers, runtime: windowState, dispose: () => hooks.forEach(hook => hook()), cleanup: () => Promise.all(terminations) };
}

test('JavaScript exception preserves earlier stdout and identifies the correct engine', async () => {
  const runner = createRunner({ code: "console.log('before'); throw new Error('audit-runtime-error');" });
  await runner.runCode();
  assert.equal(runner.state().status, 'error');
  assert.equal(runner.state().stdout, 'before\n');
  assert.match(runner.state().error, /audit-runtime-error/);
  assert.match(runner.state().label, /JavaScript \/ Web Worker/);
  assert.doesNotMatch(runner.state().label, /WASM/);
  assert.equal(runner.workers.size, 0);
  assert.equal(runner.urls.size, 0);
  await runner.cleanup();
});

test('JavaScript stderr is separate and an empty program is a successful empty result', async () => {
  const runner = createRunner({ code: "console.log('out'); console.error('err');" });
  await runner.runCode();
  assert.equal(runner.state().status, 'success');
  assert.equal(runner.state().stdout, 'out\n');
  assert.equal(runner.state().stderr, '[ERROR] err\n');
  await runner.cleanup();
  const empty = createRunner();
  await empty.runCode();
  assert.equal(empty.state().status, 'success');
  assert.equal(empty.state().stdout, '');
  assert.match(empty.state().label, /无输出/);
  await empty.cleanup();
});

test('the real 5-second Worker timeout terminates an infinite program and supports retry', async () => {
  const runner = createRunner({ code: "console.log('started'); while (true) {}" });
  await runner.runCode();
  assert.equal(runner.state().status, 'timeout');
  assert.match(runner.state().error, /5000ms.*Web Worker 已终止/);
  assert.equal(runner.state().stdout, 'started\n');
  assert.equal(runner.workers.size, 0);
  assert.equal(runner.urls.size, 0);
  // Repeating the call must create a fresh Worker and terminate it, rather than keeping a failed promise.
  const retry = runner.runCode();
  runner.dispose();
  await retry;
  assert.equal(runner.workers.size, 0);
  await runner.cleanup();
});

test('component disposal cancels a pending Worker and revokes its object URL', async () => {
  const runner = createRunner({ code: 'await new Promise(() => {});' });
  const pending = runner.runCode();
  assert.equal(runner.workers.size, 1);
  runner.dispose();
  await pending;
  assert.equal(runner.workers.size, 0);
  assert.equal(runner.urls.size, 0);
  await runner.cleanup();
});

test('Python exceptions retain streamed stdout while reporting the error independently', async () => {
  let stdout;
  let stderr;
  const pyodide = {
    setStdout: options => { stdout = options.batched; },
    setStderr: options => { stderr = options.batched; },
    runPythonAsync: async () => { stdout('before'); stderr('trace'); throw new Error('audit-python-error'); },
  };
  const runner = createRunner({ language: 'python', runtime: { pyodide } });
  await runner.runCode();
  assert.equal(runner.state().status, 'error');
  assert.equal(runner.state().stdout, 'before\n');
  assert.equal(runner.state().stderr, 'trace\n');
  assert.equal(runner.state().error, 'audit-python-error');
});

test('PHP error events are not treated as successful standard output', async () => {
  class PhpWeb {
    listeners = {};
    binary = Promise.resolve();
    addEventListener(name, callback) { this.listeners[name] = callback; }
    async run() { this.listeners.output({ detail: 'before' }); this.listeners.error({ detail: 'audit-php-error' }); return 255; }
  }
  const runner = createRunner({ language: 'php', runtime: { PhpWeb } });
  await runner.runCode();
  assert.equal(runner.state().status, 'error');
  assert.equal(runner.state().stdout, 'before');
  assert.equal(runner.state().stderr, 'audit-php-error\n');
});

test('a failed runtime script is removed and a later run loads it again successfully', async () => {
  let attempts = 0;
  const runner = createRunner({ language: 'python', loadScript: (script, window) => {
    queueMicrotask(() => {
      if (++attempts === 1) script.onerror();
      else {
        window.loadPyodide = async () => ({ setStdout() {}, setStderr() {}, runPythonAsync: async () => undefined });
        script.onload();
      }
    });
  } });
  await runner.runCode();
  assert.equal(runner.state().status, 'error');
  assert.match(runner.state().label, /加载失败/);
  assert.equal(runner.scripts[0].removed, true);
  await runner.runCode();
  assert.equal(attempts, 2);
  assert.equal(runner.state().status, 'success');
});

test('runtime script timeout is separate from stdout and cleans the failed script', async () => {
  const runner = createRunner({ language: 'python', shortenLoadTimeout: true });
  await runner.runCode();
  assert.equal(runner.state().status, 'timeout');
  assert.equal(runner.state().stdout, '');
  assert.match(runner.state().error, /运行时脚本加载超过 30 秒/);
  assert.equal(runner.scripts[0].removed, true);
});

test('Pyodide initialization timeout permits retry and ignores a late VM from the failed attempt', async () => {
  let completeFirstAttempt;
  let attempts = 0;
  const lateVm = { name: 'late VM' };
  const acceptedVm = { setStdout() {}, setStderr() {}, runPythonAsync: async () => 42 };
  const runner = createRunner({ language: 'python', shortenLoadTimeout: true, runtime: {
    loadPyodide: () => ++attempts === 1
      ? new Promise(resolve => { completeFirstAttempt = resolve; })
      : Promise.resolve(acceptedVm),
  } });
  await runner.runCode();
  assert.equal(runner.state().status, 'timeout');
  assert.match(runner.state().label, /运行时加载超时/);
  assert.match(runner.state().error, /初始化超过 30 秒/);
  assert.equal(runner.state().stdout, '');
  assert.equal(runner.runtime.pyodide, undefined);

  await runner.runCode();
  assert.equal(attempts, 2);
  assert.equal(runner.state().status, 'success');
  assert.equal(runner.state().stdout, '=> 42');
  assert.equal(runner.runtime.pyodide, acceptedVm);
  completeFirstAttempt(lateVm);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(runner.runtime.pyodide, acceptedVm);
  assert.equal(runner.state().status, 'success');
  assert.equal(runner.state().stdout, '=> 42');
});

test('Pyodide initialization failure is not cached and a retry can initialize again', async () => {
  let attempts = 0;
  const acceptedVm = { setStdout() {}, setStderr() {}, runPythonAsync: async () => undefined };
  const runner = createRunner({ language: 'python', runtime: {
    loadPyodide: async () => { if (++attempts === 1) throw new Error('audit-init-error'); return acceptedVm; },
  } });
  await runner.runCode();
  assert.equal(runner.state().status, 'error');
  assert.equal(runner.state().error, 'audit-init-error');
  assert.match(runner.state().label, /运行时加载失败/);
  assert.equal(runner.runtime.pyodide, undefined);
  await runner.runCode();
  assert.equal(attempts, 2);
  assert.equal(runner.state().status, 'success');
  assert.equal(runner.runtime.pyodide, acceptedVm);
});

test('component disposal prevents a pending Pyodide initialization from caching its late result', async () => {
  let completeInitialization;
  const runner = createRunner({ language: 'python', runtime: {
    loadPyodide: () => new Promise(resolve => { completeInitialization = resolve; }),
  } });
  const pending = runner.runCode();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(runner.state().status, 'loading');
  runner.dispose();
  await pending;
  completeInitialization({ name: 'disposed VM' });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(runner.runtime.pyodide, undefined);
});

test('Ruby still uses the existing eval result interface', async () => {
  const runner = createRunner({ language: 'ruby', code: '21 * 2', runtime: { rubyVmInstance: { eval: code => ({ toString: () => code === '21 * 2' ? '42' : '' }) } } });
  await runner.runCode();
  assert.equal(runner.state().status, 'success');
  assert.equal(runner.state().stdout, '');
  assert.equal(runner.state().rubyResult, '42');
  assert.match(runner.state().label, /Ruby \/ Ruby WASM/);
});

test('PHP zero exit code preserves stdout and nonfatal stderr', async () => {
  class PhpWeb {
    binary = Promise.resolve();
    listeners = {};
    addEventListener(name, callback) { this.listeners[name] = callback; }
    async run() { this.listeners.output({ detail: 'ok' }); this.listeners.error({ detail: 'warning' }); return 0; }
  }
  const runner = createRunner({ language: 'php', runtime: { PhpWeb } });
  await runner.runCode();
  assert.equal(runner.state().status, 'success');
  assert.equal(runner.state().stdout, 'ok');
  assert.equal(runner.state().stderr, 'warning\n');
});

test('PHP initialization timeout restores the button and ignores a late instance', async () => {
  let complete;
  class PhpWeb { binary = new Promise(resolve => { complete = resolve; }); }
  const runner = createRunner({ language: 'php', runtime: { PhpWeb }, shortenLoadTimeout: true });
  await runner.runCode();
  assert.equal(runner.state().status, 'timeout');
  complete();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(runner.state().status, 'timeout');
});

test('Ruby initializes using the published global and callable DefaultRubyVM', async () => {
  let calls = 0;
  const rubyVm = { eval: code => ({ toString: () => code === '21 * 2' ? '42' : '' }) };
  const runner = createRunner({ language: 'ruby', code: '21 * 2', runtime: {
    'ruby-wasm-wasi': { DefaultRubyVM: async module => { assert.equal(module, 'compiled'); calls++; return { vm: rubyVm }; } },
  }, fetchRuntimeImpl: async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(0) }), compileRuntime: async () => 'compiled' });
  await runner.runCode();
  await runner.runCode();
  assert.equal(calls, 1);
  assert.equal(runner.state().rubyResult, '42');
  assert.equal(runner.state().status, 'success');
});

test('Ruby exception retains stdout/stderr, restores streams and allows retry', async () => {
  let restores = 0;
  const runner = createRunner({ language: 'ruby', code: 'raise', runtime: { rubyVmInstance: { eval: code => {
    if (code === 'raise') throw new Error('ruby-failure');
    if (code.startsWith('$stdout =')) restores++;
    return { toString: () => code === '$hello_lang_output.string' ? 'before\n' : code === '$hello_lang_errors.string' ? 'warning\n' : code === '42' ? '42' : '' };
  } } } });
  await runner.runCode();
  assert.equal(runner.state().status, 'error');
  assert.equal(runner.state().stdout, 'before\n');
  assert.equal(runner.state().stderr, 'warning\n');
  runner.setCode('42');
  await runner.runCode();
  assert.equal(runner.state().status, 'success');
  assert.equal(runner.state().rubyResult, '42');
  assert.equal(restores, 2);
});
