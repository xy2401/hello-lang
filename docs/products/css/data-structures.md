<script setup>
import dataStructuresCss from '../../../demos/css/data_structures_demo.css?raw';
import dataStructuresFixture from '../../../demos/css/data_structures_fixture.html?raw';
</script>

# CSS 数据结构

CSS 不是通用数据结构语言，但样式表会被解析为规则集合；选择器、声明、级联层和自定义属性形成浏览器用于计算样式的结构。

## 核心结构

| 结构 | CSS 表达 | 用途 |
| --- | --- | --- |
| 规则列表 | 样式规则与 At-rule | 保存选择器和声明块 |
| 级联层序列 | `@layer` | 明确规则组的优先顺序 |
| 令牌依赖图 | 自定义属性和 `var()` | 复用并传递设计值 |
| 布局网格 | Grid tracks | 建模二维空间 |

## CSS 的独特之处

自定义属性在元素上参与级联并默认继承，因此它们不是简单的全局常量。级联层先比较层顺序，再比较层内规则的优先级。

## 综合示例

<<< ../../../demos/css/data_structures_demo.css

<WebLivePlayground mode="css" title="CSS 规则与令牌结构" :initial-code="dataStructuresCss" :preview-html="dataStructuresFixture" />
