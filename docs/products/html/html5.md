# HTML5：语义、媒体与 Web 应用基础

HTML5 在 2014 年成为 W3C Recommendation，但它代表的不只是一个发布日期：它统一了浏览器长期实践，定义错误恢复算法，并把 Web 文档扩展为应用平台。

## 1. 更简洁、可预测的文档骨架

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HTML5 Document</title>
  </head>
  <body>...</body>
</html>
```

短 DOCTYPE 触发标准模式；UTF-8 声明应尽早出现；viewport 元数据让移动浏览器按设备宽度布局。

## 2. 语义地标与内容分区

`header`、`nav`、`main`、`article`、`section`、`aside`、`footer` 描述页面区域角色，`figure` / `figcaption` 关联媒体与说明，`time` 提供机器可读时间。

```html
<main>
  <article>
    <header>
      <h1>HTML5 Milestone</h1>
      <time datetime="2014-10-28">2014 年 10 月 28 日</time>
    </header>
    <figure>
      <img src="timeline.png" alt="HTML 演进时间线">
      <figcaption>从 HTML 4 到 HTML5</figcaption>
    </figure>
  </article>
</main>
```

语义元素不是视觉皮肤；它们为浏览器、搜索引擎和辅助技术提供可导航的结构。

## 3. 原生音视频与图形

```html
<video controls width="640" poster="cover.jpg">
  <source src="lesson.webm" type="video/webm">
  <source src="lesson.mp4" type="video/mp4">
  <track kind="captions" src="zh.vtt" srclang="zh" label="中文字幕">
  浏览器不支持原生视频。
</video>
```

- `audio` / `video` 取代插件式媒体播放，并提供 `track` 字幕。
- `canvas` 是即时像素绘图表面，需要 JavaScript，并应提供可访问替代内容。
- SVG 是保留结构的矢量文档，更适合图标、图表和可交互图形。

## 4. 表单能力升级

新增 `email`、`url`、`date`、`number`、`range` 等输入类型，以及 `required`、`pattern`、`min`、`max`、`placeholder`、`autocomplete` 等约束。

```html
<form>
  <label for="email">邮箱</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <label for="level">熟练度</label>
  <input id="level" name="level" type="range" min="0" max="10" value="5">
  <button>提交</button>
</form>
```

客户端约束提升体验，但不能替代服务端校验。`placeholder` 也不能替代持久可见的 `label`。

## 5. HTML 与 Web API 的边界

HTML5 时代常把 History、Storage、Geolocation、Web Workers 等统称为“HTML5 API”。严格来说，它们大多由独立规范定义，通过 JavaScript 使用。HTML 负责声明结构；CSS 负责表现；JavaScript 与 Web API 负责行为和系统能力。

## 6. 渐进增强清单

- 先让内容和表单在无 JavaScript 时仍可理解、可提交。
- 使用原生元素获得键盘行为，再用 CSS/JS 增强。
- 为媒体提供字幕、文字替代和合理的加载策略。
- 用规范校验发现结构错误，再进行真实辅助技术与浏览器测试。

下一阶段：[现代 HTML Living Standard](./modern-html.md)。
