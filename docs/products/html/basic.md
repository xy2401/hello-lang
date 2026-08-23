<script setup>
import { htmlLiveCode } from '../../.vitepress/theme/data/liveExamples';
</script>

# HTML 基础语法

> HTML 的重点不是“让页面显示出来”，而是用正确元素表达内容含义。良好的语义结构同时改善可访问性、SEO、默认交互和长期维护性。

## 1. 文档骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello HTML</title>
  </head>
  <body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </body>
</html>
```

- `doctype` 让浏览器使用标准模式。
- `lang` 为屏幕阅读器和翻译工具提供语言信息。
- `head` 保存元数据，`body` 保存参与页面渲染的内容。

## 2. 内容层次与地标

```html
<header>
  <nav aria-label="主导航">...</nav>
</header>
<main id="main-content">
  <section aria-labelledby="feature-title">
    <h2 id="feature-title">语义化页面骨架</h2>
    <article>...</article>
  </section>
</main>
```

`header`、`nav`、`main`、`section`、`article` 和 `footer` 描述区域角色；`h1`～`h6` 建立标题层级。应优先使用原生语义，只有原生元素无法表达时才补充 ARIA。

## 3. 链接、按钮与表单

| 需求 | 正确元素 | 原因 |
| :--- | :--- | :--- |
| 导航到其他地址 | `<a href="...">` | 具备链接语义和浏览器导航行为 |
| 触发当前页面动作 | `<button>` | 支持键盘、禁用状态和表单行为 |
| 输入有名称的数据 | `<label>` + `<input>` | 建立可点击、可朗读的控件名称 |

## 4. 在浏览器中直接运行

直接修改下面的 HTML，切换到“效果”即可查看浏览器渲染结果。

<WebLivePlayground
  mode="html"
  title="HTML 结构与语义"
  :initial-code="htmlLiveCode"
/>

完整示例源码：`demos/html/basic_demo.html`
