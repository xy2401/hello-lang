# 🌐 横向概念矩阵

> 本维度将 Java、JS/TS、Python、C++、Rust、Go、PHP、C#、Ruby、Kotlin、HTML、CSS 打通。HTML/CSS 作为声明式 Web 语言单独标注适用边界，不参与不适用的运行时指标排名。

---

## 🏛️ 横向概念对比核心维度

<div class="matrix-grid">

### 1. 📌 [基础语法](./basic-syntax.md)
基于统一的 4 步标准代码骨架，横向拆解对比 **变量与常量声明 (`1.1`)**、**基本数据类型 (`1.2`)**、**条件分支 (`2.1`)**、**集合循环 (`2.2`)**、**函数与默认参数 (`3.1`)** 以及 **类与结构体 (`4.1`)**。

---

### 2. 🧩 [面向对象](./object-model.md)
对比 **Java/C#/Kotlin 的基于类模型**、**JavaScript 的原型委托**、**Python/Ruby 的动态类模型**，以及 **Go Struct + Interface** 与 **Rust Struct + Trait** 的组合设计；重点拆解 JavaScript `class` 与原型链的真实关系。

---

### 3. ⚡ [并发与异步](./concurrency.md)
深入对比 **Java 21 虚拟线程 (Project Loom)**、**Go Goroutines (M:N GMP 调度)**、**Rust Tokio (Async/Await)**、**Node.js/Python 事件循环 (Event Loop)** 以及 **C# Task (TAP)**。包含耗时、线程开销、内存占用与通道机制。

---

### 4. 🧠 [内存管理与垃圾回收](./memory.md)
对比 **Rust (RAII 0-GC 所有权/借用检查器)**、**Java (ZGC / G1 亚毫秒停顿 GC)**、**Go (三色标记无停顿 GC)**、**C++ (智能指针与手动管理)**、**Node.js (V8 分代 GC)** 以及 **Python (引用计数 + 循环引用回收)**。

---

### 5. 📦 [包管理与构建](./package-management.md)
对比 **Java (Maven/Gradle)**、**JS (pnpm/npm)**、**Python (uv/poetry)**、**Rust (Cargo)**、**Go (go.mod)**、**PHP (Composer)**、**C# (NuGet)** 与 **Ruby (Bundler)** 的依赖清单文件、Lockfile 锁定原理与 Monorepo 工作区架构。

---

### 6. 🔀 [类型系统、泛型与模式匹配](./type-system.md)
对比 **Java (类型擦除 Type Erasure)** vs **C++/Rust (编译期单态化 Monomorphization)** vs **C# (具象化泛型 Reified Generics)** vs **TypeScript (结构化鸭子类型)**。以及 **Rust/Java/Python/C#/Ruby 模式匹配 (Pattern Matching)** 语法演进。

---

### 7. 🛡️ [错误处理](./error-handling.md)
对比 **Java/Python/C# (受检/非受检异常 Exception 机制)** vs **Rust (`Result<T, E>` + `?` 运算符)** vs **Go (`val, err` 显式显出)** vs **C++23 (`std::expected`)**。

</div>

---

## 📊 跨语言核心指标横向对照表

| 语言 | 基础语法定位 | 对象模型 | 主流包管理器 | 主流并发模型 | 内存管理机制 | 泛型底层机制 | 错误处理哲学 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Java** | 面向对象 / 显式类型 | 类 + 单继承 + 接口 | Maven / Gradle | 虚拟线程 M:N / 平台线程 1:1 | ZGC / G1 分代垃圾回收 | 编译期类型擦除 (Type Erasure) | try-catch 异常捕获 |
| **Go** | 简明结构化 / 无类继承 | Struct + 方法 + 隐式 Interface | Go Modules (`go.mod`) | Goroutine M:N GMP 调度 | 三色标记 Concurrent GC | 编译期类型参数 `[T any]` | 显式 `if err != nil` |
| **Rust** | 所有权 / 无 GC 强类型 | Struct/Enum + `impl` + Trait | Cargo (`Cargo.toml`) | Async/Await & Tokio 运行期 | **RAII 所有权 + 借用检查器 (0-GC)** | 编译期单态化 (Monomorphization) | `Result<T, E>` + `?` 运算符 |
| **JS / Node** | 动态弱类型 / 原型链 | 对象 + 原型委托；`class` 建于原型之上 | pnpm / npm / Bun | 单线程事件循环 (Event Loop) | V8 新生代/老生代分代 GC | TypeScript 编译期纯擦除 | try-catch / Promise catch |
| **Python** | 动态强类型 / 极简语法 | 动态类 + 多继承 + 鸭子类型 | uv / Poetry / pip | asyncio 事件 Loop / GIL 解释器 | 引用计数 + 循环 GC | PEP 484/695 静态类型标注 | try-except 异常捕获 |
| **C++** | 零成本抽象 / 手动/RAII | 类 + 多继承 + 模板多态 | CMake + vcpkg | 1:1 系统线程 / C++20 协程 | **RAII + 智能指针 / 手动管理 (0-GC)** | 编译期模板实例化 | Exception / C++23 `std::expected` |
| **PHP** | 现代强类型 / 动态脚手架 | 类 + 单继承 + Interface/Trait | Composer | Request 级别无状态 / Swoole | ZEND 引用计数 + 周期 GC | 运行时类型检查 | Exception / Throwable |
| **C#** | 云原生全栈 / 主构造函数 | 类/Record + 单继承 + 接口 | NuGet / dotnet CLI | Task / async-await (TAP) | CoreCLR 分代 GC | 运行时具象化 (Reified Generics) | try-catch 异常捕获 |
| **Ruby** | 极具表达力 / 万物皆对象 | 动态类 + Module/Mixin | Bundler (`Gemfile`) | Ractor 真正并行 / Fiber 协程 | Mark-Sweep 垃圾回收 | 动态类型 / Steep 签名 | begin-rescue 异常捕获 |
| **Kotlin** | 空安全 / JVM 优先 | 默认 `final` 类 + 接口 + 委托 | Gradle (`build.gradle.kts`) | Coroutines 协程状态机 | JVM 垃圾回收器 | 编译期类型擦除 + `inline reified` | Unchecked Exception |
| **HTML** | 声明式文档结构与语义 | 不适用；`class` 是元素分类属性 | npm 生态验证/构建工具 | 不适用；交互由浏览器与 JS 提供 | DOM 由浏览器管理 | 无泛型；元素与属性内容模型 | 规范校验、容错解析与可访问性检查 |
| **CSS** | 声明式样式、层叠与布局 | 不适用；选择器匹配 DOM | npm 生态验证/构建工具 | 不适用；动画由渲染引擎调度 | CSSOM 由浏览器管理 | 无泛型；选择器与值语法 | 无异常机制；无效声明被忽略并由 Lint 检出 |
