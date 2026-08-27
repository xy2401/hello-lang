<script setup>
import { htmlVersions } from '../../.vitepress/theme/data/versionData';
import { htmlLiveCode } from '../../.vitepress/theme/data/liveExamples';
</script>

# 🟧 HTML 结构与语义


HTML（HyperText Markup Language）不是通用编程语言，而是一门描述 Web 文档**结构、内容角色和语义关系**的声明式标记语言。浏览器解析 HTML 后构建 DOM，CSS 和 JavaScript 再以 DOM 为共同接口完成表现与行为。

<VersionDiff
  title="HTML 标准能力演进"
  :items="htmlVersions"
/>

## Live HTML 实验室

直接修改元素、属性或文本，右侧预览会自动重建。预览运行在隔离 `iframe` 中，不会污染文档站自身样式。

<WebLivePlayground
  mode="html"
  title="HTML 结构与原生元素 Live"
  :initial-code="htmlLiveCode"
/>

## 学习路线

- [HTML 基础结构与语义元素](./basic.md)：文档骨架、内容模型、表单与可访问性。
- [HTML5 之前](./version/pre-html5.md)：从 HTML 2.0、3.2、4.01 到 XHTML，理解历史包袱和结构/表现分离的起点。
- [HTML5](./version/html5.md)：语义地标、音视频、表单增强、Canvas 与更简洁的文档骨架。
- [现代 HTML Living Standard](./version/modern-html.md)：`details`、`dialog`、`template`、Popover、惰性加载等持续演进的平台能力。

## 三阶段看懂 HTML

| 阶段 | 文档模型 | 代表能力 | 今天怎么用 |
| :--- | :--- | :--- | :--- |
| HTML 2～4 / XHTML | 页面、链接、表格、表单；后期强调严格结构 | `a`、`img`、`table`、`form`、DOCTYPE | 识别遗留标记，避免表现型元素与表格布局 |
| HTML5 | Web 应用统一文档模型 | `main`、`article`、`video`、新表单类型、Canvas | 现代页面的语义与媒体基础 |
| Living Standard | 不再等待“大版本”，按能力持续演进 | `dialog`、`details`、`template`、Popover、`inert` | 优先原生语义、渐进增强并检查兼容性 |

## HTML 的特殊定位

| 维度 | HTML |
| :--- | :--- |
| 执行模型 | 浏览器解析文本并构建 DOM，不直接执行算法 |
| 核心抽象 | 元素、属性、内容模型、语义关系 |
| 正确性验证 | 规范校验、可访问性检查、浏览器兼容性测试 |
| 与其他语言协作 | CSS 选择 DOM 并定义表现；JavaScript 读取和修改 DOM |
