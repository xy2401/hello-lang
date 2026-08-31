# Python 算法实战全景

Python 在算法实现上拥有**极其简洁的代码表达力与强大的标准算法生态**：
* **函数式列表推导式**：用极简语法表达分治划分、过滤与映射。
* **TimSort 核心算法**：内置 `list.sort()` 与 `sorted()` 采用高度自适应的 TimSort（结合归并与插入排序），在现实数据上具备优异性能。

---

## 📊 核心算法与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Functional QuickSort / TimSort | 列表推导式分治 / 自适应分段归并 | $O(n \log n)$ | $O(n)$ |
| **二分查找** | `bisect.bisect_left` / `bisect_right` | 二分检索插入索引 | $O(\log n)$ | $O(1)$ |
| **图遍历** | BFS (`deque`) / DFS (递归) | 队列层序遍历 / 回溯 | $O(V + E)$ | $O(V)$ |

---

## 1. 排序算法：函数式快速排序 (QuickSort)

利用列表推导式实现直观清晰的快速排序，并与 Python 原生 TimSort 对比：

<<< ../../../demos/python/dsa/sorting/quick_sort.py

<DockerOutput image="python:3.12-slim" sourceFile="demos/python/dsa/sorting/quick_sort.py" />
