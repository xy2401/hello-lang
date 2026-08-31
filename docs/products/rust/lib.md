# Rust 常用类库索引

Rust 的标准库和第三方 crate 提供了强大的功能支持。

## 📦 核心类库分类

### 标准库精选
- **Option/Result** - 错误处理模式
- **Iterator** - 迭代器适配器
- **Vec/String** - 基础容器类型
- **HashMap** - 哈希表实现
- **Arc/RwLock/Mutex** - 线程安全引用计数和锁
- **async/await** - 异步编程原语

### Web 开发栈
- **Web 框架** - Actix-web, Axum, Rocket, Warp
- **ORM/查询** - SeaORM, Diesel, SQLx, Tide
- **HTTP 客户端** - reqwest, hyper
- **序列化** - serde, serde_json

### 系统与工具
- **日志** - log, tracing, env_logger
- **命令行** - clap, structopt, anyhow, thiserror
- **构建系统** - Cargo（内置包管理器）
- **进程管理** - tokio-process, crossbeam

### 并发与网络
- **运行时** - tokio, async-std
- **消息传递** - crossbeam-channel, flume
- **内存池** - mimalloc, jemallocator

### 测试与质量
- **测试框架** - builtin test macro, criterion（基准测试）
- **Mock 工具** - mockall, wiremock
- **类型检查** - clippy（静态分析工具）
- **代码格式** - rustfmt（官方格式化工具）

### 特定领域
- **数据处理** - arrow, parquet, datafusion
- **AI/ML** - burn, dfdx
- **区块链** - solana, near-sdk-rs
- **游戏引擎** - bevy, macroquad

---

*注：Rust 强调零成本抽象和安全并发的特点*
