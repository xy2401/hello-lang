<template>
  <div class="hw-card code-runner">
    <div class="runner-header">
      <div class="runner-title">
        <span class="runner-icon">⚡</span>
        <strong>{{ title || '纯前端 WebAssembly 浏览器即时运行沙箱' }}</strong>
        <span class="lang-badge">{{ language.toUpperCase() }}</span>
      </div>
      <button class="run-btn" :disabled="isRunning" @click="runCode">
        <span v-if="isRunning">⏳ WASM 执行中...</span>
        <span v-else>▶️ 运行代码 (Client WASM)</span>
      </button>
    </div>

    <div class="editor-area">
      <textarea
        v-model="editableCode"
        class="code-input"
        spellcheck="false"
        rows="8"
      ></textarea>
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
import { ref, watch } from 'vue';

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

function formatCode(raw: string): string {
  if (!raw) return '';
  return raw.replace(/\\n/g, '\n');
}

const editableCode = ref(formatCode(props.initialCode));
const isRunning = ref(false);
const output = ref<string | null>(null);
const execTime = ref<number | null>(null);

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
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' ')),
        warn: (...args: any[]) => logs.push('[WARN] ' + args.join(' ')),
      };

      const runnerFunc = new Function('console', editableCode.value);
      const res = runnerFunc(customConsole);
      if (res !== undefined) {
        logs.push(`=> ${typeof res === 'object' ? JSON.stringify(res) : res}`);
      }
      output.value = logs.length > 0 ? logs.join('\n') : '(程序已运行，无输出)';
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
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
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

.code-input {
  width: 100%;
  background: #030712;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 12px;
  color: #f3f4f6;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;
}

.code-input:focus {
  border-color: var(--vp-c-brand-1);
}

.output-area {
  margin-top: 12px;
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 12px;
}

.output-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 6px;
}

.output-content {
  margin: 0;
  color: #38bdf8;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
}
</style>
