<template>
  <div class="hw-card code-runner" :class="{ 'is-dark': isDark }">
    <div class="runner-header">
      <div class="runner-title">
        <span class="runner-icon">⚡</span>
        <strong>{{ title || '浏览器本地即时运行沙箱' }}</strong>
        <span class="lang-badge">{{ language.toUpperCase() }}</span>
      </div>
      <button class="run-btn" type="button" :disabled="isRunning" @click="runCode">
        {{ runState === 'loading' ? '加载运行时…' : isRunning ? '运行中…' : runState === 'error' || runState === 'timeout' ? '重新运行' : '运行代码' }}
        <span>({{ runtimeLabel }})</span>
      </button>
    </div>
    <p class="runner-status" :data-state="runState" role="status" aria-live="polite">
      <span>{{ statusText }}</span>
      <span v-if="execTime !== null">耗时: {{ execTime }}ms</span>
    </p>

    <div class="editor-area">
      <div class="editor-shell">
        <pre ref="highlightLayer" class="highlight-layer" aria-hidden="true"><code v-html="highlightedCode"></code></pre>
        <textarea
          ref="editorInput"
          v-model="editableCode"
          class="code-input"
          :aria-label="`${language.toUpperCase()} 可编辑源码`"
          :aria-describedby="keyboardHintId"
          spellcheck="false"
          wrap="off"
          @scroll="syncScroll"
          @keydown="handleEditorKeydown"
          @blur="resetEditorNavigation"
        ></textarea>
      </div>
      <p :id="keyboardHintId" class="editor-hint" aria-live="polite">{{ keyboardHint }}</p>
    </div>

    <div class="output-area" v-if="output !== null">
      <div class="output-header">
        <span>标准输出 (stdout)</span>
      </div>
      <pre v-if="output" class="output-content"><code>{{ output }}</code></pre>
      <p v-else class="empty-output">{{ runState === 'success' ? '程序执行成功，无输出。' : isRunning ? '等待程序输出…' : '本次执行没有输出。' }}</p>
    </div>
    <div v-if="rubyResult !== null" class="output-area">
      <div class="output-header"><span>Ruby 求值结果</span></div>
      <pre class="output-content"><code>{{ rubyResult }}</code></pre>
    </div>
    <div v-if="standardError" class="stderr-area">
      <strong>错误输出 (stderr)</strong>
      <pre><code>{{ standardError }}</code></pre>
    </div>
    <div v-if="executionError" class="execution-error" role="alert">
      <strong>{{ languageLabel }} {{ runState === 'timeout' ? failedDuringLoading ? '运行时加载超时' : '执行超时' : failedDuringLoading ? '运行时加载失败' : '执行失败' }}</strong>
      <pre><code>{{ executionError }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue';
import { useData } from 'vitepress';
import { useEditorKeyboard } from './editorKeyboard';

const props = withDefaults(
  defineProps<{
    language?: 'javascript' | 'python' | 'php' | 'ruby';
    initialCode: string;
    title?: string;
  }>(),
  {
    language: 'javascript',
  }
);

const { isDark } = useData();

function formatCode(raw: string): string {
  return raw || '';
}

const editableCode = ref(formatCode(props.initialCode));
type RunState = 'idle' | 'loading' | 'running' | 'success' | 'error' | 'timeout';
const runState = ref<RunState>('idle');
const isRunning = computed(() => runState.value === 'loading' || runState.value === 'running');
const output = ref<string | null>(null);
const rubyResult = ref<string | null>(null);
const standardError = ref('');
const executionError = ref('');
const failedDuringLoading = ref(false);
const execTime = ref<number | null>(null);
const highlightLayer = ref<HTMLPreElement | null>(null);
const editorInput = ref<HTMLTextAreaElement | null>(null);
const keyboardHintId = useId();
const { keyboardHint, handleEditorKeydown, resetEditorNavigation } = useEditorKeyboard(editableCode, editorInput);
const languageLabel = computed(() => ({ javascript: 'JavaScript', python: 'Python', php: 'PHP', ruby: 'Ruby' })[props.language]);
const runtimeLabel = computed(() => ({ javascript: 'Web Worker', python: 'Pyodide WASM', php: 'PHP WASM', ruby: 'Ruby WASM' })[props.language]);
const statusText = computed(() => {
  const labels: Record<RunState, string> = {
    idle: '尚未运行', loading: '正在加载运行时', running: '正在执行',
    success: output.value || rubyResult.value !== null ? '执行成功' : '执行成功 · 无输出',
    error: failedDuringLoading.value ? '运行时加载失败 · 可重试' : '执行失败 · 可重试',
    timeout: failedDuringLoading.value ? '运行时加载超时 · 可重试' : '执行超时 · 可重试',
  };
  return `${languageLabel.value} / ${runtimeLabel.value} · ${labels[runState.value]}`;
});
let cancelActiveWorker: (() => void) | undefined;
let cancelPyodideInitialization: (() => void) | undefined;
let cancelRuntimeInitialization: (() => void) | undefined;

function initializeRuntime<T>(label: string, load: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const cancel = () => finish(new Error(`${label} 运行时初始化已取消`));
    const timer = window.setTimeout(() => finish(new RunnerTimeoutError(`${label} 运行时初始化超过 30 秒，请重试`)), 30000);
    cancelRuntimeInitialization = cancel;
    function finish(error?: unknown, value?: T) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      if (cancelRuntimeInitialization === cancel) cancelRuntimeInitialization = undefined;
      if (error) reject(error);
      else resolve(value as T);
    }
    Promise.resolve().then(load).then(value => finish(undefined, value), error => finish(error));
  });
}

type RunnerLanguage = 'javascript' | 'python' | 'php' | 'ruby';

const languageKeywords: Record<RunnerLanguage, Set<string>> = {
  javascript: new Set([
    'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
    'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'from',
    'function', 'get', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'of', 'return',
    'set', 'static', 'super', 'switch', 'throw', 'try', 'typeof', 'var', 'void', 'while',
    'with', 'yield',
  ]),
  python: new Set([
    'and', 'as', 'assert', 'async', 'await', 'break', 'case', 'class', 'continue', 'def',
    'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import',
    'in', 'is', 'lambda', 'match', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'try', 'while', 'with', 'yield',
  ]),
  php: new Set([
    'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class',
    'clone', 'const', 'continue', 'declare', 'default', 'do', 'echo', 'else', 'elseif',
    'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile',
    'enum', 'eval', 'exit', 'extends', 'final', 'finally', 'fn', 'for', 'foreach',
    'function', 'global', 'goto', 'if', 'implements', 'include', 'include_once',
    'instanceof', 'insteadof', 'interface', 'isset', 'list', 'match', 'namespace', 'new',
    'or', 'print', 'private', 'protected', 'public', 'readonly', 'require', 'require_once',
    'return', 'static', 'switch', 'throw', 'trait', 'try', 'unset', 'use', 'while', 'xor',
    'yield',
  ]),
  ruby: new Set([
    'alias', 'and', 'begin', 'break', 'case', 'class', 'def', 'defined', 'do', 'else',
    'elsif', 'end', 'ensure', 'for', 'if', 'in', 'module', 'next', 'not', 'or', 'redo',
    'rescue', 'retry', 'return', 'self', 'super', 'then', 'undef', 'unless', 'until',
    'when', 'while', 'yield',
  ]),
};

const literalWords = new Set([
  'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
  'True', 'False', 'None', 'nil', '__FILE__', '__LINE__',
]);

const builtinWords = new Set([
  'console', 'JSON', 'Math', 'Promise', 'Array', 'Object', 'String', 'Number', 'Date',
  'print', 'len', 'range', 'str', 'int', 'float', 'dict', 'list', 'set', 'tuple',
  'puts', 'p', 'require', 'attr_reader', 'attr_writer', 'attr_accessor',
]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function token(kind: string, value: string) {
  return `<span class="tok-${kind}">${escapeHtml(value)}</span>`;
}

function readQuoted(code: string, start: number) {
  const quote = code[start];
  const delimiter = code.slice(start, start + 3) === quote.repeat(3) ? quote.repeat(3) : quote;
  let index = start + delimiter.length;
  while (index < code.length) {
    if (code[index] === '\\') {
      index += 2;
    } else if (code.startsWith(delimiter, index)) {
      return index + delimiter.length;
    } else {
      index += 1;
    }
  }
  return code.length;
}

function highlightCode(code: string, language: RunnerLanguage) {
  let output = '';
  let index = 0;
  const hashComments = language !== 'javascript';
  const slashComments = language === 'javascript' || language === 'php';

  while (index < code.length) {
    if (language === 'php' && (code.startsWith('<?php', index) || code.startsWith('?>', index))) {
      const value = code.startsWith('<?php', index) ? '<?php' : '?>';
      output += token('tag', value);
      index += value.length;
    } else if (code.startsWith('/*', index) && slashComments) {
      const end = code.indexOf('*/', index + 2);
      const stop = end < 0 ? code.length : end + 2;
      output += token('comment', code.slice(index, stop));
      index = stop;
    } else if (code.startsWith('//', index) && slashComments) {
      const end = code.indexOf('\n', index + 2);
      const stop = end < 0 ? code.length : end;
      output += token('comment', code.slice(index, stop));
      index = stop;
    } else if (code[index] === '#' && hashComments) {
      const end = code.indexOf('\n', index + 1);
      const stop = end < 0 ? code.length : end;
      output += token('comment', code.slice(index, stop));
      index = stop;
    } else if ('\"\'`'.includes(code[index])) {
      const stop = readQuoted(code, index);
      output += token('string', code.slice(index, stop));
      index = stop;
    } else if (language === 'php' && code[index] === '$') {
      const match = code.slice(index).match(/^\$[A-Za-z_][\w]*/);
      const value = match?.[0] || '$';
      output += token('variable', value);
      index += value.length;
    } else if (language === 'ruby' && code[index] === ':' && /[A-Za-z_]/.test(code[index + 1] || '')) {
      const match = code.slice(index).match(/^:[A-Za-z_][\w!?=]*/);
      const value = match?.[0] || ':';
      output += token('symbol', value);
      index += value.length;
    } else if (/\d/.test(code[index])) {
      const match = code.slice(index).match(/^(?:0[xob][\da-f_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:e[+-]?\d+)?)/i);
      const value = match?.[0] || code[index];
      output += token('number', value);
      index += value.length;
    } else if (/[A-Za-z_]/.test(code[index])) {
      const match = code.slice(index).match(/^[A-Za-z_][\w!?=]*/);
      const value = match?.[0] || code[index];
      const remainder = code.slice(index + value.length);
      if (languageKeywords[language].has(value)) output += token('keyword', value);
      else if (literalWords.has(value)) output += token('literal', value);
      else if (builtinWords.has(value)) output += token('builtin', value);
      else if (/^\s*\(/.test(remainder)) output += token('function', value);
      else output += escapeHtml(value);
      index += value.length;
    } else {
      const value = code[index];
      if (/[{}()[\],.;:+\-*/%=&|!<>?~^]/.test(value)) output += token('punctuation', value);
      else output += escapeHtml(value);
      index += 1;
    }
  }

  return output;
}

const highlightedCode = computed(() => {
  const rendered = highlightCode(editableCode.value, props.language);
  return editableCode.value.endsWith('\n') ? `${rendered}\n` : rendered;
});

function syncScroll() {
  if (!highlightLayer.value || !editorInput.value) return;
  highlightLayer.value.scrollTop = editorInput.value.scrollTop;
  highlightLayer.value.scrollLeft = editorInput.value.scrollLeft;
}

class RunnerTimeoutError extends Error {}

function appendOutput(value: string) {
  output.value = (output.value || '') + value;
}

function runJavaScriptInWorker(code: string, timeoutMs = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    const workerSource = `
      self.fetch = undefined;
      self.XMLHttpRequest = undefined;
      self.WebSocket = undefined;
      self.EventSource = undefined;
      self.Worker = undefined;
      self.SharedWorker = undefined;
      self.importScripts = undefined;

      self.onmessage = async ({ data }) => {
        const stringify = (value) => {
          if (typeof value !== 'object' || value === null) return String(value);
          try { return JSON.stringify(value); } catch { return String(value); }
        };
        const safeConsole = {
          log: (...args) => self.postMessage({ type: 'stdout', output: args.map(stringify).join(' ') + '\\n' }),
          error: (...args) => self.postMessage({ type: 'stderr', output: '[ERROR] ' + args.map(stringify).join(' ') + '\\n' }),
          warn: (...args) => self.postMessage({ type: 'stderr', output: '[WARN] ' + args.map(stringify).join(' ') + '\\n' }),
        };

        try {
          const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
          const execute = new AsyncFunction('console', '"use strict";\\n' + data);
          const result = await execute(safeConsole);
          if (result !== undefined) self.postMessage({ type: 'stdout', output: '=> ' + stringify(result) + '\\n' });
          self.postMessage({ type: 'done' });
        } catch (error) {
          self.postMessage({ type: 'error', message: error?.stack || error?.message || String(error) });
        }
      };
    `;

    const objectUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    let worker: Worker;
    try {
      worker = new Worker(objectUrl);
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      reject(error);
      return;
    }
    let settled = false;
    let timer: number | undefined;
    const cleanup = () => {
      window.clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(objectUrl);
      if (cancelActiveWorker === cancel) cancelActiveWorker = undefined;
    };
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error) reject(error);
      else resolve();
    };
    const cancel = () => finish(new Error('JavaScript 执行已取消，Web Worker 已终止'));
    cancelActiveWorker = cancel;
    timer = window.setTimeout(() => finish(new RunnerTimeoutError(`执行超过 ${timeoutMs}ms，Web Worker 已终止`)), timeoutMs);

    worker.onmessage = ({ data }) => {
      if (settled) return;
      if (data.type === 'stdout') appendOutput(data.output);
      else if (data.type === 'stderr') standardError.value += data.output;
      else if (data.type === 'done') finish();
      else if (data.type === 'error') finish(new Error(data.message || 'JavaScript Web Worker 执行失败'));
    };
    worker.onerror = (event) => {
      finish(new Error(event.message || 'JavaScript Web Worker 加载失败'));
    };
    try { worker.postMessage(code); } catch (error) { finish(error instanceof Error ? error : new Error(String(error))); }
  });
}

function loadRuntimeScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    const timer = window.setTimeout(() => fail(new RunnerTimeoutError('运行时脚本加载超过 30 秒，请检查网络后重试')), 30000);
    function fail(error: Error) {
      window.clearTimeout(timer);
      script.onload = null;
      script.onerror = null;
      script.remove();
      reject(error);
    }
    script.onload = () => { window.clearTimeout(timer); resolve(); };
    script.onerror = () => fail(new Error(`运行时脚本加载失败：${url}`));
    document.head.appendChild(script);
  });
}

function initializePyodide(): Promise<any> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = window.setTimeout(() => fail(new RunnerTimeoutError('Pyodide 运行时初始化超过 30 秒，请重试')), 30000);
    const cancel = () => fail(new Error('Pyodide 运行时初始化已取消'));
    cancelPyodideInitialization = cancel;
    function cleanup() {
      window.clearTimeout(timer);
      if (cancelPyodideInitialization === cancel) cancelPyodideInitialization = undefined;
    }
    function fail(error: unknown) {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    }
    Promise.resolve().then(() => (window as any).loadPyodide()).then((pyodide) => {
      // Initialization cannot be forcibly stopped; discard a VM that arrives after timeout or unmount.
      if (settled) return;
      settled = true;
      cleanup();
      (window as any).pyodide = pyodide;
      resolve(pyodide);
    }, fail);
  });
}

async function fetchRuntime(url: string) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`运行时下载失败：HTTP ${response.status}`);
    return await response.arrayBuffer();
  } catch (error) {
    if (controller.signal.aborted) throw new RunnerTimeoutError('运行时下载超过 30 秒，请检查网络后重试');
    throw error;
  } finally {
    window.clearTimeout(timer);
  }
}

onBeforeUnmount(() => {
  cancelActiveWorker?.();
  cancelPyodideInitialization?.();
  cancelRuntimeInitialization?.();
});

watch(() => props.initialCode, (newVal) => {
  editableCode.value = formatCode(newVal);
});

async function runCode() {
  if (isRunning.value) return;
  runState.value = props.language === 'javascript' ? 'running' : 'loading';
  output.value = '';
  rubyResult.value = null;
  standardError.value = '';
  executionError.value = '';
  failedDuringLoading.value = false;
  execTime.value = null;
  const startTime = performance.now();

  try {
    // 1. JavaScript (原生 Web Worker 沙箱)
    if (props.language === 'javascript') {
      await runJavaScriptInWorker(editableCode.value);
    }

    // 2. Python (Pyodide CPython WASM 虚拟机)
    else if (props.language === 'python') {
      if (!(window as any).pyodide) {
        if (!(window as any).loadPyodide) await loadRuntimeScript('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');
        await initializePyodide();
      }
      const pyodide = (window as any).pyodide;
      runState.value = 'running';
      pyodide.setStdout({
        batched: (str: string) => appendOutput(str + '\n'),
      });
      pyodide.setStderr({ batched: (str: string) => { standardError.value += str + '\n'; } });
      const result = await pyodide.runPythonAsync(editableCode.value);
      if (result !== undefined && result !== null) {
        appendOutput(`=> ${result}`);
      }
    }

    // 3. PHP (PHP-WASM 纯前端 Emscripten 解释器)
    else if (props.language === 'php') {
      const php = await initializeRuntime('PHP', async () => {
        if (!(window as any).PhpWeb) {
          const url = 'https://cdn.jsdelivr.net/npm/php-wasm@0.2.0/PhpWeb.mjs';
          const { PhpWeb } = await import(/* @vite-ignore */ url);
          (window as any).PhpWeb = PhpWeb;
        }
        const instance = new (window as any).PhpWeb({ version: '8.4', autoTransaction: false });
        await instance.binary;
        return instance;
      });
      php.addEventListener('output', (event: any) => {
        appendOutput(String(event.detail));
      });
      php.addEventListener('error', (event: any) => {
        standardError.value += String(event.detail) + '\n';
      });
      runState.value = 'running';
      const exitCode = await php.run(editableCode.value);
      if (exitCode !== 0) throw new Error(`PHP 退出码 ${exitCode}，请查看输出中的错误详情。`);
    }

    // 4. Ruby (Ruby-WASM 官方 CRuby WebAssembly 虚拟机)
    else if (props.language === 'ruby') {
      if (!(window as any).rubyVmInstance) {
        const vm = await initializeRuntime('Ruby', async () => {
          if (!(window as any)['ruby-wasm-wasi']) {
            await loadRuntimeScript('https://cdn.jsdelivr.net/npm/@ruby/wasm-wasi@2.5.0/dist/browser.umd.js');
          }
          const { DefaultRubyVM } = (window as any)['ruby-wasm-wasi'];
          const buffer = await fetchRuntime('https://cdn.jsdelivr.net/npm/@ruby/3.3-wasm-wasi@2.5.0/dist/ruby.wasm');
          const module = await WebAssembly.compile(buffer);
          const { vm } = await DefaultRubyVM(module);
          return vm;
        });
        (window as any).rubyVmInstance = vm;
      }
      const vm = (window as any).rubyVmInstance;
      runState.value = 'running';
      vm.eval('require "stringio"; $hello_lang_stdout = $stdout; $hello_lang_stderr = $stderr; $hello_lang_output = StringIO.new; $hello_lang_errors = StringIO.new; $stdout = $hello_lang_output; $stderr = $hello_lang_errors');
      try {
        const result = vm.eval(editableCode.value);
        rubyResult.value = String(result.toString());
      } finally {
        appendOutput(String(vm.eval('$hello_lang_output.string').toString()));
        standardError.value = String(vm.eval('$hello_lang_errors.string').toString());
        vm.eval('$stdout = $hello_lang_stdout; $stderr = $hello_lang_stderr');
      }
    }
    runState.value = 'success';
  } catch (err: any) {
    failedDuringLoading.value = runState.value === 'loading';
    executionError.value = err.message || String(err);
    runState.value = err instanceof RunnerTimeoutError ? 'timeout' : 'error';
  } finally {
    execTime.value = Math.round(performance.now() - startTime);
  }
}
</script>

<style scoped>
.code-runner {
  --runner-card-bg: rgb(255 255 255 / 78%);
  --runner-card-border: rgb(15 23 42 / 12%);
  --runner-card-shadow: 0 8px 28px rgb(15 23 42 / 10%);
  --runner-badge-bg: rgb(99 102 241 / 12%);
  --runner-badge-color: #4f46e5;
  --runner-editor-bg: #f8fafc;
  --runner-editor-border: #cbd5e1;
  --runner-code-color: #1e293b;
  --runner-caret-color: #0f172a;
  --runner-scrollbar-color: #94a3b8;
  --runner-selection-color: rgb(59 130 246 / 24%);
  --runner-output-bg: #f1f5f9;
  --runner-output-border: #cbd5e1;
  --runner-output-meta: #64748b;
  --runner-output-color: #0369a1;
  --runner-token-comment: #64748b;
  --runner-token-keyword: #7c3aed;
  --runner-token-string: #15803d;
  --runner-token-number: #b45309;
  --runner-token-variable: #0e7490;
  --runner-token-function: #2563eb;
  --runner-token-builtin: #be185d;
  --runner-token-punctuation: #475569;

  background: var(--runner-card-bg);
  border-color: var(--runner-card-border);
  box-shadow: var(--runner-card-shadow);
}

.code-runner.is-dark {
  --runner-card-bg: rgb(17 24 39 / 60%);
  --runner-card-border: rgb(255 255 255 / 8%);
  --runner-card-shadow: 0 8px 32px rgb(0 0 0 / 37%);
  --runner-badge-bg: rgb(99 102 241 / 20%);
  --runner-badge-color: #a5b4fc;
  --runner-editor-bg: var(--lang-deep-surface);
  --runner-editor-border: #1f2937;
  --runner-code-color: #e5e7eb;
  --runner-caret-color: #f8fafc;
  --runner-scrollbar-color: #334155;
  --runner-selection-color: rgb(59 130 246 / 42%);
  --runner-output-bg: var(--lang-deep-surface);
  --runner-output-border: #1e293b;
  --runner-output-meta: #9ca3af;
  --runner-output-color: #38bdf8;
  --runner-token-comment: #64748b;
  --runner-token-keyword: #c084fc;
  --runner-token-string: #86efac;
  --runner-token-number: #fbbf24;
  --runner-token-variable: #67e8f9;
  --runner-token-function: #60a5fa;
  --runner-token-builtin: #f9a8d4;
  --runner-token-punctuation: #94a3b8;
}

.runner-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: .75rem;
  margin-bottom: 12px;
}

.runner-title {
  display: flex;
  flex: 1 1 14rem;
  flex-wrap: wrap;
  min-width: 0;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}

.runner-title strong { min-width: 0; overflow-wrap: anywhere; }
.runner-icon, .lang-badge { flex-shrink: 0; }
.runner-status { display: flex; flex-wrap: wrap; gap: .3rem .8rem; margin: 0 0 .7rem; color: var(--vp-c-text-2); font-size: .75rem; overflow-wrap: anywhere; }
.runner-status[data-state="error"], .runner-status[data-state="timeout"] { color: var(--vp-c-danger-1); }
.editor-hint { margin: .45rem 0 0; color: var(--vp-c-text-2); font-size: .72rem; }

.lang-badge {
  background: var(--runner-badge-bg);
  color: var(--runner-badge-color);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.run-btn {
  flex: 0 1 auto;
  max-width: 100%;
  background: var(--doc-success-bg);
  color: #ffffff;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: normal;
  overflow-wrap: anywhere;
}

.run-btn:hover:not(:disabled) {
  background: var(--doc-success-hover-bg);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.run-btn:active:not(:disabled) { background: var(--doc-success-active-bg); }

.run-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.run-btn:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }

.editor-shell {
  position: relative;
  height: clamp(260px, 42vh, 420px);
  min-height: 180px;
  max-height: 70vh;
  overflow: hidden;
  border: 1px solid var(--runner-editor-border);
  border-radius: 8px;
  background: var(--runner-editor-bg);
  resize: vertical;
}

.highlight-layer,
.code-input {
  box-sizing: border-box !important;
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 12px !important;
  overflow: auto !important;
  border: 0 !important;
  border-radius: 0 !important;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  tab-size: 2;
  white-space: pre !important;
}

.highlight-layer {
  z-index: 1;
  pointer-events: none;
  color: var(--runner-code-color) !important;
  background: transparent !important;
  scrollbar-width: none;
}

.highlight-layer code {
  display: block;
  margin: 0;
  padding: 0;
  color: inherit;
  background: transparent;
  font: inherit;
}

.code-input {
  z-index: 2;
  resize: none;
  color: transparent !important;
  caret-color: var(--runner-caret-color);
  background: transparent !important;
  outline: none;
  -webkit-text-fill-color: transparent !important;
  scrollbar-color: var(--runner-scrollbar-color) transparent;
}

.code-input::selection {
  background: var(--runner-selection-color);
}

.editor-shell:focus-within {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent);
}

:deep(.tok-comment) { color: var(--runner-token-comment) !important; font-style: italic; }
:deep(.tok-keyword), :deep(.tok-tag) { color: var(--runner-token-keyword) !important; font-weight: 600; }
:deep(.tok-string), :deep(.tok-symbol) { color: var(--runner-token-string) !important; }
:deep(.tok-number), :deep(.tok-literal) { color: var(--runner-token-number) !important; }
:deep(.tok-variable) { color: var(--runner-token-variable) !important; }
:deep(.tok-function) { color: var(--runner-token-function) !important; }
:deep(.tok-builtin) { color: var(--runner-token-builtin) !important; }
:deep(.tok-punctuation) { color: var(--runner-token-punctuation) !important; }

.output-area {
  margin-top: 12px;
  background: var(--runner-output-bg);
  border: 1px solid var(--runner-output-border);
  border-radius: 8px;
  padding: 12px;
}

.output-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--runner-output-meta);
  margin-bottom: 6px;
}

.output-content {
  margin: 0;
  color: var(--runner-output-color);
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
}

.empty-output { margin: 0; color: var(--runner-output-meta); font-size: .8rem; }
.stderr-area, .execution-error { margin-top: 12px; padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--runner-output-bg); font-size: .8rem; }
.execution-error { border-color: var(--vp-c-danger-1); background: var(--vp-c-danger-soft); color: var(--vp-c-danger-1); }
.stderr-area pre, .execution-error pre { max-height: 16rem; margin: .4rem 0 0; overflow: auto; background: transparent; color: inherit; white-space: pre-wrap; overflow-wrap: anywhere; }

@media (max-width: 520px) {
  .code-runner { padding: .75rem; }
  .runner-header { align-items: flex-start; }
  .runner-title, .run-btn { flex-basis: 100%; }
}
</style>
