# Rust 依赖与包管理

Rust 的事实标准是 Cargo：它同时承担包清单、依赖解析、构建、测试与从 registry 下载 crate。rustup 管理编译器和工具链，不是包管理器；crates.io 是默认 registry。Cargo 缺少同级主流竞争者，主要因为它从 Rust 1.0 起就是官方工具链的一部分，语言元数据、Edition、features 和构建脚本都围绕它形成了统一生态。

## 演进与工具边界

在 Cargo 稳定前，项目需要手工下载源码、编译 `.rlib`，再向 `rustc --extern` 传路径。今天仍可直接调用 `rustc` 编译无依赖单文件，但应用和库项目都应使用 Cargo。

| 能力 | 工具或文件 | 说明 |
| --- | --- | --- |
| Rust 版本 | rustup、`rust-toolchain.toml` | 固定编译器、target 与 component |
| 包与构建 | Cargo、`Cargo.toml` | 声明依赖、features、workspace 和构建目标 |
| 解析锁定 | `Cargo.lock` | 记录解析出的 crate 版本与校验和 |
| 包仓库 | crates.io 或替代 registry | 提供索引和 crate 内容 |
| 本地离线副本 | `cargo vendor` | 将依赖复制到指定目录，需配合 source 配置 |

Cargo 的优点是官方统一、可复现能力强、跨平台体验一致；缺点是 build script 和原生系统库仍可能引入环境差异，features 也可能因依赖图合并产生意外组合。应用、二进制和 workspace 应提交 `Cargo.lock`；可复用库也建议在仓库中保留锁文件以固定自身 CI，但发布到 crates.io 的库消费者不会被该锁文件约束。

## 可复现工作流

```bash
cargo new hello
cd hello
cargo add serde --features derive
cargo add --dev tempfile
cargo remove tempfile --dev

cargo fetch --locked
cargo tree
cargo tree --duplicates
cargo test --locked
```

`cargo add` 和 `cargo remove` 会更新 `Cargo.toml`，正常情况下也更新 `Cargo.lock`。`--locked` 要求锁文件无需变化，否则失败；发布构建还可使用 `--frozen`，它同时禁止网络访问。

受控升级应限定包并审查锁文件：

```bash
cargo update -p serde --precise 1.0.219
cargo tree -i serde
cargo test --locked
```

`cargo update` 不改 `Cargo.toml` 的版本要求，只在允许范围内刷新锁文件。跨越声明范围时，先修改清单，再执行测试。features 不是“可独立关闭的运行时插件”；同一 crate 在依赖图中的 features 通常会合并，因此需要用 `cargo tree -e features` 检查来源。

## 完整性、漏洞与缓存

registry 依赖的校验和写入 `Cargo.lock`，Cargo 下载时会验证。安全公告检查由 RustSec 生态的附加命令提供，而非 Cargo 内建：

```bash
cargo install cargo-audit --locked
cargo audit
cargo metadata --locked --format-version 1
```

构建产物由 `cargo clean` 清理；registry/git 下载缓存位于 Cargo home，不应把删除缓存当成升级方式。需要离线或可审计构建时：

```bash
mkdir .cargo
cargo vendor vendor > .cargo/config.toml
cargo build --frozen
```

提交 vendor 内容前应评估仓库体积。替代 registry 通过 `.cargo/config.toml` 声明；认证信息放在 Cargo credentials 或环境中，不写入仓库。source replacement 与 alternative registry 语义不同，迁移时必须按官方配置选择。

## Workspace 与版本选择

Cargo workspace 可共享 `Cargo.lock`、target 目录和部分依赖版本。它适合一个仓库内多个 crate，但不等于完整 Monorepo 治理方案。新项目优先使用 workspace resolver 3（适用的 Edition/工具链下），并在根清单集中声明共同依赖，成员通过 `workspace = true` 引用。

## 选择建议

- **新应用或 CLI：** Cargo + 已提交的 `Cargo.lock`，CI 使用 `--locked`。
- **公共库：** 在 `Cargo.toml` 给出兼容版本范围，避免无必要的精确等号约束；保留仓库锁文件验证开发环境。
- **原生库依赖：** 优先使用 crate 提供的明确 feature；依赖系统库时记录 `pkg-config`、编译器和系统包基线。
- **离线环境：** `cargo vendor` 配合 `--frozen`，不要仅依赖某台机器的缓存。
- **替代 registry：** 仅在组织政策或内部包需要时使用，明确来源、认证和发布边界。

## 官方资料

- [The Cargo Book](https://doc.rust-lang.org/cargo/)
- [Cargo dependency resolution](https://doc.rust-lang.org/cargo/reference/resolver.html)
- [Cargo.lock and reproducible builds](https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html)
- [Source replacement and vendoring](https://doc.rust-lang.org/cargo/reference/source-replacement.html)
- [crates.io](https://crates.io/)

资料核对日期：2026-08-28。
