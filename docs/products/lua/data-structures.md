# Lua 数据结构

Lua 的核心数据结构只有 Table，但连续整数键、任意键和 Metatable 让它同时承担数组、Map、Set、对象和图节点。选择结构时应写清键域与不变量，避免调用者猜测一张表的语义。

| 模型 | 表示 | 典型复杂度 |
| --- | --- | --- |
| 数组 / 栈 | 连续整数键 `1..n` | 索引 O(1)，尾部追加摊销 O(1) |
| Map | 任意非 `nil` 键 | 查询平均 O(1) |
| Set | `value -> true` | 查询平均 O(1) |
| 对象 | Table + `__index` | 方法查询平均 O(1) |
| 树 / 图 | 嵌套 Table 或邻接表 | 取决于遍历算法 |

## 综合示例

示例不依赖 `pairs` 的 Hash 遍历顺序，而是按固定键打印。

<<< ../../../demos/lua/data_structures_demo.lua

<DockerOutput image="hello-lang-lua:5.5.1" sourceFile="demos/lua/data_structures_demo.lua" />

长度运算符 `#` 只适合没有空洞的序列；含空洞的整数键 Table 不能把 `#table` 当成可靠元素数。

