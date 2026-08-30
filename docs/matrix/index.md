# 横向概念矩阵大屏 (Cross-Language Concept Matrix)

本页面按 **并发模型**、**内存管理** 与 **类型系统** 对代表性编程语言进行横向深度对比；完整产品清单以各语言分卷为准。

---

## ⚡ 并发与异步模型对比 {#concurrency}

| 语言 | 主流并发范式 | 调度模型 | 特色机制 | 代表代码 |
| :--- | :--- | :--- | :--- | :--- |
| **Java (JDK 21+)** | 虚拟线程 (Virtual Threads) | M:N 协程调度 | 阻塞代码透明无感提升 | `Executors.newVirtualThreadPerTaskExecutor()` |
| **Go** | CSP Channel & Goroutine | M:N GMP 调度器 | 通道 channel 通信共享内存 | `go func() { ch <- data }()` |
| **Rust** | Async/Await & Tokio | 无缝零成本 Future | 无数据竞争内存安全 | `tokio::spawn(async move { ... })` |
| **Python** | asyncio Event Loop | 单线程事件循环 | `async/await` 协程 | `asyncio.gather(*tasks)` |
| **JavaScript** | Event Loop & Web Worker | 单线程非阻塞 I/O | Microtask / Macrotask 队列 | `Promise.all([p1, p2])` |
| **C++ (C++20)** | 无堆分配 Coroutines | 编译器生成状态机 | `co_await`, `co_yield` | `co_return value;` |

---

## 🧠 内存管理与 GC 模型对比 {#memory}

| 语言 | 内存管理机制 | 运行期开销 | 内存安全保证 |
| :--- | :--- | :--- | :--- |
| **Java** | G1 / ZGC 垃圾回收器 | STW (毫秒级~亚毫秒级) | 运行期安全 (无野指针) |
| **Rust** | **RAII + 所有权 / 借用检查器** | **零运行期开销 (0ms GC)** | **编译期 100% 静态安全** |
| **C++** | 手动管理 / RAII 智能指针 | 零开销 | 依赖程序员规范 (`unique_ptr`) |
| **Python** | 引用计数 + 分代 GC | 有开销 | 运行期安全 |
| **Go** | 三色标记 Concurrent GC | 极低延迟 (<1ms) | 运行期安全 |

---

## 🔤 类型系统与泛型矩阵 {#types}

| 语言 | 类型系统分类 | 泛型实现机制 | 特性/约束 |
| :--- | :--- | :--- | :--- |
| **Java** | 静态强类型 | 类型擦除 (Type Erasure) | 运行时退化为 Object/Upper bound |
| **C++** | 静态强类型 | 模板实例化 (Template Instantiation) | 编译期代码膨胀，零成本抽象 |
| **Rust** | 静态强类型 | 单态化 (Monomorphization) | 配合 Trait Bounds 编译期特化 |
| **TypeScript** | 静态结构化类型 | 编译期纯类型检查 | 运行时擦除为纯 JS |
| **Python** | 动态强类型 | PEP 484 Type Hints (渐进式) | 运行时可由 pyright/mypy 校验 |
