# Rust Edition 2021

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [The Rust Edition Guide 2021](https://doc.rust-lang.org/edition-guide/rust-2021/index.html)  
> Rust Edition 2021 是 Rust 现代化演进的重要版本。它改善了闭包的不相交捕获机制，并重构了数组迭代器等行为。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `rust:1.75-alpine` 中执行控制台诊断指令 `rustc --version`：

<DockerOutput
  image="rust:1.75-alpine"
  sourceFile="demos/rust/rust175_env.out"
/>

---

## 1. 🔒 Disjoint Capture in Closures (闭包不相交属性捕获)
闭包现在只精准捕获它内部用到的结构体具体字段，而不是强制借用整个结构体实例。

```rust
// 关联源码: demos/rust/ownership_demo.rs
struct User { name: String, age: u32 }

let u = User { name: "Alice".into(), age: 30 };
let get_age = || u.age; // 仅借用 u.age，u.name 仍可被独立使用！
```

<DockerOutput
  image="rust:1.75-alpine"
  sourceFile="demos/rust/ownership_demo.rs"
/>

## 版本信息与迁移

- **发布时间 / 标准时间：** 2021 年 10 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** Rust 工具链、Edition、MSRV 与 Cargo 依赖解析结果

**迁移影响：** Edition 迁移先用 `cargo fix --edition` 生成可审查改动，再更新 `Cargo.toml` 并运行测试、Clippy 和文档测试；Edition 不等同于编译器版本。

## 版本确认

```bash
rustc --version --verbose
cargo --version
```

资料核对日期：2026-08-27。
