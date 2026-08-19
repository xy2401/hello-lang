# Rust Edition 2018

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [The Rust Edition Guide 2018](https://doc.rust-lang.org/edition-guide/rust-2018/index.html)  
> Rust Edition 2018 是 Rust 迈向现代化的关键版本，确立了 **`async/.await` 异步语法**、**NLL (Non-Lexical Lifetimes 非词法作用域生命周期)** 以及模块系统简化。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `rust:1.75-alpine` 中执行控制台诊断指令 `rustc --version`：

<DockerOutput
  image="rust:1.75-alpine"
  sourceFile="demos/rust/rust175_env.out"
/>

---

## 1. ⚡ `async/.await` 语法与异步生态
在语言层面支持原生 `async fn` 与 `.await` 挂起表达式。

```rust
// 关联源码: demos/rust/async_demo.rs
async fn fetch_data() -> Result<String, &'static str> {
    Ok("Fetched 200 OK response".to_string())
}
```

<DockerOutput
  image="rust:1.75-alpine"
  sourceFile="demos/rust/async_demo.rs"
/>
