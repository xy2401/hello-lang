# PHP 数据结构深度解析

PHP 8 拥有高效的底层数组（Zend HashTable）与标准 SPL 数据结构扩展：
* **统一数组（Array）**：结合有序映射与动态数组的混合 HashTable。
* **SPL 专用容器**：`SplDoublyLinkedList`、`SplPriorityQueue`、`SplFixedArray` 提供专有数据结构的高性能原生支持。

---

## 📊 核心容器特征

| 结构 | PHP 实现 | 典型复杂度 | 特性 |
| :--- | :--- | :--- | :--- |
| **数组** | `array` (HashTable) | 增删查 $O(1)$ | 默认通用有序键值结构 |
| **双向链表** | `SplDoublyLinkedList` | 两端操作 $O(1)$ | 栈与双端队列结构 |
| **优先队列** | `SplPriorityQueue` | 入队出队 $O(\log n)$ | 基于堆的优先级调度 |

---

## 1. 线性结构：PHP 数组与 `SplDoublyLinkedList`

<<< ../../../demos/php/dsa/linear/dynamic_array.php

<DockerOutput image="php:8.3-alpine" sourceFile="demos/php/dsa/linear/dynamic_array.php" />

---

## 2. 堆与优先队列：`SplPriorityQueue`

<<< ../../../demos/php/dsa/trees/heap.php

<DockerOutput image="php:8.3-alpine" sourceFile="demos/php/dsa/trees/heap.php" />
