# PHP 算法实战全景

PHP 8 在算法实现上结合了**直观的数组操作与强类型声明**：
* **分治排序**：利用 `foreach` 与 `array_merge` 编写纯函数式快速排序。
* **状态压缩动态规划**：利用 `array_fill` 预分配紧凑状态数组。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Functional QuickSort / `usort` | 分治递归 / 内置 C 快速排序 | $O(n \log n)$ | $O(n)$ |
| **动态规划** | 0/1 背包问题 | 1D 数组倒序状态转移 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 快速排序算法 (QuickSort)

<<< ../../../demos/php/dsa/sorting/quick_sort.php

<DockerOutput image="php:8.3-alpine" sourceFile="demos/php/dsa/sorting/quick_sort.php" />

---

## 2. 动态规划：0/1 背包问题

<<< ../../../demos/php/dsa/dp/knapsack.php

<DockerOutput image="php:8.3-alpine" sourceFile="demos/php/dsa/dp/knapsack.php" />
