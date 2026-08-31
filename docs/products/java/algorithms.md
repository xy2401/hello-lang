# Java 算法实战全景

Java 在大规模企业级算法应用中，以**强类型安全、JIT 即时编译优化与内存自动回收**见长：
* **标准算法工具箱**：`Collections.sort()`、`Arrays.binarySearch()`、`Arrays.parallelSort()` 提供高度优化的高性能底座。
* **图论与动态规划**：利用标准集合与紧凑状态数组实现工业级算法。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Dual-Pivot Quicksort / In-Place Sort | 双基准快速排序划分 | $O(n \log n)$ | $O(\log n)$ |
| **二分查找** | `Arrays.binarySearch` | 变种二分检索 | $O(\log n)$ | $O(1)$ |
| **图遍历** | BFS (广度优先遍历) | 队列层序遍历与 Set 去重 | $O(V + E)$ | $O(V)$ |
| **动态规划** | 0/1 背包问题 | 1D 数组反向遍历更新 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 排序算法：快速排序 (QuickSort)

<<< ../../../demos/java/dsa/sorting/QuickSortDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/dsa/sorting/QuickSortDemo.java" />

---

## 2. 检索算法：二分查找 (Binary Search)

<<< ../../../demos/java/dsa/search/BinarySearchDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/dsa/search/BinarySearchDemo.java" />

---

## 3. 图论算法：广度优先遍历 (BFS)

<<< ../../../demos/java/dsa/graphs/BfsDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/dsa/graphs/BfsDemo.java" />

---

## 4. 动态规划：0/1 背包问题

<<< ../../../demos/java/dsa/dp/KnapsackDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/dsa/dp/KnapsackDemo.java" />
