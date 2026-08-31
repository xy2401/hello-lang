# C 与 C++ 算法实战全景

C 与 C++ 的算法体系体现了系统级编程从**底层指针操作**到**现代泛型概念（Concepts/Ranges）**的演进：
* **C 语言**：依靠函数指针（如 `qsort`、`bsearch`）和 `void*` 内存跨度实现多态。
* **C++ (C++20)**：通过 `std::ranges`、迭代器双端抽象、Lambda 闭包与 STL 算法库实现强类型安全、内联优化与零运行时损耗。

---

## 📊 核心算法分类与复杂度

| 算法专题 | 经典问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | QuickSort / `std::sort` | 分治划分、内省排序 (Introsort) | 平均 $O(n \log n)$，最坏 $O(n^2)$ | $O(\log n)$ 递归栈 |
| **二分查找** | `std::lower_bound` / `std::upper_bound` | 单调性折半搜索 | $O(\log n)$ | $O(1)$ |
| **图遍历** | BFS / DFS | 队列层序扩展 / 递归回溯 | $O(V + E)$ | $O(V)$ |
| **最短路径** | Dijkstra 算法 | 贪心选择 + 优先队列 (Min-Heap) 松弛边 | $O((V + E) \log V)$ | $O(V)$ |
| **动态规划** | 0/1 背包问题 | 状态定义、无后效性转移、空间压缩 (1D Array) | $O(N \cdot W)$ | 优化后 $O(W)$ |

---

## 1. 排序算法：快速排序与内省排序 (Introsort)

### C++20 `std::sort` 与快速排序实现
<<< ../../../demos/cpp/dsa/sorting/quick_sort.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/sorting/quick_sort.cpp" />

---

## 2. 查找与区间检索：二分查找 (Binary Search)

### C++ `std::lower_bound` / `std::upper_bound`
<<< ../../../demos/cpp/dsa/search/binary_search.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/search/binary_search.cpp" />

---

## 3. 图论算法：BFS 遍历与 Dijkstra 最短路径

### 图的广度优先遍历 (BFS)
<<< ../../../demos/cpp/dsa/graphs/bfs_dfs.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/graphs/bfs_dfs.cpp" />

### Dijkstra 单源最短路径 (优先队列优化版)
<<< ../../../demos/cpp/dsa/graphs/dijkstra.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/graphs/dijkstra.cpp" />

---

## 4. 动态规划：0/1 背包问题

### 状态转移与 1D 滚动数组空间压缩
<<< ../../../demos/cpp/dsa/dp/knapsack.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/dp/knapsack.cpp" />
