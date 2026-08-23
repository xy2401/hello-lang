---
layout: home

hero:
  name: "🚀 Hello Lang"
  text: "编程语言的终极知识库"
  tagline: "12 门主流语言 · 统一语法骨架 · 版本演进矩阵 · Docker 真实验证"
  image: /logo.svg
  alt: Hello Lang - 编程语言学习平台
  actions:
    - theme: brand
      text: 探索语言体系
      link: /products/
    - theme: alt
      text: 📊 横向对比矩阵
      link: /matrix/
    - theme: alt
      text: ⚡ 在线沙箱
      link: /playground/

features:
  - icon: 🏗️
    title: 统一语义骨架
    details: 超越具体语言，掌握所有编程范式的核心语法模式：变量声明、函数定义、控制流、面向对象、内存模型、并发范式。
  - icon: 🔄
    title: 版本演进追踪
    details: 精确对比多版本 LTS 语法差异：Java 8→25, Python 3.8→3.14, Rust 2018→2024，理解技术演进脉络与设计哲学。
  - icon: 🐳
    title: Docker 真实执行
    details: 每个示例都在官方镜像容器中编译运行，确保输出可复现、行为可信赖、结论可验证。
  - icon: 💻
    title: 浏览器即时体验
    details: HTML/CSS/JS 支持 Live Edit、源码高亮切换、实时预览，所见即所得的交互式学习体验。
---

## 🌟 典型语言快速入口

前 5 个为高频使用场景的代表性语言，其余 7 门可在导航栏「更多」下拉中查看所有完整列表。

| 语言 | 类型 | 核心特色 | 快速开始 |
| :--- | :--- | :--- | --- |
| [Java](/products/java/) ☕ | OOP/MPP | JVM 生态王者、企业级首选、虚拟线程革命 | [查看详情](/products/java/) → |
| [TypeScript](/products/typescript/) 🎨 | OOP/Turing | JavaScript 超集、静态类型、前端开发标配 | [查看详情](/products/typescript/) → |
| [Python](/products/python/) 🐍 | Scripting/Data | AI/ML 首选、简洁优雅、全栈万能钥匙 | [查看详情](/products/python/) → |
| [Rust](/products/rust/) 🦀 | Systems | 内存安全无 GC、零开销抽象、系统级编程新标准 | [查看详情](/products/rust/) → |
| [Go](/products/go/) 🐹 | Cloud-Native | Goroutine 并发、简单高效、云原生基础设施语言 | [查看详情](/products/go/) → |

<div class="grid-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 24px;">

<a href="/products/" style="text-decoration: none;">
  <div style="background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); padding: 20px; border-radius: 12px; height: 100%; transition: all 0.3s ease;">
    <h3 style="margin: 0 0 8px 0; color: var(--vp-c-brand-1);">📚 查看所有 12 门语言</h3>
    <p style="margin: 0; font-size: 0.875rem; color: var(--vp-c-text-2);">包括 C & C++、JavaScript、PHP、C#、Ruby、Kotlin、HTML、CSS</p>
  </div>
</a>

<a href="/matrix/" style="text-decoration: none;">
  <div style="background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); padding: 20px; border-radius: 12px; height: 100%; transition: all 0.3s ease;">
    <h3 style="margin: 0 0 8px 0; color: var(--vp-c-brand-1);">⚖️ 横向能力对比矩阵</h3>
    <p style="margin: 0; font-size: 0.875rem; color: var(--vp-c-text-2);">基础语法、面向对象、并发模型、内存管理、包管理、类型系统六大维度深度对比</p>
  </div>
</a>

<a href="/playground/" style="text-decoration: none;">
  <div style="background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); padding: 20px; border-radius: 12px; height: 100%; transition: all 0.3s ease;">
    <h3 style="margin: 0 0 8px 0; color: var(--vp-c-brand-1);">⚡ 浏览器交互沙箱</h3>
    <p style="margin: 0; font-size: 0.875rem; color: var(--vp-c-text-2);">JavaScript、Python、PHP、Ruby 在线编辑器实时试写代码并查看效果</p>
  </div>
</a>

</div>

<script setup>
import { javaVersions } from './.vitepress/theme/data/versionData';
import { getOutput, getTimeMs } from './.vitepress/theme/data/outputsHelper';
import { homeJsLiveCode, homeJsLiveMarkup } from './.vitepress/theme/data/liveExamples';
</script>

## 🧪 Docker 容器化真实验证

以下控制台日志由后台 `npm run collect-outputs` 在官方 **eclipse-temurin:21-jdk-alpine** 容器中编译执行并实时捕捉，确保输出可复现。

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/jdk21/JEP444_VirtualThreads.java"
/>

---

## 💡 学习方法建议

1. **先看统一语法** (`/#core-concepts`) —— 理解跨语言的共性模式
2. **再选目标语言** (`/products/{lang}/`) —— 掌握具体特性与最佳实践
3. **最后看矩阵** (`/matrix/`) —— 建立全局选型依据

适合目标读者：**希望系统学习多门语言、深入理解编程范式的开发者**

---

## 🧠 核心概念速览 {#core-concepts}

掌握编程语言的**统一语义骨架**，再深入具体语言细节。

| 概念维度 | 核心要点 | 深入学习 |
|---------|---------|---------|
| **变量声明** | `var`/`let`/`const` vs `$var` vs `int x` | [见 unified-syntax](/matrix/basic-syntax-concept) |
| **函数定义** | `function f()` vs `=>` vs `def` | [见 unified-syntax](/matrix/basic-syntax-concept) |
| **控制流** | `if/else`、`for/while`、`switch` 通用模式 | [见 unified-syntax](/matrix/basic-syntax-concept) |
| **面向对象** | 类/继承/多态实现差异 | [见 object-model](/matrix/object-model) |
| **内存管理** | 手动/引用计数/GC 回收/所有权 | [见 memory](/matrix/memory) |
| **并发范式** | 线程/Goroutine/Event Loop/async-await | [见 concurrency](/matrix/concurrency) |

### 延伸概念

**内存管理模型**

| 类别 | 代表语言 | 特点 |
|------|---------|------|
| 手动管理 | C, C++ | 最大灵活度，最高风险 |
| 引用计数 | Python, Swift | 自动回收，但有循环引用问题 |
| GC 回收 | Java, Go, JS | 自动 GC，有停顿问题 |
| 所有权系统 | Rust | 零开销抽象，无 GC |

**并发模型对比**

| 模型 | 代表 | 特点 |
|------|------|------|
| 线程池 | Java, C++ | 传统方式，资源消耗大 |
| 虚拟线程 | Java (Project Loom) | 轻量级，高密度 |
| Goroutine | Go | 极轻量的协程 |
| Event Loop | Node.js | 单线程异步 |
| async/await | Rust, TS | 结构化并发 |

适合目标读者：**希望横向学习多门语言、深入理解编程范式的开发者**
# Hello Lang - 基础概念

> 掌握编程语言的**统一语义骨架**，再深入具体语言细节。

## 📖 阅读指南

本栏目讲解所有编程语言的共性理论，与具体实现无关。建议按以下顺序学习：

---

## 核心内容

### 1. [统一语法骨架](/matrix/basic-syntax-concept)

对比 **Java, JavaScript, TypeScript, Python, C++, Rust, Go, PHP, C#, Ruby, Kotlin** 十门主流语言的核心语法：

- 变量声明与常量
- 基本数据类型
- 函数定义
- 控制流（if/else、循环）
- 面向对象模型
- HTML/CSS 声明式模型

---

## 🧠 延伸概念

### 内存管理

不同语言的内存模型差异显著：

| 类别 | 代表语言 | 特点 |
|------|---------|------|
| 手动管理 | C, C++ | 最大灵活度，最高风险 |
| 引用计数 | Python, Swift | 自动回收，但有循环引用问题 |
| GC 回收 | Java, Go, JS | 自动 GC，有停顿问题 |
| 所有权系统 | Rust | 零开销抽象，无 GC |

详见：`docs/products/*/concepts.md` 各语言的具体章节

---

### 并发模型

主流并发范式的对比：

| 模型 | 代表 | 特点 |
|------|------|------|
| 线程池 | Java, C++ | 传统方式，资源消耗大 |
| 虚拟线程 | Java (Project Loom) | 轻量级，高密度 |
| Goroutine | Go | 极轻量的协程 |
| Event Loop | Node.js | 单线程异步 |
| async/await | Rust, TS | 结构化并发 |

---

## 🔗 相关资源

- **产品分卷**: [`/products`](/products/java/) - 12 门语言的详细文档
- **横向对比**: [`/matrix`](/matrix/basic-syntax) - 6 大技术维度深度对比
- **实验验证**: [`demos`](https://github.com/xy2401/hello-lang/tree/main/demos) - Docker 自动化运行验证

---

## 💡 学习方法

1. **先看统一语法**（[统一语法骨架](/matrix/basic-syntax-concept)）——理解共性模式
2. **再看具体语言** (`/products/{lang}/`) —— 了解特性差异
3. **最后看矩阵对比** (`/matrix/`) —— 掌握选型依据

---

## ⏱️ 预计学习时间

| 内容 | 难度 | 时间 |
|------|------|------|
| 统一语法骨架 | ★★☆☆☆ | 30 分钟 |
| 内存模型 | ★★★☆☆ | 45 分钟 |
| 并发模型 | ★★★★☆ | 60 分钟 |

适合目标读者：**希望横向学习多门语言的开发者**
