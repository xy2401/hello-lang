# Java 算法实战全景

Java 在大规模企业级算法应用中，以**强类型安全、JIT 即时编译优化与内存自动回收**见长：
* **标准算法工具箱**：`Collections.sort()`、`Arrays.binarySearch()`、`Arrays.parallelSort()` 提供高度优化的高性能底座。
* **动态规划与状态机**：利用扁平数组高效处理状态压缩，JIT 能够将循环自动向量化。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Dual-Pivot Quicksort / TimSort | 双基准快排（基本类型）/ 归并 TimSort（对象类型） | $O(n \log n)$ | $O(n)$ 或 $O(1)$ |
| **二分查找** | `Arrays.binarySearch` | 变种二分（负值返回插入点 `-(insertion_point) - 1`） | $O(\log n)$ | $O(1)$ |
| **动态规划** | 0/1 背包问题 | 1D 数组反向遍历更新 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 动态规划：0/1 背包问题

实现 0/1 背包问题的空间优化转移：

<<< ../../../demos/java/dsa/dp/KnapsackDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/dsa/dp/KnapsackDemo.java" />
