# Rust Edition 2024

> **参考官方文档**：[Rust 官方发布说明](https://doc.rust-lang.org/edition-guide/rust-2024/)  
> 本页依据正式 Release 与现有仓库版本证据，整理 Rust Edition 2024 的关键变化、兼容边界和升级检查。

## 版本定位

- **发布时间：** 2025 年 2 月
- **维护状态：** 截至 2026-08-27 的当前重要版本线
- **产品线：** Rust

## 核心变化

**主要功能与架构演进：**

- 原生异步闭包（Async Closures `async || {}`）进入稳定版
- RPITIT（Return Position `impl Trait` in Trait）与 AFIT（Async fn in Trait）全面成熟
- 临时值生存期（Temporary Lifetime Extension）规则进一步精准收紧，降低隐式悬垂风险

**工程影响与选型建议：**

> 现代异步编程与 Trait 表达力的重要里程碑。

## 兼容与迁移

- 同时更新编译器或运行时、包管理器、构建镜像与 CI，不只修改本机版本。
- 先处理弃用警告，再验证依赖、代码生成器、原生扩展和目标平台。
- 在新旧基线分别运行测试，明确产物的最低运行时与语言版本。

## 版本确认

不要根据安装包名称或容器标签推断实际版本，应在目标环境执行：

```bash
rustc --version && cargo --version
```

生产记录至少应包含完整版本输出、操作系统或运行时基线、架构，以及所用客户端或驱动版本。

## 官方资料

- [Rust 官方发布说明](https://doc.rust-lang.org/edition-guide/rust-2024/)

资料核对日期：2026-08-27。
