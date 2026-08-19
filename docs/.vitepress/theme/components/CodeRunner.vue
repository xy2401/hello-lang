<template>
  <div class="hw-card code-runner" :class="{ 'is-dark': isDark }">
    <div class="runner-header">
      <div class="runner-title">
        <span class="runner-icon">⚡</span>
        <strong>{{ title || '浏览器本地即时运行沙箱' }}</strong>
        <span class="lang-badge">{{ language.toUpperCase() }}</span>
      </div>
      <button class="run-btn" :disabled="isRunning" @click="runCode">
        <span v-if="isRunning">⏳ WASM 执行中...</span>
        <span v-else>▶️ 运行代码 ({{ runtimeLabel }})</span>
      </button>
    </div>

    <div class="editor-area">
      <div class="editor-shell">
        <pre ref="highlightLayer" class="highlight-layer" aria-hidden="true"><code v-html="highlightedCode"></code></pre>
        <textarea
          ref="editorInput"
          v-model="editableCode"
          class="code-input"
          :aria-label="`${language.toUpperCase()} 可编辑源码`"
          spellcheck="false"
          wrap="off"
          @scroll="syncScroll"
          @keydown.tab.prevent="insertIndent"
        ></textarea>
      </div>
    </div>

    <div class="output-area" v-if="output !== null">
      <div class="output-header">
        <span>控制台输出日志 (stdout):</span>
        <span class="exec-duration" v-if="execTime">耗时: {{ execTime }}ms</span>
      </div>
      <pre class="output-content"><code>{{ output }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useData } from 'vitepress';

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
const isRunning = ref(false);
const output = ref<string | null>(null);
const execTime = ref<number | null>(null);
const highlightLayer = ref<HTMLPreElement | null>(null);
const editorInput = ref<HTMLTextAreaElement | null>(null);
const runtimeLabel = props.language === 'javascript' ? 'Web Worker' : 'Client WASM';

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

function insertIndent() {
  const editor = editorInput.value;
  if (!editor) return;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  editableCode.value = `${editableCode.value.slice(0, start)}  ${editableCode.value.slice(end)}`;
  nextTick(() => {
    editor.selectionStart = editor.selectionEnd = start + 2;
  });
}

function runJavaScriptInWorker(code: string, timeoutMs = 5000): Promise<string> {
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
        const logs = [];
        const stringify = (value) => {
          if (typeof value !== 'object' || value === null) return String(value);
          try { return JSON.stringify(value); } catch { return String(value); }
        };
        const safeConsole = {
          log: (...args) => logs.push(args.map(stringify).join(' ')),
          error: (...args) => logs.push('[ERROR] ' + args.map(stringify).join(' ')),
          warn: (...args) => logs.push('[WARN] ' + args.map(stringify).join(' ')),
        };

        try {
          const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
          const execute = new AsyncFunction('console', '"use strict";\\n' + data);
          const result = await execute(safeConsole);
          if (result !== undefined) logs.push('=> ' + stringify(result));
          self.postMessage({ type: 'done', output: logs.join('\\n') || '(程序已运行，无输出)' });
        } catch (error) {
          self.postMessage({ type: 'error', message: error?.message || String(error) });
        }
      };
    `;

    const objectUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    const worker = new Worker(objectUrl);
    const cleanup = () => {
      worker.terminate();
      URL.revokeObjectURL(objectUrl);
    };
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error(`执行超过 ${timeoutMs}ms，Worker 已终止`));
    }, timeoutMs);

    worker.onmessage = ({ data }) => {
      window.clearTimeout(timer);
      cleanup();
      if (data.type === 'done') resolve(data.output);
      else reject(new Error(data.message || 'Worker 执行失败'));
    };
    worker.onerror = (event) => {
      window.clearTimeout(timer);
      cleanup();
      reject(new Error(event.message || 'Worker 加载失败'));
    };
    worker.postMessage(code);
  });
}

watch(() => props.initialCode, (newVal) => {
  editableCode.value = formatCode(newVal);
});

async function runCode() {
  isRunning.value = true;
  output.value = '';
  const startTime = performance.now();

  try {
    // 1. JavaScript (原生 Web Worker 沙箱)
    if (props.language === 'javascript') {
      output.value = await runJavaScriptInWorker(editableCode.value);
    }

    // 2. Python (Pyodide CPython WASM 虚拟机)
    else if (props.language === 'python') {
      output.value = '⏳ 正在纯前端加载 Pyodide CPython WebAssembly 虚拟机...';
      if (!(window as any).pyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
        (window as any).pyodide = await (window as any).loadPyodide();
      }
      const pyodide = (window as any).pyodide;
      let logsBuffer = '';
      pyodide.setStdout({
        batched: (str: string) => {
          logsBuffer += str + '\n';
        },
      });
      const result = await pyodide.runPythonAsync(editableCode.value);
      if (result !== undefined && result !== null) {
        logsBuffer += `=> ${result}`;
      }
      output.value = logsBuffer.trim() || '(程序已运行，无输出)';
    }

    // 3. PHP (PHP-WASM 纯前端 Emscripten 解释器)
    else if (props.language === 'php') {
      output.value = '⏳ 正在纯前端加载 PHP-WASM WebAssembly 解释器...';
      if (!(window as any).PhpWeb) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/php-wasm@0.0.9/php-web.js';
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }
      const php = new (window as any).PhpWeb();
      let logsBuffer = '';
      php.addEventListener('output', (event: any) => {
        logsBuffer += event.detail;
      });
      php.addEventListener('error', (event: any) => {
        logsBuffer += '[PHP ERROR] ' + event.detail;
      });
      await php.run(editableCode.value);
      output.value = logsBuffer.trim() || '(PHP 脚本执行完毕，无输出)';
    }

    // 4. Ruby (Ruby-WASM 官方 CRuby WebAssembly 虚拟机)
    else if (props.language === 'ruby') {
      output.value = '⏳ 正在纯前端加载 Ruby-WASM CRuby WebAssembly 虚拟机...';
      if (!(window as any).rubyVmInstance) {
        if (!(window as any)['@ruby/wasm-wasi']) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@ruby/3.3-wasm-wasi@2.5.0/dist/browser.umd.js';
          document.head.appendChild(script);
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }
        const { DefaultRubyVM } = (window as any)['@ruby/wasm-wasi'];
        const response = await fetch('https://cdn.jsdelivr.net/npm/@ruby/3.3-wasm-wasi@2.5.0/dist/ruby.wasm');
        const buffer = await response.arrayBuffer();
        const module = await WebAssembly.compile(buffer);
        const { vm } = await DefaultRubyVM.create(module);
        (window as any).rubyVmInstance = vm;
      }
      const vm = (window as any).rubyVmInstance;
      const res = vm.eval(editableCode.value);
      output.value = String(res.toString());
    }
  } catch (err: any) {
    output.value = `❌ WASM 执行错误: ${err.message || String(err)}`;
  } finally {
    execTime.value = Math.round(performance.now() - startTime);
    isRunning.value = false;
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
  --runner-editor-bg: #030712;
  --runner-editor-border: #1f2937;
  --runner-code-color: #e5e7eb;
  --runner-caret-color: #f8fafc;
  --runner-scrollbar-color: #334155;
  --runner-selection-color: rgb(59 130 246 / 42%);
  --runner-output-bg: #090d16;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.runner-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}

.lang-badge {
  background: var(--runner-badge-bg);
  color: var(--runner-badge-color);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.run-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.run-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.run-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

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
</style>
