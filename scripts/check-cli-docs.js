import fs from 'node:fs'
import path from 'node:path'

const products = ['cpp', 'csharp', 'css', 'go', 'html', 'java', 'javascript', 'kotlin', 'php', 'python', 'ruby', 'rust', 'typescript']
const officialHosts = {
  cpp: ['gcc.gnu.org', 'clang.llvm.org', 'learn.microsoft.com'], csharp: ['learn.microsoft.com'],
  css: ['developer.mozilla.org', 'stylelint.io'], go: ['go.dev'],
  html: ['developer.mozilla.org', 'docs.python.org', 'html-validate.org'], java: ['docs.oracle.com'],
  javascript: ['nodejs.org'], kotlin: ['kotlinlang.org'], php: ['www.php.net'],
  python: ['docs.python.org'], ruby: ['docs.ruby-lang.org'], rust: ['doc.rust-lang.org'],
  typescript: ['www.typescriptlang.org', 'nodejs.org'],
}
const requiredCommands = {
  cpp: ['gcc', 'g++', 'clang++', 'cl'], csharp: ['dotnet run --file', 'dotnet build'],
  css: ['stylelint', 'http.server'], go: ['go run', 'go build'],
  html: ['http.server', 'html-validate'], java: ['javac', 'java -jar', 'jshell'],
  javascript: ['node', 'process.argv'], kotlin: ['kotlinc', 'java -jar'],
  php: ['php -a', 'php -S', 'php -l'], python: ['python -m', 'py_compile'],
  ruby: ['ruby -c', 'irb'], rust: ['rustc', '--edition 2024'], typescript: ['tsc', 'node'],
}

const root = process.cwd()
const sidebar = fs.readFileSync(path.join(root, 'docs/.vitepress/config.ts'), 'utf8')
const failures = []
const contents = new Map()

function requireMatch(condition, message) {
  if (!condition) failures.push(message)
}

for (const product of products) {
  const relative = `docs/products/${product}/cli.md`
  const file = path.join(root, relative)
  requireMatch(fs.existsSync(file), `${relative}: 文件不存在`)
  if (!fs.existsSync(file)) continue

  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
  contents.set(product, text)
  const title = ['html', 'css'].includes(product) ? /^# .+预览与验证$/m : /^# .+编译与运行$/m

  requireMatch(text.length >= 1000, `${relative}: 内容过短，疑似占位页`)
  requireMatch(title.test(text), `${relative}: 标题与产品类型不符`)
  for (const host of officialHosts[product]) {
    requireMatch(text.includes(`https://${host}`), `${relative}: 缺少官方来源 ${host}`)
  }
  requireMatch(/```(?:bash|powershell|java|typescript|javascript|python|c|cpp|go|rust|csharp|kotlin|php|ruby)\n/.test(text), `${relative}: 缺少可复制代码块`)
  requireMatch(text.includes('资料核对日期：2026-08-28。'), `${relative}: 核对日期不正确`)
  requireMatch(!/(TODO|TBD|待补充|下一步|实验台)/i.test(text), `${relative}: 存在占位或无关引导`)
  requireMatch(!/^<script\b|^<[A-Z][A-Za-z]+\b/m.test(text), `${relative}: 不应嵌入动态组件`)

  for (const command of requiredCommands[product]) {
    requireMatch(text.includes(command), `${relative}: 缺少关键入口 ${command}`)
  }

  const route = `/products/${product}/cli`
  requireMatch(sidebar.includes(route), `${relative}: 侧栏未引用 CLI 页`)
  const installPosition = sidebar.indexOf(`/products/${product}/install`)
  const cliPosition = sidebar.indexOf(route)
  requireMatch(installPosition >= 0 && cliPosition > installPosition, `${relative}: CLI 入口应位于安装页之后`)
}

requireMatch(new Set(contents.values()).size === contents.size, '存在内容完全相同的 CLI 页')

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`CLI docs check passed: ${products.length} language products`)
