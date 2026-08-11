# JavaScript / TypeScript 概念与现代演进

<script setup>
import { jsVersions } from '../.vitepress/theme/data/versionData';
import { jsLiveCode, jsLiveMarkup } from '../.vitepress/theme/data/liveExamples';

</script>

JavaScript 是全栈 Web 的核心语言，结合 TypeScript 5.x 带来工业级静态类型分析。完整内容已经按语言能力重组，不再为 ES2016 之后的每个年份建立低信息量页面。

---

## 🔀 三阶段演进

<VersionDiff
  title="🟨 JavaScript / TypeScript 语法演进"
  :items="jsVersions"
/>

1. [ES6 之前：ES1～ES5 经典时代](./javascript/pre-es6.md)
2. [ES6：现代 JavaScript 奠基](./javascript/es6.md)
3. [现代 JavaScript：按能力持续演进](./javascript/modern-javascript.md)

[进入 JavaScript 语言全典 →](./javascript/index.md)

---

## ⚡ 高亮源码 / Live 效果

在下方切换高亮源码和 Live 效果，直接修改 JavaScript、操作 DOM 并查看 Console：

<WebLivePlayground
  mode="javascript"
  title="JavaScript Live"
  :initial-code="jsLiveCode"
  :preview-html="jsLiveMarkup"
/>
