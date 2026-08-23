# CSS3：模块化、响应式与视觉表达

CSS3 不是一个像 HTML5 那样一次发布的单体版本。庞大的 CSS2 后续工作被拆成 Selectors、Media Queries、Backgrounds and Borders、Transforms、Animations、Flexbox 等模块，各模块独立升级成熟度。

## 1. 媒体查询与响应式设计

```css
.layout { padding: 1rem; }

@media (min-width: 48rem) {
  .layout {
    display: flex;
    gap: 2rem;
  }
  .sidebar { flex: 0 0 16rem; }
  .content { flex: 1; }
}
```

移动优先意味着基础规则先满足窄屏，再通过 `min-width` 增强宽屏布局。断点应由内容何时拥挤决定，而不是绑定某个设备型号。

## 2. 圆角、阴影、渐变与多背景

```css
.hero-card {
  border-radius: 1rem;
  background:
    linear-gradient(135deg, rgb(37 99 235 / 90%), rgb(124 58 237 / 90%)),
    url('/pattern.svg');
  box-shadow: 0 1rem 2.5rem rgb(15 23 42 / 18%);
}
```

过去需要切图的常见视觉效果可以直接由 CSS 描述，并随分辨率和尺寸无损适配。

## 3. Transform、Transition 与 Animation

```css
.card {
  transition: transform 180ms ease, box-shadow 180ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgb(15 23 42 / 20%);
}

@keyframes enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
```

动画应服务于状态解释和空间关系。为 `prefers-reduced-motion: reduce` 提供弱化或关闭方案。

## 4. Flexbox：真正的一维布局系统

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: .75rem;
}
.toolbar .search { flex: 1 1 18rem; }
.toolbar .actions { margin-inline-start: auto; }
```

Flexbox 解决主轴空间分配、交叉轴对齐、换行和顺序问题，特别适合工具栏、导航、表单行和卡片内部结构。

## 5. 选择器和结构表达增强

CSS3 选择器普及了属性选择器、结构伪类和状态伪类：

```css
input[type="email"]:invalid { border-color: #dc2626; }
.result:nth-child(odd) { background: #f8fafc; }
.menu a:not([aria-current="page"]):hover { text-decoration: underline; }
```

## 6. 从 CSS3 走向现代 CSS

Grid 虽然常被口语归入“CSS3”，但现代 CSS 已经不适合用单一 CSS3 标签概括。后续模块继续加入 Grid、变量、逻辑属性、级联层、容器查询与父级选择器等能力。

下一阶段：[现代 CSS 平台能力](./modern-css.md)。
