---
layout: home

hero:
  name: "Hello Lang"
  text: "全主流编程语言概念、基础语法与版本演进大典"
  tagline: "系统化拆解全主流语言核心范式、基础语法骨架、多版本 LTS 演进 Diff 与 Docker 自动化代码验证"
  actions:
    - theme: brand
      text: 🚀 探索语言演进库
      link: /products/java
    - theme: alt
      text: 📊 横向范式对比大屏
      link: /matrix/
    - theme: alt
      text: ⚡ Pyodide 浏览器在线体验
      link: /products/python#pyodide-run

features:
  - icon: 🔀
    title: 多版本 LTS 语法演进 Diff
    details: 精确对比 Java、JS/Node、Python、C++、Rust、Go 等版本演进，并独立梳理 HTML 语义与 CSS 平台能力。
  - icon: 🐳
    title: Docker 自动化验证与结果捕获
    details: Java、Python、C++、Rust 等运行时语言使用固定版本 Docker 镜像；浏览器原生语言直接 Live 预览。
  - icon: ⚡
    title: 高亮源码 / Live 效果
    details: HTML、CSS、JavaScript 支持语法高亮编辑、源码与效果切换，并在隔离页面中即时运行。
  - icon: 📌
    title: 12 门语言基础语法与矩阵
    details: 对 10 门编程语言和 HTML、CSS 两门声明式 Web 语言进行标准化拆解，并明确不适用的并发、内存等维度。
---

<script setup>
import { javaVersions } from './.vitepress/theme/data/versionData';
import { getOutput, getTimeMs } from './.vitepress/theme/data/outputsHelper';
import { homeJsLiveCode, homeJsLiveMarkup } from './.vitepress/theme/data/liveExamples';
</script>

## 🌟 语言演进矩阵速览 (Version Evolution Highlights)

<VersionDiff
  title="Java JDK LTS 核心语法演进"
  :items="javaVersions"
/>

---

## 🐳 Docker 真实编译执行验证 (Docker Runner Snapshot)

以下控制台日志由后台 `npm run collect-outputs` 在官方 **eclipse-temurin:21-jdk-alpine** 容器中编译执行并实时捕捉：

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/jdk21/JEP444_VirtualThreads.java"
/>

---

## ⚡ 浏览器在线交互体验 (Interactive Sandbox)

在高亮源码与 Live 效果之间切换，直接修改并运行 JavaScript：

<WebLivePlayground
  mode="javascript"
  title="JavaScript / ESNext 交互运行"
  :initial-code="homeJsLiveCode"
  :preview-html="homeJsLiveMarkup"
/>
