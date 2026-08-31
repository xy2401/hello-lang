# Lua 算法

Lua 标准库提供 `table.sort`，搜索、队列和图遍历通常按数据形状手写。Lua 数组从 1 开始，二分查找返回值会与多数 0 基语言相差 1。

| 算法 | 时间 | Lua 注意点 |
| --- | --- | --- |
| `table.sort` | O(n log n) 量级 | 不承诺稳定；需要稳定性时加入原始序号 |
| 二分查找 | O(log n) | 边界从 1 到 `#values` |
| BFS | O(V + E) | 用 head 索引推进队列，避免反复移除首项 |

## 综合示例

示例用 Coroutine 把 BFS 包装成惰性迭代器，并用原始序号显式获得稳定排序结果。

<<< ../../../demos/lua/algorithms_demo.lua

<DockerOutput image="hello-lang-lua:5.5.1" sourceFile="demos/lua/algorithms_demo.lua" />

