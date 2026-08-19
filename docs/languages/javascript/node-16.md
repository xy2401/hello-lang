# Node.js 16 LTS

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Node.js 16 LTS (Gallium) Official Release Notes](https://nodejs.org/en/blog/release/v16.0.0)  
> Node.js 16 是开启 Apple Silicon 架构原生支持与 V8 9.0 引擎的经典 LTS 长期支持版本。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `node:16-alpine` 中执行控制台诊断指令 `node -v`：

<DockerOutput
  image="node:16-alpine"
  sourceFile="demos/js/node16_env.out"
/>

---

## 1. 🍎 Apple Silicon (macOS/AArch64) 原生芯片支持
首次提供针对 Apple M 系列芯片（M1/M2/M3）的二进制构建，性能与功耗控制大幅超越 Rosetta 2 转译。

---

## 2. ⚡ V8 9.0 引擎升级与正则表达式 `d` 标志
引入正则表达式 Match Indices (`/d` 标志），允许在匹配结果对象上直接获取每个捕获组的起始与结束字符索引位置 (`.indices`)。

---

## 3. 📦 Corepack 实验性集成
首次引入 Corepack 工具包，原生接管包管理器 `pnpm` 与 `yarn` 的构建透明适配。

---

## 4. ⏱️ `timers/promises` API 进阶
在 `node:timers/promises` 中提供原生的基于 Promise 链式的 `setTimeout` / `setInterval` 延时控制：
```javascript
import { setTimeout } from 'node:timers/promises';
await setTimeout(1000);
```

```javascript
// 关联源码: demos/js/node16_demo.js
console.log(`Node.js 16 LTS Version: ${process.version}`);
console.log("V8 9.0 Engine with RegExp Match Indices (.indices / d flag)");
```

<DockerOutput
  image="node:16-alpine"
  sourceFile="demos/js/node16_demo.js"
/>
