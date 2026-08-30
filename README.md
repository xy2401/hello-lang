# 🚀 Hello Lang

> **常用编程语言概念、基础语法与版本演进手册 (Multi-Language Concept Explorer & Version Evolution Matrix)**
> 
> `hello-lang` 是面向开发者的编程语言学习与横向对比项目。属于 `hello-*` 系列开源学习矩阵（已落地 `hello-lang`、`hello-sql`、`hello-mq`，`hello-shell`）。

---

## 🌟 核心特色 (Key Features)

- 📌 **统一标准基础语法骨架 (Standardized Basic Syntax)**
  - 覆盖 **Java、Kotlin、Groovy、Scala、Clojure、JS/TS、Python、C/C++、Rust、Go、PHP、C#、Ruby、HTML、CSS**。
  - 深度 Matrix 选择代表语言横向比较；完整产品分卷保留每门语言自己的工具链和版本结构。

- 🌐 **6 大横向概念对比大屏 (`docs/matrix/`)**
  - **[📌 基础语法跨语言对照](docs/matrix/basic-syntax.md)**: 代表语言原生代码块与适用边界对比。
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
├── demos/                    # 16 个语言与 Web 技术产品的 Demo / Docker 证据目录
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
│   └── clojure/              # Clojure Docker 证据目录
├── docs/                     # VitePress 文档源码
│   ├── products/             # 16 个产品的独立手册
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
访问 `http://localhost:5173/` 或控制台输出的地址即可进行实时预览。

### 5. 构建生产静态页面
```bash
npm run docs:build
```

---

## 📜 许可证 (License)

[MIT License](LICENSE) © 2026 Hello-Lang Platform
