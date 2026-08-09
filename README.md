# 🚀 Hello Lang

> **全主流编程语言概念、基础语法与版本演进大典 (Multi-Language Concept Explorer & Version Evolution Matrix)**
> 
> `hello-lang` 是开发者横向学习与纵深对比全主流编程语言的终极知识库。属于 `hello-*` 系列开源矩阵（未来规划包含 `hello-lang`、`hello-sql`、`hello-shell`）。

---

## 🌟 核心特色 (Key Features)

- 📌 **统一标准基础语法骨架 (Standardized Basic Syntax)**
  - 覆盖 **Java, JS/TS, Python, C++, Rust, Go, PHP, C#, Ruby, Kotlin** 10 大主力语言。
  - 所有语言均采用统一的 4 步标准注释结构：`1.1 变量与常量` -> `1.2 数据类型` -> `2.1 条件分支` -> `2.2 集合循环` -> `3.1 函数定义` -> `4.1 类/结构体封装`。

- 🌐 **6 大横向概念对比大屏 (`docs/matrix/`)**
  - **[📌 基础语法跨语言对照](file:///workspaces/hello-world/docs/matrix/basic-syntax.md)**: 10 大语言原生代码块精准对比。
  - **[⚡ 并发与异步模型](file:///workspaces/hello-world/docs/matrix/concurrency.md)**: 虚拟线程 vs Goroutine vs Tokio vs Event Loop vs Task。
  - **[🧠 内存管理与 GC 回收](file:///workspaces/hello-world/docs/matrix/memory.md)**: Rust 0-GC 所有权 vs Java ZGC 亚毫秒停顿 vs Go 三色标记。
  - **[📦 包管理与工具链](file:///workspaces/hello-world/docs/matrix/package-management.md)**: Maven/Gradle vs npm/pnpm vs uv/Poetry vs Cargo vs Go Modules vs Composer vs NuGet.
  - **[🔀 类型系统与模式匹配](file:///workspaces/hello-world/docs/matrix/type-system.md)**: 类型擦除 vs 编译期单态化 vs 具象化泛型。
  - **[🛡️ 错误处理与控制流](file:///workspaces/hello-world/docs/matrix/error-handling.md)**: `Result<T,E>` vs `(val, err)` vs Exception 冒泡。

- 🐳 **Live Docker 自动化真实运行验证引擎**
  - 使用官方容器镜像 (`eclipse-temurin`, `node`, `python`, `gcc`, `rust`, `golang`, `php`, `dotnet`, `ruby`) 隔离编译与运行。
  - 自动捕捉真实 stdout 输出与底层毫秒级执行耗时。

- ⚡ **零延迟 WASM / JS 浏览器在线交互沙箱**
  - 集成 Pyodide (Python CPython WASM) 与 Web Worker 运行环境，免后端即时运行代码。

---

## 📂 目录结构 (Directory Architecture)

```text
hello-lang/
├── demos/                    # 10 大语言真实源码 Demo 目录
│   ├── java/                 # BasicDemo.java, JDK 8~25 进阶特性代码
│   ├── js/                   # basic_demo.js, ES6~ES2024, Node 14~22
│   ├── python/               # basic_demo.py, PEP 572, 634, 695
│   ├── cpp/                  # basic_demo.cpp, C++11, C++20, C++23
│   ├── rust/                 # basic_demo.rs, Edition 2018, 2021
│   ├── go/                   # basic_demo.go, Go 1.18 泛型, 1.22 循环
│   ├── php/                  # basic_demo.php, PHP 8.3 属性/Enum
│   ├── csharp/               # BasicDemo.cs, C# 12 / .NET 8 LTS
│   ├── ruby/                 # basic_demo.rb, Ruby 3.3 YJIT
│   └── kotlin/               # basic_demo.kt, Kotlin 2.0 K2 编译器
├── docs/                     # VitePress 文档源码
│   ├── languages/            # 10 大语言分卷详细文档与 basic.md
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
需要准备 Node.js (>= 18.0) 以及 Docker (若需要运行 Live Docker 抓取)。

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
访问 `http://localhost:5173` 或控制台输出的开发端口即可进行实时预览。

### 5. 构建生产静态页面
```bash
npm run docs:build
```

---

## 📜 许可证 (License)

[MIT License](LICENSE) © 2026 Hello-Lang Platform