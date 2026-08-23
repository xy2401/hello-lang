# HTML 版本演进

HTML 标准由 WHATWG 以 **HTML Living Standard** 持续维护演进，现代浏览器持续普及原生高级交互组件。

## 核心版本演进与关键里程碑

### HTML Living Standard (现代特性)（2023 年–2024 年）

**主要功能与架构演进：**

- 原生 `<dialog>` 标签：支持全平台统一的模态弹窗与无障碍焦点捕获（`.showModal()`）
- 原生 Popover API（`popover` 属性）：无需任何 JavaScript 库即可实现下拉菜单与浮动提示
- 原生 `<search>` 语义标签代表搜索区域

**工程影响与选型建议：**

> 大幅缩减前端对第三方基础 UI 弹窗库的体积依赖。

### HTML5 (W3C 推荐标准)（2014 年 10 月）

**主要功能与架构演进：**

- 结构化语义标签：`<header>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- 多媒体与图形能力：原生 `<video>`, `<audio>`, `<canvas>`, SVG 嵌入
- 本地存储与应用能力：Web Storage、Web Worker、WebSocket 规范

**工程影响与选型建议：**

> 彻底废弃 Flash，确立现代开放 Web 平台标准。

### HTML 4.01（1999 年 12 月）

**主要功能与架构演进：**

- 确立基于表现（CSS）与结构（HTML）严格分离的设计思想
- 引入表格排版与基础表单控件体系

**工程影响与选型建议：**

> 早期万维网（Web 1.0/2.0）的黄金标准基石。

## 现代 Web 规范
- 现代页面文档头部必须声明简短的 `<!DOCTYPE html>` 触发标准渲染模式。
