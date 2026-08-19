export const javascriptPlaygroundCode = `// JavaScript / ESNext 纯前端沙箱 (Web Worker)
const languages = ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Ruby'];
const greeting = languages.map(lang => \`🚀 Hello \${lang}!\`);
console.log(greeting.join('\\n'));

// 测试 ESNext / 异步 API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
console.log('⏳ 正在测试 Async/Await 延时任务...');
await delay(300);
console.log('✅ 任务运行完成！');`;

export const pythonPlaygroundCode = `# Python 纯前端 CPython WASM 沙箱 (Pyodide)
import math

name: str = 'Python WASM'
print(f'Hello from CPython WASM, {name}!')

# 计算黄金分割率
phi = (1 + math.sqrt(5)) / 2
print(f'Golden Ratio (phi): {phi:.6f}')

# 列表推导式与数据分析
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [x * x for x in data if x % 2 == 0]
print('Even Squares:', squares)`;

export const phpPlaygroundCode = `<?php
// PHP 纯前端 WebAssembly 沙箱 (PHP-WASM)
$name = "PHP WASM";
echo "Hello from PHP WASM, {$name}!\\n";

$data = [10, 20, 30, 40, 50];
$doubled = array_map(fn($x) => $x * 2, $data);
echo "Doubled List: " . implode(", ", $doubled) . "\\n";`;

export const rubyPlaygroundCode = `# Ruby 纯前端 CRuby WebAssembly 沙箱 (Ruby-WASM)
lang = "Ruby WASM"
puts "Hello from CRuby WASM, #{lang}!"

numbers = [1, 2, 3, 4, 5]
puts "Squares: #{numbers.map { |x| x**2 }.join(', ')}"`;
