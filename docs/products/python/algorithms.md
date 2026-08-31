# Python 算法

Python 倾向于通过 `key` 函数描述排序目标，并用标准库模块组合成熟算法，而不是传入传统三路比较器。

## 常用能力

| 操作 | API | 复杂度 |
| --- | --- | --- |
| 稳定排序 | `sorted(..., key=...)` | O(n log n) |
| 二分定位 | `bisect_left` / `bisect_right` | 查找 O(log n) |
| 队列遍历 | `deque.popleft` | 每次 O(1) |
| Top-K | `heapq.nsmallest` / `nlargest` | O(n log k) |

## 语言特性

排序使用稳定的 Timsort，相同主键的元素可以保留原顺序。生成器适合惰性流水线；图搜索仍需显式维护 `seen`，避免环导致重复访问。

## 综合示例

<<< ../../../demos/python/algorithms_demo.py

<DockerOutput image="python:3.12-slim" sourceFile="demos/python/algorithms_demo.py" />
