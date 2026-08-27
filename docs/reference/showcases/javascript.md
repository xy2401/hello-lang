# JavaScript 与 TypeScript 概览

<script setup>
import { jsVersions } from '../../.vitepress/theme/data/versionData';
import { jsLiveCode, jsLiveMarkup } from '../../.vitepress/theme/data/liveExamples';

</script>

JavaScript 用于浏览器和服务端开发，TypeScript 5.x 在此基础上提供静态类型检查。内容按语言能力组织，不再为 ES2016 之后的每个年份单独建立页面。

---

## 🔀 三阶段演进

<VersionDiff
  title="JavaScript / TypeScript 语法演进"
  :items="jsVersions"
/>

1. [ES6 之前：ES1～ES5 经典时代](/products/javascript/version/pre-es6)
2. [ES6：现代 JavaScript 奠基](/products/javascript/version/es6)
3. [现代 JavaScript：按能力持续演进](/products/javascript/version/modern-javascript)

[进入 JavaScript 模块 →](/products/javascript/index.md)

---

## ⚡ 高亮源码 / Live 效果

在下方切换高亮源码和 Live 效果，直接修改 JavaScript、操作 DOM 并查看 Console：

<WebLivePlayground
  mode="javascript"
  title="JavaScript Live"
  :initial-code="jsLiveCode"
  :preview-html="jsLiveMarkup"
/>
