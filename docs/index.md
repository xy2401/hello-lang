---
layout: home

hero:
  name: "Hello Lang"
  text: "全主流编程语言概念、基础语法与版本演进大典"
  tagline: "系统化拆解全主流语言核心范式、基础语法骨架、多版本 LTS 演进 Diff 与 Docker 自动化代码验证"
  actions:
    - theme: brand
      text: 🚀 探索语言演进库
      link: /languages/java
    - theme: alt
      text: 📊 横向范式对比大屏
      link: /matrix/
    - theme: alt
      text: ⚡ Pyodide 浏览器在线体验
      link: /languages/python#pyodide-run

features:
  - icon: 🔀
    title: 多版本 LTS 语法演进 Diff
    details: 精确对比 Java (JDK 8~25 LTS)、JS/Node (14~22)、Python (3.8~3.12)、C++ (11~23)、Rust、Go、PHP、C# 等大版本演进。
  - icon: 🐳
    title: Docker 自动化验证与结果捕获
    details: 本地/CI 自动化使用官方真实 Docker 镜像隔离编译运行 Demo，自动捕获真实 stdout 控制台日志与执行耗时。
  - icon: ⚡
    title: 浏览器零延迟 WASM 运行
    details: 集成 Pyodide (Python CPython WASM) 与 Safe JS Worker 运行时，无需后端服务器即可在浏览器中即时编辑与运行代码。
  - icon: 📌
    title: 10 大语言基础语法与矩阵
    details: 按统一的 4 步标准代码骨架与包管理、并发、内存等 6 大横向矩阵维度对所有主流语言进行标准化剖析。
---

<script setup>
import { javaVersions } from './.vitepress/theme/data/versionData';
import { getOutput, getTimeMs } from './.vitepress/theme/data/outputsHelper';

const jsDemoCode = `const languages = ['JavaScript', 'Python', 'Java', 'Rust', 'Go', 'PHP', 'C#', 'Ruby', 'Kotlin'];
const formatted = languages.map(lang => \`🚀 Hello \${lang}!\`);
console.log(formatted.join('\\n'));`;
</script>

## 🌟 语言演进矩阵速览 (Version Evolution Highlights)

<VersionDiff
  title="☕ Java JDK LTS 核心语法演进"
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

直接在浏览器中修改下方 JavaScript 代码并运行：

<CodeRunner
  language="javascript"
  title="JavaScript / ESNext 交互运行"
  :initialCode="jsDemoCode"
/>
