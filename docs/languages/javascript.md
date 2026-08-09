# JavaScript / TypeScript 概念与 ESNext 演进

<script setup>
import { jsVersions } from '../.vitepress/theme/data/versionData';

const jsConsoleDemo = `const items = [10, 20, 30, 40, 50];
const sum = items.reduce((acc, curr) => acc + curr, 0);
console.log('Array Sum:', sum);
console.log('Average:', sum / items.length);`;
</script>

JavaScript 是全栈 Web 的核心脚本语言，结合 TypeScript 5.x 带来工业级强类型系统。

---

## 🔀 ES6 到 ESNext 演进

<VersionDiff
  title="🟨 JavaScript / TypeScript 语法演进"
  :items="jsVersions"
/>

---

## ⚡ 浏览器即时运行控制台

在下方可交互编辑器中直接修改并调试 JavaScript / TypeScript 代码：

<CodeRunner
  language="javascript"
  title="JS 运行控制台"
  :initialCode="jsConsoleDemo"
/>
