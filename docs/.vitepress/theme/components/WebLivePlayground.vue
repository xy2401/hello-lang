<template>
  <div class="web-live" :class="{ 'is-dark': isDark }" :aria-label="props.title || `${languageLabel} Live 实验室`">
    <div class="workbench-bar">
      <div class="toolbar-left">
        <span class="language-label">{{ languageLabel }}</span>
        <div class="view-tabs" role="tablist" aria-label="源码与运行效果">
          <button
            id="source-tab"
            type="button"
            role="tab"
            :aria-selected="activeView === 'source'"
            :class="{ active: activeView === 'source' }"
            @click="activeView = 'source'"
          >源码</button>
          <button
            id="live-tab"
            type="button"
            role="tab"
            :aria-selected="activeView === 'live'"
            :class="{ active: activeView === 'live' }"
            @click="showPreview"
          >效果</button>
        </div>
      </div>
      <button class="reset-button" type="button" title="恢复初始源码" @click="resetCode">↺ 重置</button>
    </div>

    <section v-show="activeView === 'source'" class="source-view" role="tabpanel" aria-labelledby="source-tab">
      <div class="editor-shell">
        <pre ref="highlightLayer" class="highlight-layer" aria-hidden="true"><code v-html="highlightedCode"></code></pre>
        <textarea
          ref="editorInput"
          v-model="editableCode"
          class="live-editor"
          :aria-label="`可编辑 ${languageLabel} 源码`"
          spellcheck="false"
          wrap="soft"
          @scroll="syncScroll"
          @keydown.tab.prevent="insertIndent"
          @keydown.ctrl.enter.prevent="showPreview"
          @keydown.meta.enter.prevent="showPreview"
        ></textarea>
      </div>
      <p class="live-hint">修改后切换到“效果”即可刷新预览 · Ctrl/⌘ + Enter</p>
    </section>

    <section v-show="activeView === 'live'" class="live-view" role="tabpanel" aria-labelledby="live-tab">
      <iframe
        :key="previewRevision"
        :srcdoc="previewDocument"
        class="live-preview"
        sandbox="allow-scripts"
        title="Web Live 运行结果"
      ></iframe>

      <div v-if="props.mode === 'javascript'" class="console-panel" aria-live="polite">
        <span>Console</span>
        <pre><code>{{ consoleOutput || '（程序已运行，无控制台输出）' }}</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';

const props = withDefaults(defineProps<{
  mode: 'html' | 'css' | 'javascript';
  initialCode: string;
  previewHtml?: string;
  title?: string;
}>(), {
  previewHtml: '<main class="demo"><h2>Live Web Demo</h2><p>编辑代码，观察页面变化。</p><button>交互按钮</button></main>',
});

const { isDark } = useData();

const editableCode = ref(props.initialCode);
const activeView = ref<'source' | 'live'>('source');
const previewDocument = ref('');
const previewRevision = ref(0);
const consoleLines = ref<string[]>([]);
const highlightLayer = ref<HTMLPreElement | null>(null);
const editorInput = ref<HTMLTextAreaElement | null>(null);
const channelId = `web-live-${Math.random().toString(36).slice(2)}`;
let refreshTimer: number | undefined;

const languageLabel = computed(() => props.mode === 'javascript' ? 'JavaScript' : props.mode.toUpperCase());
const consoleOutput = computed(() => consoleLines.value.join('\n'));
const highlightedCode = computed(() => {
  const rendered = highlightCode(editableCode.value, props.mode);
  return editableCode.value.endsWith('\n') ? `${rendered}\n` : rendered;
});

const jsKeywords = new Set([
  'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'from',
  'function', 'get', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'of', 'return',
  'set', 'static', 'super', 'switch', 'throw', 'try', 'typeof', 'var', 'void', 'while',
  'with', 'yield', 'true', 'false', 'null', 'undefined', 'this',
]);
const jsBuiltins = new Set([
  'Array', 'BigInt', 'Boolean', 'Date', 'Error', 'JSON', 'Map', 'Math', 'Number',
  'Object', 'Promise', 'Reflect', 'RegExp', 'Set', 'String', 'Symbol', 'WeakMap',
  'WeakSet', 'console', 'document', 'window', 'fetch', 'setTimeout', 'setInterval',
]);

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function token(kind: string, value: string) {
  return `<span class="tok-${kind}">${escapeHtml(value)}</span>`;
}

function readQuoted(code: string, start: number) {
  const quote = code[start];
  let index = start + 1;
  while (index < code.length) {
    if (code[index] === '\\') index += 2;
    else if (code[index] === quote) return index + 1;
    else index += 1;
  }
  return code.length;
}

function highlightJavaScript(code: string) {
  let output = '';
  let index = 0;
  while (index < code.length) {
    if (code.startsWith('//', index)) {
      const end = code.indexOf('\n', index);
      const stop = end < 0 ? code.length : end;
      output += token('comment', code.slice(index, stop));
      index = stop;
    } else if (code.startsWith('/*', index)) {
      const end = code.indexOf('*/', index + 2);
      const stop = end < 0 ? code.length : end + 2;
      output += token('comment', code.slice(index, stop));
      index = stop;
    } else if ('\"\'`'.includes(code[index])) {
      const stop = readQuoted(code, index);
      output += token('string', code.slice(index, stop));
      index = stop;
    } else if (/\d/.test(code[index])) {
      const match = code.slice(index).match(/^(?:0[xob][\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?n?)/i);
      const value = match?.[0] || code[index];
      output += token('number', value);
      index += value.length;
    } else if (/[A-Za-z_$]/.test(code[index])) {
      const match = code.slice(index).match(/^[\w$]+/);
      const value = match?.[0] || code[index];
      const kind = jsKeywords.has(value) ? 'keyword' : jsBuiltins.has(value) ? 'builtin' : 'plain';
      output += kind === 'plain' ? escapeHtml(value) : token(kind, value);
      index += value.length;
    } else {
      const char = code[index];
      output += /[{}()[\].,;:+\-*\/%!?=&|<>]/.test(char) ? token('punctuation', char) : escapeHtml(char);
      index += 1;
    }
  }
  return output;
}

function highlightHtmlTag(value: string) {
  let output = '';
  let index = 0;
  if (value[index] === '<') {
    const prefix = value[index + 1] === '/' ? '</' : '<';
    output += token('punctuation', prefix);
    index += prefix.length;
  }
  const tagMatch = value.slice(index).match(/^[\w:-]+/);
  if (tagMatch) {
    output += token('tag', tagMatch[0]);
    index += tagMatch[0].length;
  }
  while (index < value.length) {
    if (/\s/.test(value[index])) {
      output += value[index];
      index += 1;
    } else if ('\"\''.includes(value[index])) {
      const stop = readQuoted(value, index);
      output += token('string', value.slice(index, stop));
      index = stop;
    } else if (value.startsWith('/>', index)) {
      output += token('punctuation', '/>');
      index += 2;
    } else if (value[index] === '>') {
      output += token('punctuation', '>');
      index += 1;
    } else if (value[index] === '=') {
      output += token('punctuation', '=');
      index += 1;
    } else {
      const match = value.slice(index).match(/^[\w:@.-]+/);
      const text = match?.[0] || value[index];
      output += token('attribute', text);
      index += text.length;
    }
  }
  return output;
}

function highlightHtml(code: string) {
  let output = '';
  let index = 0;
  while (index < code.length) {
    if (code.startsWith('<!--', index)) {
      const end = code.indexOf('-->', index + 4);
      const stop = end < 0 ? code.length : end + 3;
      output += token('comment', code.slice(index, stop));
      index = stop;
    } else if (code[index] === '<') {
      let stop = index + 1;
      let quote = '';
      while (stop < code.length) {
        const char = code[stop];
        if (quote && char === '\\') stop += 2;
        else if (quote && char === quote) { quote = ''; stop += 1; }
        else if (!quote && (char === '\"' || char === '\'')) { quote = char; stop += 1; }
        else if (!quote && char === '>') { stop += 1; break; }
        else stop += 1;
      }
      output += highlightHtmlTag(code.slice(index, stop));
      index = stop;
    } else {
      const stop = code.indexOf('<', index);
      const end = stop < 0 ? code.length : stop;
      output += escapeHtml(code.slice(index, end));
      index = end;
    }
  }
  return output;
}

function highlightCss(code: string) {
  let output = '';
  let index = 0;
  while (index < code.length) {
    if (code.startsWith('/*', index)) {
      const end = code.indexOf('*/', index + 2);
      const stop = end < 0 ? code.length : end + 2;
      output += token('comment', code.slice(index, stop));
      index = stop;
    } else if ('\"\''.includes(code[index])) {
      const stop = readQuoted(code, index);
      output += token('string', code.slice(index, stop));
      index = stop;
    } else if (code[index] === '@') {
      const match = code.slice(index).match(/^@[\w-]+/);
      const value = match?.[0] || '@';
      output += token('keyword', value);
      index += value.length;
    } else if ((code[index] === '.' || code[index] === '#') && /[\w-]/.test(code[index + 1] || '')) {
      const match = code.slice(index).match(/^[.#][\w-]+/);
      const value = match?.[0] || code[index];
      output += token('selector', value);
      index += value.length;
    } else if (code[index] === ':' && /[\w-]/.test(code[index + 1] || '')) {
      const match = code.slice(index).match(/^::?[\w-]+/);
      const value = match?.[0] || ':';
      output += token('selector', value);
      index += value.length;
    } else if (/\d/.test(code[index])) {
      const match = code.slice(index).match(/^\d+(?:\.\d+)?(?:%|[a-z]+)?/i);
      const value = match?.[0] || code[index];
      output += token('number', value);
      index += value.length;
    } else if (/[A-Za-z_-]/.test(code[index])) {
      const match = code.slice(index).match(/^[\w-]+/);
      const value = match?.[0] || code[index];
      const rest = code.slice(index + value.length);
      const isProperty = /^\s*:/.test(rest);
      output += isProperty ? token('property', value) : escapeHtml(value);
      index += value.length;
    } else {
      const char = code[index];
      output += /[{}()[\],;:+>~*=]/.test(char) ? token('punctuation', char) : escapeHtml(char);
      index += 1;
    }
  }
  return output;
}

function highlightCode(code: string, mode: 'html' | 'css' | 'javascript') {
  if (mode === 'html') return highlightHtml(code);
  if (mode === 'css') return highlightCss(code);
  return highlightJavaScript(code);
}

function escapeScript(code: string) {
  return code.replace(/<\/script/gi, '<\\/script');
}

function documentShell(body: string, styles = '', script = '') {
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'none'; font-src data:">
<style>html{color-scheme:light}body{margin:0;padding:1.25rem;font:16px/1.6 system-ui,sans-serif;color:#172033;background:#fff}button{font:inherit}${styles}</style>
</head><body>${body}${script}</body></html>`;
}

function bridgeScript(userCode: string) {
  const safeCode = escapeScript(userCode);
  return `<script>
const channel = ${JSON.stringify(channelId)};
const stringify = value => {
  if (typeof value !== 'object' || value === null) return String(value);
  try { return JSON.stringify(value); } catch { return String(value); }
};
const send = (type, values) => parent.postMessage({ channel, type, text: values.map(stringify).join(' ') }, '*');
console.log = (...values) => send('log', values);
console.warn = (...values) => send('warn', values);
console.error = (...values) => send('error', values);
addEventListener('error', event => send('error', [event.message]));
addEventListener('unhandledrejection', event => send('error', [event.reason]));
try { ${safeCode} } catch (error) { send('error', [error?.message || error]); }
<\/script>`;
}

function runPreview() {
  consoleLines.value = [];
  if (props.mode === 'html') {
    previewDocument.value = documentShell(editableCode.value);
  } else if (props.mode === 'css') {
    previewDocument.value = documentShell(props.previewHtml, editableCode.value);
  } else {
    previewDocument.value = documentShell(props.previewHtml, '', bridgeScript(editableCode.value));
  }
  previewRevision.value += 1;
}

function showPreview() {
  runPreview();
  activeView.value = 'live';
}

function resetCode() {
  editableCode.value = props.initialCode;
  activeView.value = 'source';
  runPreview();
}

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

function receiveMessage(event: MessageEvent) {
  if (event.data?.channel !== channelId) return;
  const prefix = event.data.type === 'log' ? '' : `[${String(event.data.type).toUpperCase()}] `;
  consoleLines.value.push(`${prefix}${event.data.text}`);
}

watch(() => props.initialCode, value => {
  editableCode.value = value;
  runPreview();
});

watch(editableCode, () => {
  if (props.mode === 'javascript' || typeof window === 'undefined') return;
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(runPreview, 280);
});

onMounted(() => {
  window.addEventListener('message', receiveMessage);
  runPreview();
});

onBeforeUnmount(() => {
  window.removeEventListener('message', receiveMessage);
  window.clearTimeout(refreshTimer);
});
</script>

<style scoped>
.web-live {
  --live-shadow: 0 10px 30px rgb(15 23 42 / 7%);
  --live-editor-bg: #f8fafc;
  --live-editor-border: #cbd5e1;
  --live-code-color: #1e293b;
  --live-caret-color: #0f172a;
  --live-scrollbar-color: #94a3b8;
  --live-scrollbar-border: #f8fafc;
  --live-selection-color: rgb(59 130 246 / 24%);
  --live-console-bg: #f1f5f9;
  --live-console-color: #0369a1;
  --live-token-comment: #64748b;
  --live-token-keyword: #7c3aed;
  --live-token-builtin: #2563eb;
  --live-token-string: #15803d;
  --live-token-number: #b45309;
  --live-token-attribute: #0e7490;
  --live-token-selector: #be185d;
  --live-token-punctuation: #475569;

  margin: 1.25rem 0 2rem;
  padding: .7rem;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  box-shadow: var(--live-shadow);
}
.web-live.is-dark {
  --live-shadow: 0 10px 30px rgb(0 0 0 / 24%);
  --live-editor-bg: #08111f;
  --live-editor-border: #1e293b;
  --live-code-color: #dbeafe;
  --live-caret-color: #f8fafc;
  --live-scrollbar-color: #334155;
  --live-scrollbar-border: #08111f;
  --live-selection-color: rgb(59 130 246 / 42%);
  --live-console-bg: #050b14;
  --live-console-color: #7dd3fc;
  --live-token-comment: #64748b;
  --live-token-keyword: #c084fc;
  --live-token-builtin: #60a5fa;
  --live-token-string: #86efac;
  --live-token-number: #fbbf24;
  --live-token-attribute: #67e8f9;
  --live-token-selector: #f9a8d4;
  --live-token-punctuation: #94a3b8;
}
.workbench-bar, .toolbar-left { display: flex; align-items: center; }
.workbench-bar { min-height: 2.25rem; justify-content: space-between; gap: 1rem; padding: 0 .15rem .65rem; }
.toolbar-left { gap: .65rem; }
.language-label { color: var(--vp-c-text-2); font: 700 .7rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .08em; }
.view-tabs { display: inline-flex; gap: .15rem; padding: .18rem; border-radius: 8px; background: var(--vp-c-bg-soft); }
.view-tabs button { min-width: 3.8rem; border: 0; border-radius: 6px; padding: .38rem .7rem; background: transparent; color: var(--vp-c-text-2); cursor: pointer; font-size: .82rem; font-weight: 650; line-height: 1; }
.view-tabs button.active { background: var(--vp-c-bg); color: var(--vp-c-brand-1); box-shadow: 0 1px 5px rgb(15 23 42 / 10%); }
.reset-button { border: 0; padding: .35rem .5rem; border-radius: 6px; background: transparent; color: var(--vp-c-text-2); cursor: pointer; font-size: .78rem; }
.reset-button:hover { color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); }
.source-view, .live-view { margin: 0; }
.editor-shell { position: relative; height: clamp(290px, 46vh, 430px); overflow: hidden; border: 1px solid var(--live-editor-border); border-radius: 10px; background: var(--live-editor-bg); }
.highlight-layer, .live-editor { box-sizing: border-box !important; position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; margin: 0 !important; padding: .9rem 1rem !important; border: 0 !important; border-radius: 0 !important; font: 13.5px/1.65 ui-monospace, SFMono-Regular, Consolas, monospace !important; tab-size: 2; white-space: pre-wrap !important; overflow-wrap: anywhere; overflow-x: hidden !important; overflow-y: auto !important; }
.highlight-layer { z-index: 1; pointer-events: none; color: var(--live-code-color) !important; background: transparent !important; scrollbar-width: none; }
.highlight-layer code { display: block; margin: 0; padding: 0; color: inherit; font: inherit; background: transparent; }
.live-editor { z-index: 2; resize: none; color: transparent !important; caret-color: var(--live-caret-color); background: transparent !important; outline: none; -webkit-text-fill-color: transparent !important; scrollbar-width: thin; scrollbar-color: var(--live-scrollbar-color) transparent; }
.live-editor::-webkit-scrollbar { width: 8px; }
.live-editor::-webkit-scrollbar-track { background: transparent; }
.live-editor::-webkit-scrollbar-thumb { border: 2px solid var(--live-scrollbar-border); border-radius: 999px; background: var(--live-scrollbar-color); }
.live-editor::selection { background: var(--live-selection-color); }
.editor-shell:focus-within { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent); }
.live-hint { margin: .45rem .15rem 0; color: var(--vp-c-text-3); font-size: .72rem; text-align: right; }
.live-preview { display: block; width: 100%; height: clamp(320px, 50vh, 500px); border: 0; border-radius: 10px; background: #fff; }
.console-panel { margin-top: .8rem; color: var(--vp-c-text-2); font-size: .78rem; font-weight: 700; }
.console-panel pre { min-height: 3rem; max-height: 12rem; margin: .35rem 0 0; overflow: auto; border: 1px solid var(--vp-c-divider); background: var(--live-console-bg); color: var(--live-console-color); }
:deep(.tok-comment) { color: var(--live-token-comment) !important; font-style: italic; }
:deep(.tok-keyword) { color: var(--live-token-keyword) !important; font-weight: 600; }
:deep(.tok-builtin), :deep(.tok-tag) { color: var(--live-token-builtin) !important; }
:deep(.tok-string) { color: var(--live-token-string) !important; }
:deep(.tok-number) { color: var(--live-token-number) !important; }
:deep(.tok-attribute), :deep(.tok-property) { color: var(--live-token-attribute) !important; }
:deep(.tok-selector) { color: var(--live-token-selector) !important; }
:deep(.tok-punctuation) { color: var(--live-token-punctuation) !important; }
@media (max-width: 760px) {
  .web-live { padding: .55rem; border-radius: 12px; }
  .editor-shell { height: 340px; }
  .live-preview { height: 360px; }
}
</style>
