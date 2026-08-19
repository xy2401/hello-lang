# Node.js 20 LTS

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Node.js 20 LTS (Iron) Official Release Notes](https://nodejs.org/en/blog/release/v20.0.0)  
> Node.js 20 包含实验性权限模型、稳定版 `node:test` 和单可执行文件应用（SEA）等变化。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `node:20-alpine` 中执行 Node.js 运行时诊断（`node -v` & `V8 Engine`）：

<DockerOutput
  image="node:20-alpine"
  sourceFile="demos/js/node20_env.js"
/>

---

## 1. 🛡️ 权限模型 (Permission Model)
引入全新的细粒度运行时安全控制机制（`--experimental-permission`），允许开发者在启动 Node 进程时限制其文件访问、网络请求与子进程派生权限：
- `--allow-fs-read="/tmp/*"`
- `--allow-fs-write="/var/log/*"`
- `--allow-child-process`

---

## 2. 🧪 原生内置测试运行器正式稳定 (`node:test`)
`node:test` 原生测试框架迎来重大升级，支持 Mock 机制（`it.mock`）、测试套件并行执行、代码覆盖率统计（`--experimental-test-coverage`）以及 TAP 标准日志输出。

---

## 3. 🚀 单文件可执行应用打包 (Single Executable Applications - SEA)
原生支持将 JavaScript 代码连同二进制 Node 运行时打包绑定为**单个独立的二进制可执行文件**（如 `.exe` 或 Unix 可执行程序），无需目标系统预先安装 Node.js！

---

## 4. ⚡ Ada 2.0 WHATWG URL 解析器
WHATWG URL 解析改用 C++ 实现的 Ada 2.0，影响 `new URL()` 等 API 的解析路径。

---

## 5. 🧠 V8 11.3 引擎与 ES2023 规范
升级至 V8 11.3 引擎，支持正则表达式 `/v` 标志（Set notation + properties of strings）以及 ES2023 不可变数组变更方法（`toSorted`, `toReversed`, `with`）。

---

## 6. 🔀 自定义 ESM 模块加载器钩子 (ESM Loader Hooks)
ESM Loader 钩子移出主线程，在独立 Worker 线程中并行解析模块导入，大幅提升大中型前端与服务端 ESM 项目的加载性能。

---

## 7. ⏱️ `performance.timerify` 高精度函数性能分析
扩展 Performance API，通过 `timerify()` 轻松自动追踪并测量任意异步函数的 CPU 耗时与微秒级延迟。

---

## 8. 🌐 Web Crypto API 完全兼容
在全局完全实现了 W3C Web Crypto 规范（`crypto.subtle`），使前后端代码在密码学签名、哈希与密钥派生上无缝复用。

```javascript
// 关联源码: demos/js/node20_demo.js
const nodeVer = process.version;
console.log(`Node.js 20 LTS Runtime Version: ${nodeVer}`);

// Ada 2.0 高性能 URL 解析器
const myUrl = new URL("https://user:pass@example.com:8080/p/a/t/h?query=string#hash");
console.log("Ada 2.0 Fast URL Hostname:", myUrl.hostname, "Port:", myUrl.port);
```

<DockerOutput
  image="node:20-alpine"
  sourceFile="demos/js/node20_demo.js"
/>
