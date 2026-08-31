# Rust 常用外部依赖库（Crate）

## 📦 Web 框架
- **Actix-web** - 高性能异步 Web 框架
- **Axum** - Tokio 生态 Web 框架（Tokio 官方推荐）
- **Rocket** - 易用性高、类型安全
- **Warp** - 函数式 Web 框架

## 🗄️ 数据库与 ORM
- **SeaORM** - 异步 ORM（生成器驱动）
- **SQLx** - 静态查询 SQL（编译时验证）
- **Diesel** - 传统 ORM（同步）
- **Tide** - 异步微框架

## 🧪 测试工具
- **Criterion** - 性能基准测试
- **Mockall** - Mock 对象生成
- **Wiremock** - HTTP Mock 服务器

## 🔧 实用工具库
- **Serde** - 序列化/反序列化（必备）
- **Tokio** - 异步运行时（主流）
- **Async-std** - 异步标准库
- **Clap** - CLI 参数解析
- **Anyhow** - 错误处理
- **Thiserror** - 自定义错误类型
- **Tracing** - 结构化日志/追踪
- **Reqwest** - HTTP 客户端

## 🏗️ 构建与工具
- **Cargo** - 包管理器和构建工具（内置）
- **Rustfmt** - 代码格式化（内置）
- **Clippy** - 静态分析工具（内置）

## 🎮 特定领域
- **Bevy** - 现代游戏引擎
- **Arrow/Parquet** - 大数据处理
- **Burn/Dfdx** - 深度学习框架
- **Solana** - 区块链开发

---

*注：部分经典库已过时，请参考现代替代方案*
