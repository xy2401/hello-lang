# Rust 安装与切换

Rust 官方推荐 rustup 管理工具链。`rustc`、Cargo、标准库组件和交叉编译 target 由 rustup 协同安装，不应拆成来源不明的独立脚本。

- [Rust 官方安装](https://www.rust-lang.org/tools/install)
- [rustup 文档](https://rust-lang.github.io/rustup/)
- [rustup 发布仓库](https://github.com/rust-lang/rustup)

## 推荐方式

Windows、macOS 与 Linux 均使用 rustup；Windows 先准备 Visual Studio C++ Build Tools（MSVC 工具链）或明确选择 GNU 工具链。项目用 `rust-toolchain.toml` 固定 channel。

## 安装 rustup

~~~bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup toolchain install stable
~~~

Windows 从官方 rustup-init 下载页运行安装器；不要在管理员终端中把 Cargo 目录装进系统 PATH。

## 组件与目标

~~~bash
rustup component add rustfmt clippy
rustup target add wasm32-unknown-unknown
rustup show
~~~

## 版本切换

~~~bash
rustup toolchain list
rustup default stable
rustup override set 1.85.0
cargo +1.85.0 --version
~~~

## Docker

~~~bash
docker run --rm rust:1.75-alpine rustc --version
~~~

## 安装验证

~~~bash
rustc --version --verbose
cargo --version
rustup show active-toolchain
command -v rustc
~~~

## 升级、卸载与冲突

使用 `rustup update` 升级、例如 `rustup toolchain uninstall 1.85.0` 删除工具链、`rustup self uninstall` 卸载。发行版 `rustc` 与 rustup 同时存在时，检查 `~/.cargo/bin` 在 PATH 中的位置。

## 官方资料

- [Rust 官方安装](https://www.rust-lang.org/tools/install)
- [rustup 文档](https://rust-lang.github.io/rustup/)
- [rustup 发布仓库](https://github.com/rust-lang/rustup)

资料核对日期：2026-08-27。
