# Lua 算法实战全景

Lua 在嵌入式脚本与游戏领域中，以**极致轻量与极速执行**著称：
* **原地快速排序**：基于 Table 索引的原地双指针交换。
* **状态压缩动态规划**：利用一维数字 Table 完成 0/1 背包状态转移。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | In-Place QuickSort / `table.sort` | 双指针划分 / 内置快速排序 | $O(n \log n)$ | $O(\log n)$ |
| **动态规划** | 0/1 背包问题 | 1D Table 状态压缩 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 原地快速排序 (In-Place QuickSort)

<<< ../../../demos/lua/dsa/sorting/quick_sort.lua

<DockerOutput image="hello-lang-lua:5.5.1" sourceFile="demos/lua/dsa/sorting/quick_sort.lua" />

---

## 2. 动态规划：0/1 背包问题

<<< ../../../demos/lua/dsa/dp/knapsack.lua

<DockerOutput image="hello-lang-lua:5.5.1" sourceFile="demos/lua/dsa/dp/knapsack.lua" />
