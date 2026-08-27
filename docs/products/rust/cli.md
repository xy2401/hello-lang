# Rust 编译与运行

`rustc` 可以直接把单个 Rust 源文件编译为本机可执行程序，适合学习语言与验证小例子。实际多文件项目通常交给 Cargo，但本页只说明边界，不展开项目工作流。

- [rustc 手册](https://doc.rust-lang.org/rustc/)
- [rustc 命令行](https://doc.rust-lang.org/rustc/command-line-arguments.html)
- [Rust Edition](https://doc.rust-lang.org/edition-guide/)

## 确认工具链

```bash
rustc --version --verbose
cargo --version
```

详细版本会显示 host triple 和 LLVM 信息，有助于判断目标架构。`cargo` 存在不代表本次单文件编译会读取 `Cargo.toml`。

## 编译和运行

`hello.rs`：

```rust
use std::env;

fn main() {
    let name = env::args().nth(1).unwrap_or_else(|| "world".to_string());
    println!("Hello, {name}");
}
```

```bash
rustc --edition 2024 hello.rs -o hello
./hello Alice
```

Windows 将生成 `hello.exe`。`--edition` 控制源码 edition，不等于选择编译器版本，也不会自动引入外部 crate。

## 构建模式与检查

```bash
rustc --edition 2024 -C opt-level=0 -g hello.rs -o hello-debug
rustc --edition 2024 -C opt-level=3 hello.rs -o hello-release
rustc --edition 2024 --crate-type lib library.rs
```

开发构建保留调试信息，优化构建更接近发布产物。需要依赖、测试、多 crate 或可复现构建时应转入 Cargo，而不是手工拼接大量 `--extern`。

## 输入、错误与退出码

程序参数通过 `std::env::args()` 获取，标准输入使用 `std::io::stdin()`。`main` 也可以返回 `Result`，错误会打印到标准错误并产生失败状态：

```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let text = std::fs::read_to_string("input.txt")?;
    println!("{}", text.trim());
    Ok(())
}
```

编译器错误本身返回非零状态。链接器缺失、target 未安装和 ABI 不匹配是不同问题；先阅读 rustc 最后一个 cause，再检查 host/target 与系统链接器。

资料核对日期：2026-08-28。
