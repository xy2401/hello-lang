<script setup>
import { cssVersions } from '../../.vitepress/theme/data/versionData';
import { cssLiveCode, cssPreviewHtml } from '../../.vitepress/theme/data/liveExamples';
</script>

# 🟦 CSS 总览


CSS（Cascading Style Sheets）是一门描述文档**表现、布局和响应式规则**的声明式样式表语言。它的核心不是按顺序执行语句，而是让选择器匹配元素，再由层叠、继承和优先级共同决定最终样式。

<VersionDiff
  title="CSS 平台能力演进"
  :items="cssVersions"
/>

## Live CSS 实验室

修改颜色、布局、选择器或容器查询，右侧页面会自动刷新。示例 DOM 固定，因此可以专注观察层叠与布局结果。

<WebLivePlayground
  mode="css"
  title="CSS 层叠与响应式布局 Live"
  :initial-code="cssLiveCode"
  :preview-html="cssPreviewHtml"
/>

## 学习路线

- [CSS 基础、层叠与布局](./basic.md)：选择器、盒模型、自定义属性、Flexbox 与 Grid。
- [CSS3 之前](./version/pre-css3.md)：CSS1、CSS2/2.1、盒模型、浮动与定位，以及旧式布局为何难以维护。
- [CSS3 模块化时代](./version/css3.md)：媒体查询、圆角、阴影、渐变、过渡、动画、Flexbox 与模块化标准。
- [现代 CSS 平台能力](./version/modern-css.md)：Grid、容器查询、级联层、`:has()`、嵌套与现代颜色空间。

## 三阶段看懂 CSS

| 阶段 | 主要布局方式 | 代表能力 | 今天怎么用 |
| :--- | :--- | :--- | :--- |
| CSS1 / CSS2.1 | 正常流、table、float、position | 字体、颜色、盒模型、伪类、媒体类型 | 理解层叠根基，维护遗留布局 |
| CSS3 模块化 | Flexbox + 响应式媒体查询 | 圆角、阴影、渐变、变换、动画 | 构建现代响应式界面，避免把 CSS3 当成单一版本号 |
| Modern CSS | Grid + 容器驱动组件 | `@layer`、`:has()`、容器查询、嵌套、OKLCH | 建立低耦合组件与设计系统，按 Baseline/兼容性渐进增强 |

## CSS 的特殊定位

| 维度 | CSS |
| :--- | :--- |
| 求值模型 | 选择器匹配 + 层叠 + 继承 + 布局与绘制 |
| 核心抽象 | 规则集、选择器、属性、值、条件规则 |
| 状态表达 | 伪类、媒体查询、容器查询和自定义属性 |
| 正确性验证 | Stylelint、视觉回归、响应式与浏览器兼容性测试 |

## 适用边界

适合描述页面表现与布局；规范模块和浏览器支持逐项演进，样式预览不代替目标浏览器兼容性验证。

## 版本阅读范围

[完整版本目录](./version/)收录本仓库已有专题（如 css-flexbox、css-grid、css3）。这些是教学与兼容性对照入口；运行环境的具体版本以安装页、工作台或采集证据为准。

## 实验入口与范围

本页的 Live 组件可编辑并预览页面；预览使用隔离 iframe。 [Docker 验证证据](./docker-tooling)展示已有采集结果与缺口。
