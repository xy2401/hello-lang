# Python 数据结构

Python 内置容器覆盖了大多数应用场景；`collections` 与 `heapq` 则补充队列和堆。应先选语义正确的容器，再考虑微观优化。

## 核心容器

| 结构 | 类型 | 典型复杂度 |
| --- | --- | --- |
| 动态数组 | `list` | 索引 O(1)，尾部追加摊销 O(1) |
| 双端队列 | `collections.deque` | 两端插入删除 O(1) |
| 哈希映射/集合 | `dict` / `set` | 查询平均 O(1) |
| 最小堆 | `heapq` 操作的列表 | 插入、弹出 O(log n) |

## Python 的独特之处

- `dict` 保证插入顺序，但排序语义仍应显式表达。
- `tuple` 和 `frozenset` 提供不可变组合；是否可哈希还取决于内部元素。
- `@dataclass(frozen=True)` 适合声明轻量不可变节点。

## 综合示例

<<< ../../../demos/python/data_structures_demo.py

<DockerOutput image="python:3.12-slim" sourceFile="demos/python/data_structures_demo.py" />
