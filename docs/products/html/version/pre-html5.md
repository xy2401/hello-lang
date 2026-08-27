# HTML5 之前：从超文本文档到 XHTML

> **参考官方标准**：[W3C HTML 4.01 Specification](https://www.w3.org/TR/html401/)  
> 本页按 HTML 2.0、HTML 3.2、HTML 4.01 与 XHTML 的正式规范整理历史兼容基线。

> 这一阶段决定了今天仍在使用的链接、图片、表格、表单和文档树模型，也留下了表现型标签、表格布局和 Quirks Mode 等历史包袱。

## 1. HTML 1.x / 2.0：超文本的最小骨架

HTML 最初解决的是“如何把研究文档通过链接连接起来”。HTML 2.0（1995）标准化了标题、段落、列表、超链接、图片与基础表单。

```html
<h1>Language Notes</h1>
<p>Read the <a href="chapter-2.html">next chapter</a>.</p>
<form action="/search" method="get">
  <label>Keyword <input name="q"></label>
  <input type="submit" value="Search">
</form>
```

当时页面主要是线性文档；布局能力有限，视觉表现大量依赖浏览器默认样式。

## 2. HTML 3.2：表现型标记与表格布局

HTML 3.2（1997）吸收了浏览器厂商已经实现的表格、脚本和表现型元素。`table` 原本用于二维数据，却很快被拿来拼页面布局。

```html
<table width="100%" cellpadding="8">
  <tr>
    <td width="180" valign="top">Navigation</td>
    <td>Main content</td>
  </tr>
</table>
```

这种布局把视觉网格写进内容结构：屏幕阅读顺序、响应式适配和维护成本都很差。今天只应把表格用于真正的行列数据。

## 3. HTML 4.01：结构与表现开始分离

HTML 4.01（1999）强化脚本、样式表、国际化、表格和表单，并提供 Strict、Transitional、Frameset 三类 DTD。核心方向是把颜色、字体和布局逐步交给 CSS。

| 当时常见写法 | 现代替代方案 |
| :--- | :--- |
| `<font color="red">` | 语义元素 + CSS `color` |
| `<center>` | CSS 布局与 `text-align` |
| `bgcolor`、`cellpadding` | CSS 背景与间距 |
| `frameset` | 正常文档导航；必要时使用有明确标题的 `iframe` |

## 4. XHTML 1.0 / 1.1：XML 化尝试

XHTML 1.0（2000）用 XML 语法重新表达 HTML 4，强调小写标签、属性引号、正确嵌套和显式闭合。

```html
<img src="logo.png" alt="Hello Lang" />
<p>Every element is correctly nested.</p>
```

严格语法培养了良好书写习惯，但真正以 `application/xhtml+xml` 发送时，一个 XML 语法错误就可能让整页无法显示。Web 最终转向兼容既有内容、具有明确错误恢复规则的 HTML5 解析模型。

## 5. 今天仍需要知道的遗留问题

- `<!DOCTYPE html>` 用于触发标准模式；缺失或旧式不完整 DOCTYPE 可能进入 Quirks Mode。
- 浏览器会修复部分错误标记，但 DOM 结果可能与源码直觉不同。
- 表现型元素不是“不能显示”，而是语义、可访问性和维护性较差。
- 遗留站点迁移时，应先保留行为，再逐步替换布局表格、内联样式和无语义容器。

下一阶段：[HTML5：语义、媒体与 Web 应用基础](./html5.md)。

## 版本信息与迁移

- **发布时间 / 标准时间：** 1991–1999 年（早期 HTML 至 HTML 4.01）
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** WHATWG HTML Living Standard、相关 W3C 规范与目标浏览器实现

**迁移影响：** 页面迁移应通过 HTML 校验、无障碍检查和目标浏览器回归完成；删除过时表现元素与非标准 API 时，要保留语义、键盘操作和降级行为。

## 版本确认

使用 WHATWG/W3C 校验器，并在目标浏览器记录 DOM、可访问性树和功能检测结果。

资料核对日期：2026-08-27。
