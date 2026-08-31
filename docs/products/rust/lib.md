# Rust 常用第三方库（Crate）

## 📦 Web 框架

### Actix-web
官方链接：https://docs.rs/actix-web
高性能异步 Web 框架，基于 Actix 运行时。支持 HTTP/1.1 和 HTTP/2、中间件系统、WebSocket。适合高并发场景。

GitHub: [20k+ stars](https://github.com/actix/actix-web)

### Axum
官方链接：https://docs.rs/axum
Tokio 生态 Web 框架，Type-safe 路由设计。与 Tokio 深度集成，类型安全，开发者友好。

GitHub: [16k+ stars](https://github.com/tokio-rs/axum)

### Rocket
官方链接： https://www.rocket.rs/
易用性高，类型安全，开发者友好。内置安全特性、静态文件服务、表单处理。学习曲线平缓。

GitHub: [13k+ stars](https://github.com/SergioBenitez/Rocket)

### Warp
官方链接： https://docs.rs/warp
函数式 Web 框架，组合过滤器构建路由。轻量级、高性能，基于 tokio async。

GitHub: [6k+ stars](https://github.com/seanmonstar/warp)

## 🗄️ 数据库与 ORM

### SeaORM
官方链接： https://sea-ql.org/SeaORM/
异步 ORM，生成器驱动，支持多数据库。代码生成、查询构建、关系映射。异步优先设计。

GitHub: [7k+ stars](https://github.com/SeaQL/SeaORM)

### SQLx
官方链接： https://docs.rs/sqlx
静态查询 SQL，编译时验证语法。比 ORM 更灵活，性能接近原生 SQL。支持 PostgreSQL/MySQL/MariaDB/SQLite。

GitHub: [9k+ stars](https://github.com/launchbadge/sqlx)

### Diesel
官方链接： https://diesel.rs/
传统 ORM，同步操作，类型安全强。迁移系统完善、查询构建器强大。成熟稳定但学习曲线陡。

GitHub: [8k+ stars](https://github.com/diesel-rs/diesel)

### Tide
官方链接： https://docs.rs/tide
异步微框架，类似 Express.js。请求路由、中间件支持、WebSocket。轻量级入门之选。

GitHub: [5k+ stars](https://github.com/http-rs/tide)

## 🧪 测试工具

### Criterion
官方链接： https://bheisler.github.io/criterion.rs/book/
性能基准测试，统计图表生成。支持多种统计方法、HTML 报告生成。专业级 benchmarking 工具。

GitHub: [4k+ stars](https://github.com/bheisler/criterion.rs)

### Mockall
官方链接： https://docs.rs/mockall
Mock 对象生成器，支持 trait mock。配合 testing 使用，隔离测试对象。

GitHub: [1k+ stars](https://github.com/asomers/mockall)

## 🔧 实用工具库

### Serde
官方链接： https://serde.rs/
序列化/反序列化核心库，JSON/XML/CSV/TOML 支持。trait-based 设计，零成本抽象，Rust 生态必备。

GitHub: [7k+ stars](https://github.com/serde-rs/serde)

### Tokio
官方链接： https://tokio.rs/
异步运行时，主流选择，多线程。任务调度、IO 操作、定时器。async/await 生态系统核心。

GitHub: [22k+ stars](https://github.com/tokio-rs/tokio)

### Async-std
官方链接： https://async.rs/
异步标准库实现，类似 JavaScript Promise。提供 async/await的 stdlib 版本，兼容性好。

GitHub: [12k+ stars](https://github.com/async-rs/async-std)

### Clap
官方链接： https://docs.rs/clap
CLI 参数解析，自动生成帮助文档。支持子命令、变量推导、Shell 补全。命令行应用标配。

GitHub: [18k+ stars](https://github.com/clap-rs/clap)

### Anyhow
官方链接： https://docs.rs/anyhow
错误处理，返回堆栈追踪。Result 类型简化，error_chain 替代品。简单好用。

GitHub: [2k+ stars](https://github.com/dtolnay/anyhow)

### Thiserror
官方链接： https://docs.rs/thiserror
自定义错误类型，宏定义。通过 derive 派生 Error trait，类型安全。

GitHub: [2k+ stars](https://github.com/dtolnay/thiserror)

### Tracing
官方链接： https://tracing.rs/
结构化日志和调用追踪。Span 追踪、字段收集、性能监控。高级调试工具。

GitHub: [3k+ stars](https://github.com/tokio-rs/tracing)

### Reqwest
官方链接： https://docs.rs/reqwest
HTTP 客户端，支持 async/await。Cookie 管理、SSL、Proxy 支持。网络编程必备。

GitHub: [4k+ stars](https://github.com/seanmonstar/reqwest)

## 🏗️ 构建与工具

### Cargo
官方链接： https://doc.rust-lang.org/cargo/
包管理器和构建工具（内置）。自动解决依赖、编译打包、单元测试运行。Rust 开发核心工具。

### Rustfmt
官方链接： https://doc.rust-lang.org/rustfmt/
代码格式化（内置）。统一代码风格，一行命令搞定。IDE 集成好。

### Clippy
官方链接： https://doc.rust-lang.org/clippy/
静态分析工具（内置）。发现潜在 bug、优化建议、代码风格检查。每日必跑。

## 🎮 特定领域

### Bevy
官方链接： https://bevyengine.org/
现代游戏引擎，ECS 架构。物理模拟、动画系统、资源加载。Rust 游戏开发首选。

### Arrow/Parquet
官方链接： https://arrow.apache.org/docs/rust/
大数据处理，列式存储。Spark/Pandas 数据交换格式，PB 级数据处理能力。

### Burn/Dfdx
官方链接： https://burn.rs / https://dfdx.dev/
深度学习框架，神经网络训练。GPU 加速、反向传播、模型保存。Rust AI 生态基础。

### Solana
官方链接： https://docs.solana.com/developing/programming-model
区块链开发，Rust SDK 完善。智能合约、代币交易、DeFi 应用。Web3 项目首选语言。

---

*注：部分经典库已过时，请参考现代替代方案*
