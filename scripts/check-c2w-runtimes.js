import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const supported = ['java', 'javascript', 'typescript', 'python', 'cpp', 'go', 'rust', 'kotlin', 'php', 'ruby', 'html', 'css']
const all = [...supported.slice(0, 7), 'csharp', ...supported.slice(7)]
const engineFiles = [
  'stack-worker.js', 'stack.js', 'wasi-util.js', 'worker-preload-adapter.js',
  'worker-util.js', 'worker.js', 'workerTools.js', 'ws-delegate.js', 'xterm-pty.js',
  'browser_wasi_shim/index.js', 'browser_wasi_shim/wasi_defs.js',
]
const failures = []
const expect = (condition, message) => { if (!condition) failures.push(message) }
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const catalog = read('docs/.vitepress/theme/data/languageContainerRuntimes.ts')
const component = read('docs/.vitepress/theme/components/LanguageContainerWorkbench.vue')
const config = read('docs/.vitepress/config.ts')
const index = read('docs/playground/index.md')
const headers = read('docs/public/_headers')
const developmentEnv = read('.env.development')
const viteConfig = read('docs/vite.config.ts')

for (const runtime of all) {
  const page = `docs/playground/container-${runtime}.md`
  expect(fs.existsSync(path.join(root, page)), `缺少 ${page}`)
  if (fs.existsSync(path.join(root, page))) {
    expect(read(page).includes(`<LanguageContainerWorkbench runtimeId="${runtime}" />`), `${page} 没有绑定正确运行时`)
  }
  expect(config.includes(`/playground/container-${runtime}`), `侧栏缺少 ${runtime}`)
  expect(index.includes(`./container-${runtime}.md`), `实验台总览缺少 ${runtime}`)
  expect(catalog.includes(`id: '${runtime}'`), `运行时目录缺少 ${runtime}`)
}

expect(catalog.includes("id: 'csharp'") && catalog.includes('supported: false'), 'C# 必须明确标记为不可用')
expect(component.includes("VITE_WASM_RUNTIME_BASE || 'https://hello-wasm.pages.dev/runtime'"), '组件缺少 Hello WASM 默认资源地址')
expect(component.includes('/lang/${props.runtimeId}/riscv64'), '组件缺少统一远程运行时路径')
expect(component.includes("manifest.targetArch !== 'riscv64'"), '组件必须拒绝非 riscv64 资产')
expect(component.includes("manifest.runtimeId !== `lang/${props.runtimeId}`"), '组件必须校验远程运行时 ID')
expect(component.includes("crypto.subtle.digest('SHA-256'"), '组件必须校验 gzip 分片 SHA-256')
expect(headers.includes('Cross-Origin-Embedder-Policy: require-corp'), '缺少 Cross-Origin Isolation 响应头')
expect(viteConfig.includes("'Cross-Origin-Opener-Policy': 'same-origin'") && viteConfig.includes("'Cross-Origin-Embedder-Policy': 'require-corp'"), '本地 Vite 服务缺少 Cross-Origin Isolation 响应头')
expect(viteConfig.includes("envDir: '..'"), '本地 Vite 服务未从项目根目录读取环境变量')
expect(developmentEnv.includes('VITE_WASM_RUNTIME_BASE=http://127.0.0.1:5177/runtime'), '本地开发未指向 Hello WASM 5177 运行时')
expect(!headers.includes('/runtime/c2w-*/*.gz'), 'Hello Lang 不应再声明本地 gzip 运行时')

for (const file of engineFiles) {
  expect(fs.existsSync(path.join(root, 'docs/public/runtime/c2w/engine', file)), `缺少本地 Worker 引擎：${file}`)
}

expect(!fs.existsSync(path.join(root, '.github/workflows/build-c2w-runtimes.yml')), 'Hello Lang 不应保留运行时构建 Action')
expect(!fs.existsSync(path.join(root, 'docs/public/runtime/c2w/Dockerfile')), 'Hello Lang 不应保留运行时 Dockerfile')
expect(!fs.existsSync(path.join(root, 'scripts/package-c2w-runtime.js')), 'Hello Lang 不应保留运行时打包器')

function walk(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(target) : [target]
  })
}
const forbiddenAssets = walk(path.join(root, 'docs/public/runtime')).filter((file) => /\.(?:gz|wasm)$/i.test(file))
for (const file of forbiddenAssets) failures.push(`Hello Lang 不应保存大型运行时：${path.relative(root, file)}`)

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}
console.log(`Hello Lang remote runtime check passed: ${all.length} entries, ${supported.length} remote RISC-V 64 runtimes.`)
