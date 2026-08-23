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
    <p style="margin: 0; font-size: 0.875rem; color: var(--vp-c-text-2);">包括 C++、JavaScript、PHP、C#、Ruby、Kotlin、HTML、CSS</p>
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

1. **先看统一语法** (`/concepts/unified-syntax`) —— 理解跨语言的共性模式
2. **再选目标语言** (`/products/{lang}/`) —— 掌握具体特性与最佳实践
3. **最后看矩阵** (`/matrix/`) —— 建立全局选型依据

适合目标读者：**希望系统学习多门语言、深入理解编程范式的开发者**
