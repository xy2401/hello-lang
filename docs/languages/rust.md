# Rust 概念与 Editions 版本演进

<script setup>
import { rustVersions } from '../.vitepress/theme/data/versionData';
import { getOutput, getTimeMs } from '../.vitepress/theme/data/outputsHelper';
</script>

Rust 是一门无 GC 垃圾回收、保证 100% 内存安全与并发无数据竞争（Data-Race Free）的现代系统级编程语言。

---

## 🔀 Rust Editions 版本对比

<VersionDiff
  title="🦀 Rust Editions (2018 -> 2021 -> 2024)"
  :items="rustVersions"
/>

---

## 🐳 Docker 真实运行验证 (Rust 1.75)

<DockerOutput
  image="rust:1.75-slim"
  :output="getOutput('rust-ownership')"
  :timeMs="getTimeMs('rust-ownership')"
  :exitCode="0"
/>

---

## 🧠 核心概念剖析：所有权模型 (Ownership & Borrowing)

Rust 的核心基石是编译期静态检查的**所有权模型**：
1. 每个值在任何时刻有且仅有一个所有者 (Owner)。
2. 当所有者离开作用域，值将被自动 Drop 释放（无 GC 延迟）。
3. 支持不可变借用 `&T`（可同时存在多个）和可变借用 `&mut T`（同一时刻排他独占）。
