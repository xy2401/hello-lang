# Rust 版本演进

Rust 每 6 周发布一个稳定小版本，每 3 年发布一个全新的 **Edition（版本纪元）**，在保持向前兼容的同时引入语法演进。

## 版本索引

### [Rust Edition 2024](./rust-edition-2024)

- **发布时间：** 2025 年 2 月
- **版本重点：** 原生异步闭包（Async Closures async || {}）进入稳定版。

### [Rust Edition 2021](./edition-2021)

- **发布时间：** 2021 年 10 月
- **版本重点：** 闭包不相交字段捕获（Disjoint Capture in Closures）：闭包仅捕获所访问的具体结构体字段而非整个结构体。

### [Rust Edition 2018](./edition-2018)

- **发布时间：** 2018 年 12 月
- **版本重点：** 原生引入 async / .await 异步关键字。

### [Rust 1.0](./rust-1.0)

- **发布时间：** 2015 年 5 月
- **版本重点：** Rust 正式确立稳定性承诺（Stability Guarantee）。

## Edition 升级实战
```bash
# 使用 cargo 自动化升级项目版本纪元
cargo fix --edition
cargo clippy
```
