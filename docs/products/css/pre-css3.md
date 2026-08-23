# CSS3 之前：CSS1、CSS2 与 CSS2.1

> 早期 CSS 建立了今天仍然有效的层叠、继承、盒模型和定位规则，但还没有专门为应用布局设计的 Flexbox 与 Grid。

## 1. CSS1：把表现从 HTML 中抽离

CSS1（1996）覆盖字体、颜色、背景、文本、外边距、边框和内边距。它让一组规则可以复用到整站，而不必在每个元素上重复 `<font>` 或 `bgcolor`。

```css
body {
  color: #222222;
  background: #ffffff;
  font-family: Arial, sans-serif;
}

h1 { color: #003399; }
a:link { color: #0000ee; }
a:visited { color: #551a8b; }
```

## 2. 层叠为什么是 CSS 的核心

当多个声明命中同一元素时，浏览器综合来源、重要性、上下文、选择器优先级和源码顺序得到最终值。

```css
/* (0, 0, 1) */
p { color: #334155; }

/* (0, 1, 1) —— 优先级更高 */
.notice p { color: #b91c1c; }

/* 相同优先级下，后出现的规则获胜 */
.notice p { color: #1d4ed8; }
```

维护旧项目时，不应靠无限增加 ID、嵌套层级或 `!important` 对抗层叠；更稳妥的做法是明确组件边界和规则顺序。

## 3. CSS2 / CSS2.1：定位、媒体与更完整的视觉模型

CSS2（1998）加入定位、`z-index`、媒体类型、生成内容、更丰富的选择器和表格布局模型。CSS2.1 随后把规范收敛到浏览器可互操作的实现基础。

```css
.page { position: relative; width: 960px; margin: 0 auto; }
.sidebar { float: left; width: 220px; }
.content { margin-left: 250px; }

@media print {
  .navigation { display: none; }
}
```

## 4. 盒模型与兼容性战争

标准盒模型中，声明的 `width` 只包含 content；padding 与 border 会继续增加总宽度。

```css
.legacy-box {
  width: 300px;
  padding: 20px;
  border: 5px solid;
  /* 实际外宽：350px */
}
```

现代项目通常统一使用：

```css
*, *::before, *::after { box-sizing: border-box; }
```

这样 `width` 包含 content、padding 与 border，更符合组件尺寸直觉。

## 5. Float 布局的时代与局限

`float` 原本用于图片旁文字环绕。开发者借助百分比宽度、负 margin、clearfix 和伪元素实现多栏布局，但列高、垂直居中、重排和响应式组合都很脆弱。

```css
.row::after { content: ""; display: table; clear: both; }
.column { float: left; width: 33.333%; }
```

今天应让 Flexbox 负责一维分配，让 Grid 负责二维网格；`float` 仍适合真正的文字环绕。

## 6. 遗留 CSS 迁移顺序

1. 建立视觉回归基线，先确认不能改变的行为。
2. 全局统一 `box-sizing`，但检查第三方组件边界。
3. 将布局 float/table 分区替换为 Flexbox 或 Grid。
4. 用类和组件边界降低 ID、深层选择器与 `!important` 的数量。
5. 最后清理无引用规则和浏览器私有补丁。

下一阶段：[CSS3：模块化、响应式与视觉表达](./css3.md)。
