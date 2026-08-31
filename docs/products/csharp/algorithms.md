# C# 算法实战全景

C# 的现代算法实现充分结合了**`Span<T>` 零分配内存切片与高效的 JIT 硬件向量化**：
* **就地排序与切片**：通过 `Span<T>.Slice()` 实现无多余堆内存分配的高速快速排序。
* **状态压缩动态规划**：紧凑数组结合 CPU 缓存局部性优化。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | In-Place QuickSort / `Array.Sort` | `Span<T>` 双指针分区 / 内省排序 (Introsort) | $O(n \log n)$ | $O(\log n)$ |
| **动态规划** | 0/1 背包问题 | 1D 数组空间优化 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 快速排序算法 (`Span<T>` In-Place QuickSort)

<<< ../../../demos/csharp/dsa/sorting/QuickSortDemo.cs

<DockerOutput image="mcr.microsoft.com/dotnet/sdk:8.0-alpine" sourceFile="demos/csharp/dsa/sorting/QuickSortDemo.cs" />

---

## 2. 动态规划：0/1 背包问题

<<< ../../../demos/csharp/dsa/dp/KnapsackDemo.cs

<DockerOutput image="mcr.microsoft.com/dotnet/sdk:8.0-alpine" sourceFile="demos/csharp/dsa/dp/KnapsackDemo.cs" />
