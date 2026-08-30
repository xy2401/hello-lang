import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const supported = ['java', 'javascript', 'typescript', 'python', 'cpp', 'go', 'rust', 'kotlin', 'php', 'ruby', 'html', 'css']
const all = [...supported.slice(0, 7), 'csharp', ...supported.slice(7)]
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const failures = []
const expect = (condition, message) => { if (!condition) failures.push(message) }

const catalog = read('docs/.vitepress/theme/data/languageContainerRuntimes.ts')
const component = read('docs/.vitepress/theme/components/LanguageContainerWorkbench.vue')
const config = read('docs/.vitepress/config.ts')
const index = read('docs/playground/index.md')
const dockerfile = read('docs/public/runtime/c2w/Dockerfile')
const workflow = read('.github/workflows/build-c2w-runtimes.yml')
const headers = read('docs/public/_headers')

for (const runtime of all) {
  const page = `docs/playground/container-${runtime}.md`
  expect(fs.existsSync(path.join(root, page)), `缺少 ${page}`)
  if (fs.existsSync(path.join(root, page))) {
    const pageText = read(page)
    expect(pageText.includes(`<LanguageContainerWorkbench runtimeId="${runtime}" />`), `${page} 没有绑定正确运行时`)
  }
  expect(config.includes(`/playground/container-${runtime}`), `侧栏缺少 ${runtime}`)
  expect(index.includes(`./container-${runtime}.md`), `实验台总览缺少 ${runtime}`)
  expect(catalog.includes(`id: '${runtime}'`), `运行时目录缺少 ${runtime}`)
}

for (const runtime of supported) {
  expect(workflow.includes(`- ${runtime}`) || workflow.includes(`"${runtime}"`), `流水线缺少 ${runtime}`)
  expect(dockerfile.includes(`${runtime})`), `Dockerfile 缺少 ${runtime}`)
}

expect(catalog.includes("id: 'csharp'") && catalog.includes('supported: false'), 'C# 必须明确标记为不可用')
expect(component.includes("manifest.targetArch !== 'riscv64'"), '组件必须拒绝非 riscv64 资产')
expect(workflow.includes('--platform linux/riscv64'), '镜像必须只构建 linux/riscv64')
expect(workflow.includes('--target-arch=riscv64'), 'container2wasm 必须只生成 riscv64')
expect(!/amd64|x86_64/i.test(dockerfile), 'Dockerfile 不得出现 x64 回退')
expect(!/--target-arch=(amd64|x86_64)/i.test(workflow), '流水线不得生成 x64 资产')
expect(headers.includes('Cross-Origin-Embedder-Policy: require-corp'), '缺少 Cross-Origin Isolation 响应头')

if (process.argv.includes('--assets')) {
  for (const runtime of supported) {
    const directory = path.join(root, `docs/public/runtime/c2w-${runtime}`)
    if (!fs.existsSync(directory)) continue
    const manifestPath = path.join(directory, 'manifest.json')
    expect(fs.existsSync(manifestPath), `${runtime} 缺少 manifest.json`)
    if (!fs.existsSync(manifestPath)) continue
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    expect(manifest.targetArch === 'riscv64', `${runtime} 不是 riscv64`)
    expect(manifest.runtimeId === runtime, `${runtime} 的 runtimeId 错误`)
    expect(Array.isArray(manifest.chunks) && manifest.chunks.length > 0, `${runtime} 没有运行时分片`)
    for (const chunk of manifest.chunks ?? []) {
      expect(fs.existsSync(path.join(directory, chunk.filename)), `${runtime} 缺少 ${chunk.filename}`)
    }
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}
console.log(`RISC-V 64 语言容器结构检查通过：${all.length} 个入口，${supported.length} 个可构建运行时。`)
