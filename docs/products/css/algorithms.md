<script setup>
import algorithmsCss from '../../../demos/css/algorithms_demo.css?raw';
import algorithmsFixture from '../../../demos/css/algorithms_fixture.html?raw';
</script>

# CSS 算法

CSS 不执行通用算法；浏览器对每个元素执行选择器匹配、级联、继承、值计算和布局。理解这些步骤比背诵单个优先级数字更可靠。

## 样式与布局阶段

| 阶段 | 关键输入 | 结果 |
| --- | --- | --- |
| 选择器匹配 | DOM、伪类状态、选择器 | 候选声明 |
| 级联 | 来源、重要性、层、优先级、顺序 | 胜出声明 |
| 继承与值计算 | 父元素、变量、单位 | 计算值 |
| Grid 轨道计算 | 可用空间、固定与弹性轨道 | 最终轨道尺寸 |

## CSS 的独特之处

`:where()` 的优先级恒为零，适合提供易覆盖的默认规则。级联层顺序位于选择器优先级之前，因此后置层中的低优先级规则也可以覆盖前层规则。

## 综合示例

<<< ../../../demos/css/algorithms_demo.css

<WebLivePlayground mode="css" title="CSS 级联与 Grid 计算" :initial-code="algorithmsCss" :preview-html="algorithmsFixture" />
