<script setup>
import dataStructuresHtml from '../../../demos/html/data_structures_demo.html?raw';
</script>

# HTML 数据结构

HTML 不是通用编程语言，但文档会被解析成 DOM 树。元素的嵌套、顺序和关联属性共同构成浏览器、辅助技术与脚本消费的数据结构。

## 核心结构

| 结构 | HTML 表达 | 访问特点 |
| --- | --- | --- |
| 有序树 | 元素嵌套 | 父子、兄弟节点遍历 |
| 有序/无序序列 | `ol` / `ul` / `li` | 保留文档顺序 |
| 二维关系 | `table`、行、表头与单元格 | 按行列和表头关联 |
| 键值元数据 | `data-*` 属性 | 通过 `dataset` 读取 |

## HTML 的独特之处

DOM 不只保存标签文本，还包含节点类型、属性、文本节点和文档顺序。语义元素及 `scope`、`for` 等关联会形成辅助功能树可使用的关系。

## 综合示例

<<< ../../../demos/html/data_structures_demo.html

<WebLivePlayground mode="html" title="HTML 树形数据结构" :initial-code="dataStructuresHtml" />
