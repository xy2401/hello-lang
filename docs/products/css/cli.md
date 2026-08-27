# CSS 预览与验证

CSS 由浏览器解析，不需要独立运行时。命令行主要负责静态检查，本地 HTTP 服务负责提供真实页面环境，浏览器 DevTools 负责观察层叠、布局和兼容结果。

- [MDN：CSS](https://developer.mozilla.org/docs/Web/CSS)
- [Stylelint CLI](https://stylelint.io/user-guide/cli/)
- [CSSOM](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model)

## 启动预览页面

准备引用目标样式表的 HTML，然后从站点根目录启动：

```bash
python -m http.server 8000 --bind 127.0.0.1
```

访问 `http://127.0.0.1:8000/`，在 Network 面板确认 `.css` 返回 200 且 MIME 类型正确。直接打开 `file://` 可能掩盖路径、模块和 origin 问题。

## 检查样式文件

项目已安装 Stylelint 并有对应配置时：

```bash
npx stylelint styles.css
npx stylelint 'styles/**/*.css'
```

先查看问题，再决定是否让工具改写文件：

```bash
npx stylelint styles.css --fix
```

`--fix` 会直接修改源码，应在版本控制下运行并审阅差异。静态检查规则不等于浏览器兼容性测试。

## 在 DevTools 中确认结果

Elements 面板的 Styles 区域显示规则来源、优先级和被覆盖声明；Computed 区域显示最终计算值。Console 可做最小检查：

```javascript
const target = document.querySelector('.demo')
getComputedStyle(target).display
getComputedStyle(target).color

[...document.styleSheets].map(sheet => sheet.href ?? 'inline')
```

跨 origin 样式表的 `cssRules` 可能受同源策略限制，这不表示样式没有加载。

## 排查顺序与退出码

样式未生效时依次检查资源状态码、选择器是否匹配、层叠优先级、继承、媒体查询、支持条件和属性是否被浏览器忽略。布局问题还要检查包含块、格式化上下文和元素实际尺寸。

Stylelint 发现违反规则时返回非零状态，适合作为自动化检查；浏览器视觉结果仍需在目标引擎和视口验证。不要仅靠提高 specificity 或堆叠 `!important` 解决来源不清的问题。

资料核对日期：2026-08-28。
