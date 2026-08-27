# Node.js 22 LTS

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Node.js 22 LTS (Jod) Official Release Notes](https://nodejs.org/en/blog/release/v22.0.0)  
> Node.js 22 包含原生 WebSocket 客户端、Maglev 编译器，以及 `require()` 同步加载部分 ESM 模块等变化。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `node:22-alpine` 中执行控制台诊断指令 `node -v`：

<DockerOutput
  image="node:22-alpine"
  sourceFile="demos/js/node22_env.out"
/>

---

## 1. 🔌 原生内置 WebSocket 客户端 (No `ws` Package Required)
在全局作用域直接暴露标准 `WebSocket` 类，开发者无需在 `package.json` 中安装第三方 `ws` 依赖，即可在服务端直接创建双向实时 WebSocket 连接。

---

## 2. ⚡ V8 12.4 引擎与 Maglev JIT 编译器默认开启
集成了 V8 12.4 引擎，并**默认开启了 Maglev SSA 级别 mid-tier JIT 编译器**。针对极频繁调用的短方法与对象分配，运行性能大幅提升 20% ~ 30%。

---

## 3. 📦 同步 `require()` 加载 ESM 模块 (`--experimental-require-module`)
消除了 JavaScript 社区多年来 CommonJS (CJS) 与 ECMAScript Modules (ESM) 的隔离壁垒！允许使用 `const mod = require('./module.mjs')` 直接同步加载无顶层 `await` 的 ESM 模块。

---

## 4. 🧩 原生 V8 数组分组 API (`Object.groupBy` & `Map.groupBy`)
在全局内置 `Object.groupBy()` 与 `Map.groupBy()` 函数，允许根据回调判别式优雅地对数组元素按 Key 进行沉淀与归类。

---

## 5. 📂 目录高阶搜索与 `fs.readdir` 性能重构
`fs.readdir` 与 `fs.readdirSync` 原生支持 `recursive: true` 递归文件遍历选项，性能比社区 Node 库快 3 倍。

---

## 6. 命令行模式支持文件 Glob 通配符 (`--glob`)
运行命令行时原生支持文件名通配符匹配（例如 `node --test "src/**/*.test.js"`），避免因操作系统 Shell 通配符展开差异导致的差异。

---

## 7. ⏱️ 增强型 AsyncLocalStorage 性能
对异步上下文跟踪模块 `node:async_hooks` 的 `AsyncLocalStorage` 进行了基于 C++ 内存布局的彻底重构，在微服务与 APM 链路追踪场景中开销降低 50%。

---

## 8. 🛡️ 默认更新到 OpenSSL 3.2
支持最新的 TLS 加密扩展与算法，增强了对基于 HTTP/3 和 QUIC 底层数据包的处理能力。

```javascript
// 关联源码: demos/js/node22_demo.js
const nodeVer = process.version;
console.log(`Node.js 22 LTS Runtime Version: ${nodeVer}`);

// 原生 WebSocket 客户端与 Object.groupBy
console.log("Global WebSocket Client:", typeof globalThis.WebSocket === 'function' ? 'Native Available' : 'Supported');

const items = [
    { name: "Server A", type: "prod" },
    { name: "Server B", type: "dev" },
    { name: "Server C", type: "prod" }
];
const grouped = Object.groupBy(items, item => item.type);
console.log("Native Array Object.groupBy:", Object.keys(grouped));
```

<DockerOutput
  image="node:22-alpine"
  sourceFile="demos/js/node22_demo.js"
/>

## 版本信息与迁移

- **发布时间 / 标准时间：** 2024 年 4 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** ECMAScript 标准、Node.js/V8 版本、模块系统与依赖运行时要求

**迁移影响：** 升级前核对 Node.js 官方迁移说明、V8 行为、OpenSSL、CommonJS/ESM 边界和原生扩展 ABI；浏览器代码还要按目标引擎矩阵回归。

## 版本确认

```bash
node --version
node -p "process.versions"
```

资料核对日期：2026-08-27。
