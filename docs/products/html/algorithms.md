<script setup>
import algorithmsHtml from '../../../demos/html/algorithms_demo.html?raw';
</script>

# HTML 算法

HTML 自身不提供用户定义算法，但浏览器必须执行分词、树构建、错误恢复和 DOM 查询。脚本可以在解析结果上运行树遍历算法。

## 浏览器处理阶段

| 阶段 | 作用 | 规模 |
| --- | --- | --- |
| Tokenization | 把字符流识别为标签、属性和文本 | 通常 O(n) |
| Tree construction | 根据插入模式构建 DOM | 通常 O(n) |
| Selector query | 在 DOM 中寻找匹配节点 | 与选择器和树规模相关 |
| TreeWalker | 按过滤条件遍历节点 | O(访问节点数) |

## HTML 的独特之处

HTML 解析器具备标准化错误恢复，源码缩进并不决定 DOM；表格、格式化元素和无效嵌套可能触发特殊树构建规则。

## 综合示例

示例使用 `TreeWalker` 按深度优先顺序访问元素节点。

<<< ../../../demos/html/algorithms_demo.html

<WebLivePlayground mode="html" title="DOM 树遍历" :initial-code="algorithmsHtml" />
