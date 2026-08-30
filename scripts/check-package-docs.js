import fs from 'node:fs'
import path from 'node:path'

const products = ['clojure', 'cpp', 'csharp', 'css', 'go', 'groovy', 'html', 'java', 'javascript', 'kotlin', 'php', 'python', 'ruby', 'rust', 'scala', 'typescript']
const officialHosts = {
  clojure: ['clojure.org'],
  cpp: ['cmake.org', 'learn.microsoft.com', 'docs.conan.io'],
  csharp: ['learn.microsoft.com'],
  css: ['sass-lang.com', 'stylelint.io'],
  go: ['go.dev'],
  groovy: ['groovy-lang.org', 'docs.gradle.org'],
  html: ['developer.mozilla.org'],
  java: ['ant.apache.org', 'maven.apache.org', 'docs.gradle.org'],
  javascript: ['docs.npmjs.com', 'pnpm.io'],
  kotlin: ['kotlinlang.org', 'docs.gradle.org'],
  php: ['getcomposer.org', 'packagist.org'],
  python: ['packaging.python.org', 'pip.pypa.io', 'docs.astral.sh'],
  ruby: ['guides.rubygems.org', 'bundler.io'],
  rust: ['doc.rust-lang.org', 'crates.io'],
  scala: ['www.scala-sbt.org', 'docs.scala-lang.org'],
  typescript: ['www.typescriptlang.org', 'docs.npmjs.com'],
}
const requiredTerms = {
  clojure: ['tools.deps', 'deps.edn', 'Leiningen', 'tools.build', 'Clojars'],
  cpp: ['pkg-config', 'FetchContent', 'Conan', 'vcpkg', 'CMake'],
  csharp: ['packages.config', 'PackageReference', 'Central Package Management', 'Paket'],
  css: ['Sass', 'PostCSS', 'Stylelint', 'npm', 'pnpm', 'CDN'],
  go: ['GOPATH', 'Go Modules', 'go.mod', 'go.sum', 'vendor', 'workspace'],
  groovy: ['Grape', 'Ivy', 'Maven', 'Gradle', 'Groovy 插件'],
  html: ['Bower', 'npm', 'pnpm', 'import maps', 'CDN'],
  java: ['Ant', 'Ivy', 'Maven', 'Gradle', 'Wrapper', 'BOM'],
  javascript: ['npm', 'Yarn', 'pnpm', 'Bun', 'packageManager'],
  kotlin: ['Maven', 'Gradle Kotlin DSL', 'Multiplatform', 'Kotlin 插件'],
  php: ['PEAR', 'Composer', 'Packagist', 'composer.lock', 'composer audit'],
  python: ['pip', 'venv', 'pip-tools', 'Poetry', 'uv', 'Conda'],
  ruby: ['RubyGems', 'Bundler', 'gemspec', 'Gemfile', 'Gemfile.lock'],
  rust: ['Cargo', 'features', 'workspace', 'Cargo.lock', 'registry', 'vendor'],
  scala: ['sbt', 'Maven', 'Gradle', 'Coursier', 'Scala CLI'],
  typescript: ['typescript', '@types', 'peerDependencies', 'exports', 'devDependencies'],
}

const root = process.cwd()
const sidebar = fs.readFileSync(path.join(root, 'docs/.vitepress/config.ts'), 'utf8')
const matrixFile = path.join(root, 'docs/matrix/package-management.md')
const matrix = fs.readFileSync(matrixFile, 'utf8').replace(/\r\n/g, '\n')
const failures = []
const contents = new Map()

function requireMatch(condition, message) {
  if (!condition) failures.push(message)
}

for (const product of products) {
  const relative = `docs/products/${product}/package.md`
  const file = path.join(root, relative)
  requireMatch(fs.existsSync(file), `${relative}: 文件不存在`)
  if (!fs.existsSync(file)) continue

  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
  const prose = text.replace(/```[\s\S]*?```/g, '')
  contents.set(product, text)
  const title = ['html', 'css'].includes(product) ? /^# .+工程依赖$/m : /^# .+依赖与包管理$/m

  requireMatch(text.length >= 1800, `${relative}: 内容过短，疑似占位页`)
  requireMatch(title.test(text), `${relative}: 标题与产品类型不符`)
  requireMatch(text.includes('资料核对日期：2026-08-28。'), `${relative}: 核对日期不正确`)
  requireMatch(/```(?:bash|powershell|json|xml|toml|kotlin|cmake|html)\n/.test(text), `${relative}: 缺少可复制代码块`)
  requireMatch(/优点|优势/.test(text) && /缺点|限制/.test(text), `${relative}: 缺少工具优缺点`)
  requireMatch(/选择|建议|适合场景|推荐用途/.test(text), `${relative}: 缺少选型结论`)
  requireMatch(/锁|完整性|校验/.test(text), `${relative}: 缺少锁定或完整性说明`)
  requireMatch(/缓存|store|cache/.test(text), `${relative}: 缺少缓存说明`)
  requireMatch(/漏洞|audit|安全公告/.test(text), `${relative}: 缺少漏洞检查说明`)
  requireMatch(!/(TODO|TBD|待补充|下一步|实验台|example\.invalid|这里应替换)/i.test(text), `${relative}: 存在占位或无关引导`)
  requireMatch(!/^<script\b|^<[A-Z][A-Za-z]+\b/m.test(prose), `${relative}: 不应嵌入动态组件`)

  for (const host of officialHosts[product]) {
    requireMatch(text.includes(`https://${host}`), `${relative}: 缺少官方来源 ${host}`)
  }
  for (const term of requiredTerms[product]) {
    requireMatch(text.includes(term), `${relative}: 缺少关键工具或概念 ${term}`)
  }

  const route = `/products/${product}/package`
  requireMatch(sidebar.includes(route), `${relative}: 侧栏未引用依赖页`)
  const cliPosition = sidebar.indexOf(`/products/${product}/cli`)
  const packagePosition = sidebar.indexOf(route)
  const nextPosition = sidebar.indexOf(`/products/${product}/basic`)
  const versionPosition = sidebar.indexOf(`/products/${product}/version/`)
  const followingPosition = nextPosition >= 0 ? nextPosition : versionPosition
  requireMatch(cliPosition >= 0 && packagePosition > cliPosition, `${relative}: 依赖入口应位于 CLI 页之后`)
  requireMatch(followingPosition > packagePosition, `${relative}: 依赖入口应位于基础语法或版本演进之前`)

  const matrixLink = `](${route})`
  requireMatch(matrix.split(matrixLink).length - 1 === 1, `${relative}: Matrix 应且仅应链接一次`)
}

requireMatch(new Set(contents.values()).size === contents.size, '存在内容完全相同的依赖页')
requireMatch(matrix.includes('运行时版本管理器') && matrix.includes('包管理器与依赖解析器') && matrix.includes('构建工具'), 'Matrix 缺少工具角色边界')
requireMatch(!/^## (依赖声明文件|Monorepo)/m.test(matrix), 'Matrix 仍包含被移除的长篇重复章节')
requireMatch(!/(TODO|TBD|待补充|下一步|实验台|<package>|<crate>)/i.test(matrix), 'Matrix 存在占位或无关引导')

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Package docs check passed: ${products.length} language products`)
