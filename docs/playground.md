# ⚡ 纯前端 WebAssembly 在线代码沙箱 (Zero-Backend WASM Playground)

<script setup>
const jsCode = `// 🟨 JavaScript / ESNext 纯前端沙箱 (Web Worker)
const languages = ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Ruby'];
const greeting = languages.map(lang => \`🚀 Hello \${lang}!\`);
console.log(greeting.join('\\n'));

// 测试 ESNext / 异步 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
    console.log('⏳ 正在测试 Async/Await 延时任务...');
    await delay(300);
    console.log('✅ 任务运行完成！');
})();`;

const pyCode = `# 🐍 Python 3.12 纯前端 CPython WASM 虚拟机 (Pyodide)
import math

name: str = 'Python 3.12 WASM'
print(f'Hello from CPython WASM, {name}!')

# 计算黄金分割率
phi = (1 + math.sqrt(5)) / 2
print(f'Golden Ratio (phi): {phi:.6f}')

# 列表推导式与数据分析
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [x * x for x in data if x % 2 == 0]
print('Even Squares:', squares)`;

const phpCode = `<?php
// 🐘 PHP 8.3 纯前端 WebAssembly 解释器 (PHP-WASM)
$name = "PHP 8.3 WASM";
echo "Hello from PHP WASM, {$name}!\n";

$data = [10, 20, 30, 40, 50];
$doubled = array_map(fn($x) => $x * 2, $data);
echo "Doubled List: " . implode(", ", $doubled) . "\n";`;

const rubyCode = `# 💎 Ruby 3.3 纯前端 CRuby WebAssembly 虚拟机 (Ruby-WASM)
lang = "Ruby 3.3 WASM"
puts "Hello from CRuby WASM, #{lang}!"

numbers = [1, 2, 3, 4, 5]
puts "Squares: #{numbers.map { |x| x**2 }.join(', ')}"`;
</script>

> **完全无需任何后端服务器与 API**，所有代码均在您的浏览器本地 **JS Worker**、**Pyodide CPython WASM**、**PHP-WASM** 与 **Ruby-WASM** 虚拟机中安全零延迟独立运行！

---

## 🟨 JavaScript / ESNext 纯前端沙箱

<CodeRunner
  language="javascript"
  title="JavaScript / ESNext 交互沙箱 (Zero-Backend Web Worker)"
  :initialCode="jsCode"
/>

---

## 🐍 Python 3.12 纯前端 WASM 沙箱

<CodeRunner
  language="python"
  title="Python 3.12 交互沙箱 (Zero-Backend Pyodide CPython WASM)"
  :initialCode="pyCode"
/>

---

## 🐘 PHP 8.3 纯前端 WASM 沙箱

<CodeRunner
  language="php"
  title="PHP 8.3 交互沙箱 (Zero-Backend PHP-WASM)"
  :initialCode="phpCode"
/>

---

## 💎 Ruby 3.3 纯前端 WASM 沙箱

<CodeRunner
  language="ruby"
  title="Ruby 3.3 交互沙箱 (Zero-Backend Ruby-WASM)"
  :initialCode="rubyCode"
/>
