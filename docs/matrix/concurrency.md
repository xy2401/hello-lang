# ⚡ 跨语言并发与异步模型大比拼

> 在现代高并发与分布式系统开发中，不同编程语言选择了完全不同的并发演进路径。本文深度对比 **Java (虚拟线程)**、**Go (Goroutine)**、**Rust (Async/Tokio)**、**Node.js/Python (Event Loop)** 以及 **C# (TAP Task)** 的底层调度原理与代码形态。

---

## 1. 📊 八大语言并发模型横向矩阵

| 语言 | 主流并发范式 | 调度模型 | 栈内存开销 | 典型上下文切换耗时 | 线程/协程安全保证 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Java 21+** | 虚拟线程 (Virtual Threads) | M:N 协程调度器 | ~几百字节 (动态) | < 100ns | 依赖 `ReentrantLock` / `ScopedValue` |
| **Go** | Goroutines & Channels | M:N GMP 调度器 | 初始 2KB (动态扩容) | ~10ns - 100ns | CSP 模式 (Do not communicate by sharing memory) |
| **Rust** | Async/Await (Tokio / async-std) | 无堆分配 Future 状态机 | 0 额外栈开销 (编译为 Struct) | < 10ns | **编译期 Send/Sync Trait 静态无数据竞争** |
| **JS / Node** | Event Loop (Libuv) | 单线程非阻塞 Event Loop | 0 (基于微任务/宏任务) | N/A (单线程无线程切换) | 单线程天然无数据竞争 |
| **Python** | asyncio Event Loop | 单线程事件循环 (GIL 限制) | ~1KB | N/A (单线程无线程切换) | 受限于 GIL，CPU 密集需 multiprocessing |
| **C++ (C++20)**| 无堆分配 Coroutines | 编译器生成无栈/有栈状态机 | 视帧状态而定 | < 10ns | 手动 `std::mutex` / 原子量 `std::atomic` |
| **C#** | Task / async-await (TAP) | 线程池 TaskScheduler | ~几百字节 (Task 堆对象) | ~50ns | 依赖 `SemaphoreSlim` / `lock` |
| **Kotlin** | Coroutines (挂起函数) | 状态机变换 (CPS 逆变) | ~几百字节 | < 100ns | 依赖 `Mutex` / `Flow` 响应式流 |

---

## 2. 🔍 核心并发演进流派拆解

### 流派 A: M:N 调度与轻量级有栈协程 (Java Virtual Threads & Go Goroutines)
- **原理**: 运行时（JVM / Go Runtime）自己维护调度器，将大量（百万级）用户态协程映射到少量（如 CPU 核数） OS 操作系统线程上。
- **代表语法**:
  - **Go**: `go func() { ch <- data }()`
  - **Java 21**: `Executors.newVirtualThreadPerTaskExecutor().submit(() -> ...)`

### 流派 B: 编译期零成本无栈状态机 (Rust & C++20)
- **原理**: 不分配独立的协程栈，编译器自动将 `async fn` 编译为一个实现 `Future` 的枚举/状态机结构体。
- **代表语法**:
  - **Rust**: `tokio::spawn(async move { do_work().await });`

### 流派 C: 单线程事件循环与 Async/Await (JavaScript & Python)
- **原理**: 主线程永不阻塞，所有 I/O 操作均交由底层 OS (epoll/kqueue) 异步处理，完成后将回调放入队列。
- **代表语法**:
  - **JS**: `const res = await fetch('/api');`
  - **Python**: `res = await asyncio.gather(*tasks)`

---

## 3. 💻 真实代码形态对比

### Java 21 (Virtual Threads)
```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(1000); // 透明无感挂起，不阻塞 OS 线程！
            return i;
        });
    });
}
```

### Go (Goroutines)
```go
ch := make(chan int, 100)
for i := 0; i < 100000; i++ {
    go func(val int) {
        time.Sleep(time.Second)
        ch <- val
    }(i)
}
```

### Rust (Tokio)
```rust
let handles: Vec<_> = (0..100_000).map(|i| {
    tokio::spawn(async move {
        tokio::time::sleep(Duration::from_secs(1)).await;
        i
    })
}).collect();
```
