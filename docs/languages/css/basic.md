<script setup>
import { basicCssLiveCode, basicCssPreviewHtml } from '../../.vitepress/theme/data/liveExamples';
</script>

# CSS 基础语法

## 1. 规则集与选择器

```css
.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--color-brand);
  color: #ffffff;
}
```

选择器确定规则应用到哪些元素；声明块中的属性和值描述表现。避免用过深的选择器绑定具体 DOM 层级。

## 2. 层叠与自定义属性

```css
@layer reset, tokens, layout, components;

@layer tokens {
  :root {
    --color-brand: #4f46e5;
    --space-4: 1rem;
  }
}
```

层叠按来源、重要性、级联层、优先级和源码顺序选择最终声明。自定义属性参与层叠，可用来建立设计令牌和主题系统。

## 3. 盒模型与现代布局

```css
*, *::before, *::after { box-sizing: border-box; }

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}
```

- Flexbox 适合一维排列和组件内部对齐。
- Grid 适合二维页面或卡片布局。
- 逻辑属性（如 `margin-inline`）可以自然适配不同书写方向。

## 4. 在浏览器中直接运行

直接修改下面的 CSS，切换到“效果”即可观察层叠、盒模型和响应式 Grid。

<WebLivePlayground
  mode="css"
  title="CSS 层叠、盒模型与布局"
  :initial-code="basicCssLiveCode"
  :preview-html="basicCssPreviewHtml"
/>

完整示例源码：`demos/css/basic_demo.css`
