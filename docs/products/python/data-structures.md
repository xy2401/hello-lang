# Python 数据结构深度解析

Python 的数据结构设计强调**优雅表达力、统一协议与动态高效**：
* **高度优化的内置结构**：`list`（动态指针数组）、`dict`（紧凑哈希表）、`set` 采用 C 语言底层实现，具备极高执行效率。
* **专业标准库模块**：`collections.deque`（双端队列）、`heapq`（堆算法）、`bisect`（二分算法）、`dataclasses` 提供了丰富的高级结构支持。

---

## 📊 核心容器特征与复杂度

| 容器类型 | 底层原理 | 典型时间复杂度 | 特征与场景 |
| :--- | :--- | :--- | :--- |
| **`list`** | 连续对象指针数组 | 随机访问 $O(1)$，尾部 `append`/`pop` $O(1)$ | 默认通用列表，头部操作 $O(n)$ 较慢 |
| **`collections.deque`** | 双向链式块结构 (Blocks) | 首尾 `append`/`popleft` $O(1)$ | 任务队列、BFS 搜索队列 |
| **`dict` / `set`** | 紧凑稀疏哈希表 (Compact Hash) | 增删查平均 $O(1)$ | 键值映射、去重与集合运算 |
| **`heapq`** | 基于 `list` 的二叉最小堆算法 | 堆顶 $O(1)$，`heappush`/`heappop` $O(\log n)$ | 贪心算法、优先队列、Top-K 调度 |

---

## 1. 线性结构：列表与双端队列 (`list` & `deque`)

展示 Python 列表动态追加与 `deque` 头部插入/弹出：

<<< ../../../demos/python/dsa/linear/dynamic_array.py

<DockerOutput image="python:3.12-slim" sourceFile="demos/python/dsa/linear/dynamic_array.py" />

---

## 2. 树形与堆结构：优先队列 (`heapq`)

展示 Python `heapq` 的最小堆维护与元素弹出：

<<< ../../../demos/python/dsa/trees/heap.py

<DockerOutput image="python:3.12-slim" sourceFile="demos/python/dsa/trees/heap.py" />
