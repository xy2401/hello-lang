# 📦 包管理与构建

不同语言把“依赖”拆在不同层次。先分清工具职责，再比较命令：

- **运行时版本管理器**切换 JDK、Node.js、Python、Ruby 等工具链版本，例如 SDKMAN、fnm、pyenv、rustup；它不解析项目依赖。
- **包管理器与依赖解析器**读取项目清单、选择版本、下载包并生成锁定或完整性记录，例如 Maven、npm、uv、Cargo。
- **构建工具**把源码变成产物，例如 Ant、Gradle、CMake；部分工具同时集成依赖管理，但 CMake 本身不是包管理器。
- **包仓库**保存和分发制品，例如 Maven Central、npm、PyPI、crates.io；仓库也不是本地安装工具。

## 横向索引

| 语言 | 主流方案 | Manifest | Lockfile / 完整性 | 默认仓库 | 新项目默认建议 |
| --- | --- | --- | --- | --- | --- |
| [Java](/products/java/package) | Maven / Gradle | `pom.xml` / `build.gradle.kts` | Gradle dependency lock；Maven 固定版本与 BOM | Maven Central | Maven 求稳；复杂构建用 Gradle Wrapper |
| [Kotlin](/products/kotlin/package) | Gradle Kotlin DSL / Maven | `build.gradle.kts` / `pom.xml` | Gradle lock / Maven 固定解析 | Maven Central | JVM/KMP 优先 Gradle，并统一 Kotlin 插件版本 |
| [Groovy](/products/groovy/package) | Gradle / Maven / Grape | `build.gradle` / `pom.xml` / `@Grab` | Gradle lock / Maven 固定版本 | Maven Central | 应用优先 Gradle Wrapper；一次性脚本才用 Grape |
| [Scala](/products/scala/package) | sbt / Scala CLI / Mill | `build.sbt` / 源码指令 / `build.mill` | Coursier 解析与受控锁定 | Maven Central | 成熟项目用 sbt；单文件和小项目用 Scala CLI |
| [Clojure](/products/clojure/package) | Clojure CLI / Leiningen | `deps.edn` / `project.clj` | 固定 Maven 版本与 Git SHA | Maven Central / Clojars | 新项目优先 tools.deps + tools.build；遗留项目保留 Leiningen |
| [JavaScript](/products/javascript/package) | npm / pnpm / Yarn / Bun | `package.json` | 各工具自己的 lockfile | npm registry | pnpm 或 npm；固定包管理器版本且只留一个锁文件 |
| [TypeScript](/products/typescript/package) | JavaScript 包管理器 + `tsc` | `package.json`、`tsconfig.json` | 同所选包管理器 | npm registry | 编译器放开发依赖，明确 `types` 与生成物边界 |
| [Python](/products/python/package) | uv / pip-tools / Poetry / pip | `pyproject.toml`、`requirements.in` | `uv.lock` / `poetry.lock` / 固定 requirements | PyPI | 新应用优先 uv；保守项目用 venv + pip-tools |
| [Go](/products/go/package) | Go Modules | `go.mod` | `go.sum` 是完整性记录 | Go module proxy | 使用 Modules；离线或审计场景再 vendor |
| [Rust](/products/rust/package) | Cargo | `Cargo.toml` | `Cargo.lock` | crates.io | Cargo；应用和 workspace 提交锁文件 |
| [C & C++](/products/cpp/package) | Conan / vcpkg / 系统包 | `conanfile.*` / `vcpkg.json` | Conan lock / vcpkg baseline | Conan Center / vcpkg registry / OS | 按 ABI 与交付环境选 Conan 或 vcpkg |
| [C#](/products/csharp/package) | NuGet / dotnet CLI | `.csproj` / `Directory.Packages.props` | `packages.lock.json` | nuget.org | `PackageReference`；多项目使用 CPM |
| [PHP](/products/php/package) | Composer | `composer.json` | `composer.lock` | Packagist | Composer，部署只运行 `install` |
| [Ruby](/products/ruby/package) | RubyGems + Bundler | `.gemspec` / `Gemfile` | `Gemfile.lock` | RubyGems.org | Bundler；应用提交锁文件 |
| [HTML](/products/html/package) | vendoring / npm / pnpm / import maps | `package.json` 或 HTML 映射 | 所选包管理器 lockfile / SRI | npm registry / CDN | 简单页 vendor；工程项目使用 npm/pnpm |
| [CSS](/products/css/package) | vendoring / npm / pnpm | `package.json`、工具配置 | 所选包管理器 lockfile / SRI | npm registry / CDN | 分开管理浏览器 CSS 与 Sass/PostCSS/Stylelint 工具 |

## 共同原则

1. 运行时、包管理器和构建工具分别固定版本；Java 使用 Wrapper，Node.js 工具通过 Corepack 或 `packageManager` 字段固定。
2. 一个项目只维护一套依赖真相和一个对应锁文件，不同时提交 npm、Yarn 与 pnpm 的锁文件。
3. CI 与部署采用 frozen、locked 或等价安装模式；升级应作为独立、可审查的变更。
4. 依赖树、完整性校验与漏洞检查解决不同问题，需要分别执行。
5. 缓存和镜像只是下载来源，不是锁文件；更换来源后仍要保留 TLS、哈希和来源审计。
