<script setup>
import { modernHtmlLiveCode } from '../../.vitepress/theme/data/liveExamples';
</script>

# 现代 HTML 原生能力

> 现代 HTML 不只提供静态标签。很多常见交互已有原生元素，应先评估平台能力，再决定是否引入 JavaScript 组件。

HTML 现在主要以 WHATWG Living Standard 持续演进，不再等待一次性“HTML6”。新能力会在规范、浏览器实现、互操作测试和兼容性数据之间逐步成熟。

## 1. `details` 与 `summary`

```html
<details>
  <summary>查看学习进度</summary>
  <progress max="100" value="72">72%</progress>
</details>
```

浏览器负责展开状态、键盘操作和基础无障碍语义。

## 2. `dialog`

```html
<dialog open aria-labelledby="welcome-title">
  <h2 id="welcome-title">欢迎学习 HTML</h2>
  <form method="dialog">
    <button value="confirm">知道了</button>
  </form>
</dialog>
```

实际应用通常通过 `showModal()` 打开模态对话框，并在关闭时恢复合理的焦点位置。

## 3. `template` 与声明式片段

`template` 中的内容会被解析，但在通过 JavaScript 克隆并插入文档前不会渲染，适合保存可复用的 DOM 片段。

```html
<template id="lesson-card">
  <article class="lesson">
    <h3></h3>
    <p></p>
  </article>
</template>
```

`template.content` 是 `DocumentFragment`，克隆后再填充数据可以减少字符串拼接 HTML，但外部数据仍需按上下文安全处理。

## 4. Popover、`inert` 与轻量交互

```html
<button popovertarget="help">查看帮助</button>
<aside id="help" popover>
  <p>Popover 由浏览器管理顶层显示、关闭行为与焦点交互。</p>
</aside>
```

Popover 适合非模态提示、菜单和轻量浮层；必须阻塞页面操作时用 `dialog.showModal()`。`inert` 可让一个子树暂时不可聚焦、不可交互，常用于自定义遮罩场景。

## 5. 响应式资源与加载性能

```html
<picture>
  <source media="(width >= 60rem)" srcset="hero-wide.webp">
  <img src="hero.webp" alt="课程界面" width="960" height="540" loading="lazy" decoding="async">
</picture>
```

- `picture`、`source` 与 `srcset` 让浏览器按媒体条件、像素密度和格式选择资源。
- 图片的 `width` / `height` 帮助浏览器提前保留比例，减少布局偏移。
- 首屏关键图片不应滥用 `loading="lazy"`；非关键资源才适合延迟加载。

## 6. 现代 HTML 设计原则

1. **语义优先**：先寻找具有所需语义和交互的原生元素。
2. **渐进增强**：基础内容和任务不依赖最新能力，再按支持情况增强。
3. **能力检测**：检测元素/API 能力，不通过 User-Agent 猜测浏览器。
4. **可访问名称**：图像、控件、地标与对话框都需要清楚的名称和焦点流程。
5. **安全边界**：HTML 字符串注入会形成 XSS；用户输入应以文本节点或经过可信消毒的内容插入。

## 7. Live 练习

示例已包含 `details`、`progress` 和 Popover。切换到“效果”后可直接操作这些浏览器原生能力。

<WebLivePlayground
  mode="html"
  title="现代 HTML 原生交互"
  :initial-code="modernHtmlLiveCode"
/>
