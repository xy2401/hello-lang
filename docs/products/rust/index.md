# Rust 总览


Rust 通过 Edition 机制每 3 年梳理一次语言规范，在保障 100% 后向兼容性的前提下升级语法。

---

- 🦀 [**Rust Edition 2018**](/products/rust/version/edition-2018) (Async/Await, NLL 借用生命周期)
- 🦀 [**Rust Edition 2021**](/products/rust/version/edition-2021) (Disjoint Capture 闭包精细捕获)

## 适用边界

适合系统编程与需要所有权约束的代码；Edition 与编译器版本需分别确认，浏览器容器不提供宿主机硬件接口。

## 版本阅读范围

[完整版本目录](./version/)收录本仓库已有专题（如 edition-2018、edition-2021、rust-1.0）。这些是教学与兼容性对照入口；运行环境的具体版本以安装页、工作台或采集证据为准。

## 推荐学习路线

[安装与环境](./install) → [基础语法](./basic) → [数据结构](./data-structures) → [算法](./algorithms) → [完整版本目录](./version/)。先完成最小示例，再阅读版本差异。

## 实验入口与范围

[容器浏览器工作台](/playground/container-rust)提供 RISC-V 容器体验，首次使用可能需要较大的运行时下载，先阅读页面资源说明。 [Docker 验证证据](./docker-tooling)展示已有采集结果与缺口。
