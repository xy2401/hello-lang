import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const assetByProduct = {
  java: 'jvm', javascript: 'node', typescript: 'node', python: 'python', cpp: 'cpp', go: 'go', rust: 'rust',
  csharp: 'csharp', kotlin: 'jvm', groovy: 'jvm', scala: 'jvm', clojure: 'jvm', php: 'php', ruby: 'ruby',
  html: 'node', css: 'node',
}
const all = Object.keys(assetByProduct)
const supported = all.filter((runtime) => runtime !== 'csharp')
const physicalAssets = new Set(Object.entries(assetByProduct).filter(([runtime]) => runtime !== 'csharp').map(([, asset]) => asset))
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
  expect(catalog.includes(`id: '${runtime}', assetId: '${assetByProduct[runtime]}'`), `运行时目录的 ${runtime} 缺少正确 assetId`)
}

expect(catalog.includes("id: 'csharp'") && catalog.includes('supported: false'), 'C# 必须明确标记为不可用')
expect(component.includes("VITE_WASM_RUNTIME_BASE || 'https://hello-wasm.pages.dev/runtime'"), '组件缺少 Hello WASM 默认资源地址')
expect(component.includes('/lang/${runtime.value.assetId}/riscv64'), '组件缺少共享物理资产路径')
expect(component.includes("manifest.targetArch !== 'riscv64'"), '组件必须拒绝非 riscv64 资产')
expect(component.includes("manifest.runtimeId !== `lang/${runtime.value.assetId}`"), '组件必须按 assetId 校验远程运行时 ID')
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
console.log(`Hello Lang remote runtime check passed: ${all.length} products, ${supported.length} runnable entries, ${physicalAssets.size} physical RISC-V 64 assets.`)
