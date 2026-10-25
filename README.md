# 🚀 Hello Lang

> **常用编程语言概念、基础语法与版本演进手册 (Multi-Language Concept Explorer & Version Evolution Matrix)**
> 
> `hello-lang` 是面向开发者的编程语言学习与横向对比项目。属于 `hello-*` 系列开源学习矩阵（已落地 `hello-lang`、`hello-sql`、`hello-mq`，`hello-shell`）。

---

## 🌟 核心特色 (Key Features)

- 📌 **统一标准基础语法骨架 (Standardized Basic Syntax)**
  - 18 个产品分卷覆盖 **Java、Kotlin、Groovy、Scala、Clojure、JS/TS、Python、C/C++、Rust、Go、PHP、C#、Ruby、Lisp 家族、Lua、HTML、CSS**。
  - 深度 Matrix 选择代表语言横向比较；Lisp 四方言、Lua 与其他语言在各自产品分卷保留原生模型、工具链和版本结构。

- 🧱 **逐语言数据结构与算法专题**
  - 每个产品分卷提供 `data-structures` 与 `algorithms` 两篇核心教程，突出标准库惯用法、复杂度与语言独有特性。
  - 教程直接引用 `demos/` 中的真实源码；运行时语言配套输出快照，HTML/CSS 提供浏览器 Live 预览。

- 🌐 **6 大横向概念对比大屏 (`docs/matrix/`)**
  - **[📌 基础语法跨语言对照](docs/matrix/basic-syntax.md)**: 既有横向矩阵范围内的原生代码块与适用边界对比。
  - **[⚡ 并发与异步模型](docs/matrix/concurrency.md)**: 虚拟线程 vs Goroutine vs Tokio vs Event Loop vs Task。
  - **[🧠 内存管理与 GC 回收](docs/matrix/memory.md)**: Rust 0-GC 所有权 vs Java ZGC 亚毫秒停顿 vs Go 三色标记。
  - **[📦 包管理与工具链](docs/matrix/package-management.md)**: Maven/Gradle vs npm/pnpm vs uv/Poetry vs Cargo vs Go Modules vs Composer vs NuGet.
  - **[🔀 类型系统与模式匹配](docs/matrix/type-system.md)**: 类型擦除 vs 编译期单态化 vs 具象化泛型。
  - **[🛡️ 错误处理与控制流](docs/matrix/error-handling.md)**: `Result<T,E>` vs `(val, err)` vs Exception 冒泡。

- 🐳 **Live Docker 自动化真实运行验证引擎**
  - Java、Python、C++、Rust、Go 等运行时语言使用固定版本容器镜像隔离编译与运行。
  - HTML、CSS 与浏览器 JavaScript 使用“高亮源码 / Live 效果”直接预览；HTML Validator、Stylelint 与 JS 语法检查在本地/CI 静态执行，不经过 Docker。

- ⚡ **高亮源码 / Live 效果浏览器交互沙箱**
  - HTML、CSS 与 JavaScript 支持语法高亮编辑、源码/效果切换和隔离预览；另集成 Pyodide 与 Web Worker 运行环境。

---

## 📂 目录结构 (Directory Architecture)

```text
hello-lang/
├── demos/                    # 18 个语言与 Web 技术产品的 Demo / Docker 证据目录
│   ├── java/                 # BasicDemo.java, JDK 8~25 进阶特性代码
│   ├── js/                   # basic_demo.js, ES6~ES2024, Node 14~22
│   ├── html/                 # 语义化结构与现代 HTML 原生元素
│   ├── css/                  # 层叠、布局、容器查询与现代 CSS
│   ├── python/               # basic_demo.py, PEP 572, 634, 695
│   ├── cpp/                  # C 语言介绍、basic_demo.cpp、C++11/20/23
│   ├── rust/                 # basic_demo.rs, Edition 2018, 2021
│   ├── go/                   # basic_demo.go, Go 1.18 泛型, 1.22 循环
│   ├── php/                  # basic_demo.php, PHP 8.3 属性/Enum
│   ├── csharp/               # BasicDemo.cs, C# 12 / .NET 8 LTS
│   ├── ruby/                 # basic_demo.rb, Ruby 3.3 YJIT
│   ├── kotlin/               # basic_demo.kt, Kotlin K2 编译器
│   ├── groovy/               # Groovy Docker 证据目录
│   ├── scala/                # Scala Docker 证据目录
│   ├── clojure/              # Clojure Docker 证据目录
│   ├── lisp/                 # Common Lisp, Scheme, Clojure, Racket
│   └── lua/                  # Lua 5.5.1 与 Table/Coroutine 示例
├── docs/                     # VitePress 文档源码
│   ├── products/             # 18 个产品的独立手册
│   ├── matrix/               # 6 大横向概念对比大屏目录
│   └── .vitepress/           # 主题组件 (DockerOutput, CodeRunner, VersionDiff)
├── scripts/
│   └── run-docker-demos.js   # Live Docker 编译运行与日志抓取脚本
├── package.json              # 项目依赖与脚本配置
└── README.md                 # 项目说明文档
```

---

## 🛠️ 本地开发与使用指南 (Quick Start)

### 1. 环境准备
需要准备 Node.js（`^20.19.0` 或 `>=22.16.0`）。仅在验证需要独立运行时的语言示例时需要 Docker；HTML、CSS 与浏览器 JavaScript Live 不需要 Docker。

### 2. 安装依赖
```bash
npm install
```

### 3. 执行 Docker 自动化编译与运行日志收集
```bash
npm run collect-outputs
```

### 4. 启动 VitePress 开发服务器
```bash
npm run docs:dev
```
访问 `http://127.0.0.1:24042/` 或控制台输出的地址即可进行实时预览。

容器实验台通过 `.env.development` 从 `http://127.0.0.1:24044/runtime` 读取运行时，本地使用时需同时启动 Hello WASM。修改该环境文件后需重启 Hello Lang。

### 5. 构建生产静态页面
```bash
npm run docs:build
```

---

## Cloudflare Workers 部署

仓库根目录的 [wrangler.jsonc](wrangler.jsonc) 声明了构建命令和静态资源目录。Wrangler 在部署阶段执行 `npm run docs:build`，随后发布 `docs/.vitepress/dist`；页面使用静态 HTML 路由和 VitePress 的 404 页面。

在 Cloudflare Workers 中导入本仓库，Worker 名称使用 `hello-lang`（与配置中的 `name` 一致），根目录使用仓库根目录，**构建命令留空**，部署命令保留默认的 `npx wrangler deploy`。构建环境使用 Node.js 22.16+，站点默认部署到域名根路径 `/`，无需设置 `DOCS_BASE`。

构建命令由 Wrangler 执行，不依赖控制台自动填充构建命令字段。配置方式见 [Wrangler 自定义构建](https://developers.cloudflare.com/workers/wrangler/custom-builds/)和 [Workers 静态站点路由](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)。

## 容器命令与完整文件数据

Java 新入口：[容器内命令](docs/products/java/docker-commands.md)、[命令示例与结果](docs/products/java/docker-command-ops.md)。新采集基线为 Ubuntu 26.04 / Temurin 25.0.3+9；旧 Docker 页面保留历史环境记录。

完整文件清单、安装锁和采集历史归 [Hello Docker](https://github.com/xy2401/hello-docker/blob/codex/hello-docker/docs/support/software-capture.md) 管理。本站只保存导入并校验过的 `docs/public/docker-data/java/` 展示包，构建不读取相邻仓库。初始 `pending` 包只有计划命令及案例，不代表已经运行。

## 📜 许可证 (License)

[MIT License](LICENSE) © 2026 Hello-Lang Platform
