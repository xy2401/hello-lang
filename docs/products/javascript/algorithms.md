# JavaScript 算法实战全景

JavaScript 在算法实现上结合了**高阶函数式编程与 V8 JIT 优化**：
* **内置高效排序**：`Array.prototype.sort()` 采用 TimSort 算法。
* **类型化数组与空间压缩**：使用 `Int32Array` 实现动态规划状态转移的高性能内存加速。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Functional QuickSort / V8 TimSort | 分治划分 / 自适应归并 | $O(n \log n)$ | $O(n)$ |
| **动态规划** | 0/1 背包问题 | `Int32Array` 内存连续状态压缩转移 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 快速排序算法 (QuickSort)

<<< ../../../demos/javascript/dsa/sorting/quick_sort.js

<DockerOutput image="node:22-alpine" sourceFile="demos/javascript/dsa/sorting/quick_sort.js" />

---

## 2. 动态规划：0/1 背包问题

<<< ../../../demos/javascript/dsa/dp/knapsack.js

<DockerOutput image="node:22-alpine" sourceFile="demos/javascript/dsa/dp/knapsack.js" />
