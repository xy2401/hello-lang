# Rust 常用外部依赖库（Crate）

## 📦 Web 框架

| 库名 | 简介 | Crate 地址 | GitHub |
|------|------|----------|--------|
| **Actix-web** | 高性能异步 Web 框架，基于 Actix 运行时 | [docs.rs/actix-web](https://docs.rs/actix-web) | [20k★](https://github.com/actix/actix-web) |
| **Axum** | Tokio 生态 Web 框架，Type-safe 路由 | [docs.rs/axum](https://docs.rs/axum) | [16k★](https://github.com/tokio-rs/axum) |
| **Rocket** | 易用性高，类型安全，开发者友好 | [www.rocket.rs](https://www.rocket.rs/) | [13k★](https://github.com/SergioBenitez/Rocket) |
| **Warp** | 函数式 Web 框架，组合过滤器 | [docs.rs/warp](https://docs.rs/warp) | [6k★](https://github.com/seanmonstar/warp) |

## 🗄️ 数据库与 ORM

| 库名 | 简介 | Crate 地址 | GitHub |
|------|------|----------|--------|
| **SeaORM** | 异步 ORM，生成器驱动，支持多数据库 | [sea-ql.org/SeaORM](https://www.sea-ql.org/SeaORM/) | [7k★](https://github.com/SeaQL/SeaORM) |
| **SQLx** | 静态查询 SQL，编译时验证语法 | [docs.rs/sqlx](https://docs.rs/sqlx) | [9k★](https://github.com/launchbadge/sqlx) |
| **Diesel** | 传统 ORM，同步操作，类型安全强 | [diesel.rs](https://diesel.rs/) | [8k★](https://github.com/diesel-rs/diesel) |
| **Tide** | 异步微框架，类似 Express.js | [docs.rs/tide](https://docs.rs/tide) | [5k★](https://github.com/http-rs/tide) |

## 🧪 测试工具

| 库名 | 简介 | Crate 地址 | GitHub |
|------|------|----------|--------|
| **Criterion** | 性能基准测试，统计图表生成 | [bheisler.github.io/criterion.rs](https://bheisler.github.io/criterion.rs/book/) | [4k★](https://github.com/bheisler/criterion.rs) |
| **Mockall** | Mock 对象生成器 | [docs.rs/mockall](https://docs.rs/mockall) | [1k★](https://github.com/asomers/mockall) |

## 🔧 实用工具库

| 库名 | 简介 | Crate 地址 | GitHub |
|------|------|----------|--------|
| **Serde** | 序列化/反序列化，JSON/XML/CSV支持 | [serde.rs](https://serde.rs/) | [7k★](https://github.com/serde-rs/serde) |
| **Tokio** | 异步运行时，主流选择，多线程 | [tokio.rs](https://tokio.rs/) | [22k★](https://github.com/tokio-rs/tokio) |
| **Async-std** | 异步标准库实现，类似 JavaScript Promise | [async.rs](https://async.rs/) | [12k★](https://github.com/async-rs/async-std) |
| **Clap** | CLI 参数解析，自动生成帮助文档 | [docs.rs/clap](https://docs.rs/clap) | [18k★](https://github.com/clap-rs/clap) |
| **Anyhow** | 错误处理，返回堆栈追踪 | [docs.rs/anyhow](https://docs.rs/anyhow) | [2k★](https://github.com/dtolnay/anyhow) |
| **Thiserror** | 自定义错误类型，宏定义 | [docs.rs/thiserror](https://docs.rs/thiserror) | [2k★](https://github.com/dtolnay/thiserror) |
| **Tracing** | 结构化日志和调用追踪 | [tracing.rs](https://tracing.rs/) | [3k★](https://github.com/tokio-rs/tracing) |
| **Reqwest** | HTTP 客户端，支持 async/await | [docs.rs/reqwest](https://docs.rs/reqwest) | [4k★](https://github.com/seanmonstar/reqwest) |

## 🏗️ 构建与工具

| 库名 | 简介 | 官方链接 |
|------|------|----------|
| **Cargo** | 包管理器和构建工具（内置） | [doc.rust-lang.org/cargo](https://doc.rust-lang.org/cargo/) |
| **Rustfmt** | 代码格式化（内置） | [doc.rust-lang.org/rustfmt](https://doc.rust-lang.org/rustfmt/) |
| **Clippy** | 静态分析工具（内置） | [doc.rust-lang.org/clippy](https://doc.rust-lang.org/clippy/) |

## 🎮 特定领域

| 库名 | 简介 | Crate 地址 |
|------|------|----------|
| **Bevy** | 现代游戏引擎，ECS 架构 | [bevyengine.org](https://bevyengine.org/) |
| **Arrow/Parquet** | 大数据处理，列式存储 | [arrow.apache.org/docs/rust](https://arrow.apache.org/docs/rust/) |
| **Burn/Dfdx** | 深度学习框架 | [burn.gg](https://burn.rs/) |
| **Solana** | 区块链开发 | [docs.solana.com/developing/programming-model](https://docs.solana.com/developing/programming-model) |

---

*注：部分经典库已过时，请参考现代替代方案*
