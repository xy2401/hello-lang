# Node.js 18 LTS

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Node.js 18 LTS (Hydrogen) Official Release Notes](https://nodejs.org/en/blog/release/v18.0.0)  
> Node.js 18 加入了全局 `fetch`、Web Streams、内置测试模块等 Web 平台 API。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `node:18-alpine` 中执行控制台诊断指令 `node -v`：

<DockerOutput
  image="node:18-alpine"
  sourceFile="demos/js/node18_env.out"
/>

---

## 1. 🌐 全局 `fetch` API 标准化支持 (Undici 引擎)
彻底摆脱依赖第三方 `node-fetch` 或 `axios` 库的时代，内置底层高性能 HTTP/1.1 与 HTTP/2 客户端（基于 Undici），在全局作用域暴露 `fetch`, `Request`, `Response`, `Headers` 类。

---

## 2. 🌊 Web Streams API 标准化集成
原生在全局作用域支持 WHATWG Web Streams 标准（`ReadableStream`, `WritableStream`, `TransformStream`），使得浏览器与服务端可共用同一套流式数据管道。

---

## 3. 🧪 原生内置测试运行器 (`node:test`)
引入内置测试模块 `node:test`，可通过 `import test from 'node:test'` 编写异步单元测试。

---

## 4. ⚡ V8 10.2 引擎升级与最新 JavaScript 特性
集成 V8 10.2 引擎，原生支持 `Array.prototype.findLast` / `findLastIndex`、`String.prototype.isWellFormed`，以及显著优化的垃圾回收器与 JIT 编译算法。

---

## 5. 📦 Corepack 默认内置
内置 Corepack 包管理器管理工具，原生接管 `pnpm` 与 `yarn` 的版本自动路由与绑定，避免开发团队内部由于 pnpm/yarn 版本不一致导致的构建锁定问题。

---

## 6. 👁️ 原生 `--watch` 开发文件监听模式
无需 `nodemon` 或 `pm2` 等外部工具，只需执行 `node --watch app.js` 即可实现源码变更时的秒级进程热重载。

---

## 7. 🔒 OpenSSL 3.0 加密升级
底层密码学引擎从 OpenSSL 1.1.1 全面升级至 **OpenSSL 3.0**，提供更严格的 TLS 1.3 密码套件与 QUIC 基础支持。

---

## 8. 📄 原生 Blob & BroadcastChannel API
在全局提供 W3C Blob 二进制数据载体，以及多 Context 通信 `BroadcastChannel` 接口。

```javascript
// 关联源码: demos/js/node18_demo.js
const nodeVer = process.version;
console.log(`Node.js 18 LTS Runtime Version: ${nodeVer}`);

// 全局 Fetch 与 Web Streams
console.log("Global fetch API:", typeof globalThis.fetch === 'function' ? 'Native Available' : 'Missing');

const stream = new ReadableStream({
    start(controller) {
        controller.enqueue("Stream Chunk 1");
        controller.close();
    }
});

const blob = new Blob(["Hello Node.js 18 Blob"], { type: "text/plain" });
blob.text().then(text => console.log("Blob content:", text));
```

<DockerOutput
  image="node:18-alpine"
  sourceFile="demos/js/node18_demo.js"
/>
