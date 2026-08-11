<script setup>
import { cssLiveCode, cssPreviewHtml } from '../../.vitepress/theme/data/liveExamples';
</script>

# 现代 CSS 原生能力

> 现代 CSS 的关键变化，是布局和组件状态越来越能由 CSS 自己表达。过去需要预处理器或 JavaScript 的许多工作，已经成为浏览器原生能力。

## 1. Grid 与内在尺寸

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: clamp(.75rem, 2vw, 1.5rem);
}
```

Grid 直接表达二维行列关系；`minmax()`、`min()`、`max()`、`clamp()` 和 `auto-fit` 让布局根据可用空间自然变化，减少以设备为中心的断点。

## 2. 容器查询

```css
.card-list { container: cards / inline-size; }

@container cards (width > 42rem) {
  .card-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

组件可以根据容器而不是整个视口调整布局，更适合可复用组件系统。

## 3. 级联层

```css
@layer reset, base, components, utilities;

@layer components {
  .button { background: var(--brand); }
}
```

`@layer` 在优先级计算前建立明确的规则层次，让组件和工具类不必通过提高选择器权重互相覆盖。层的声明顺序比每个层内部的选择器优先级更重要。

## 4. `:has()` 与原生嵌套

```css
.card {
  & h2 { color: var(--accent); }
  &:has(a:focus-visible) { outline: 0.2rem solid var(--accent); }
}
```

`:has()` 可根据后代或相邻元素状态选择父级；原生嵌套减少重复选择器，但仍应控制层级深度。

## 5. 自定义属性、主题与现代颜色

`oklch()` 提供更符合视觉感知的颜色控制，`color-mix()` 支持运行时混色。动画应通过 `prefers-reduced-motion` 尊重用户的减少动态效果偏好。

```css
:root {
  --brand: oklch(62% .2 265);
  --brand-soft: color-mix(in oklch, var(--brand) 16%, white);
}

@media (prefers-color-scheme: dark) {
  :root { --brand-soft: color-mix(in oklch, var(--brand) 24%, black); }
}
```

自定义属性在运行时参与层叠，适合设计令牌、主题和组件参数；它与 Sass 变量的编译期替换模型不同。

## 6. 滚动、锚点与视图过渡

- Scroll Snap 描述可控的滚动停靠点。
- Scroll-driven Animations 可以让动画时间线跟随滚动进度。
- Anchor Positioning 用元素之间的锚点关系定位浮层。
- View Transitions 为同文档或跨文档状态变化提供连贯过渡。

这些能力成熟度不同，应查阅兼容性并以渐进增强方式使用。

## 7. 现代 CSS 工程原则

1. 先使用正常流、Flexbox、Grid 和内在尺寸，再增加断点。
2. 用低优先级类、级联层和明确组件边界管理覆盖关系。
3. 用逻辑属性适配不同书写方向。
4. 尊重 `prefers-reduced-motion`、`prefers-contrast` 和颜色方案偏好。
5. 新能力采用 `@supports` 与渐进增强，不让核心任务依赖单一新特性。

## 8. Live 练习

示例已包含 Grid、容器查询和现代颜色。修改源码后切换到“效果”即可查看布局变化。

<WebLivePlayground
  mode="css"
  title="现代 CSS 响应式布局"
  :initial-code="cssLiveCode"
  :preview-html="cssPreviewHtml"
/>
