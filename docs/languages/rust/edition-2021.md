# Rust Edition 2021

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
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
