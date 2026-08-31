# C# 数据结构深度解析

现代 .NET (C# 12 / .NET 8+) 在数据结构上融合了**极高性能的零分配内存原语与工业级泛型容器**：
* **`Span<T>` 与 `Memory<T>`**：实现堆/栈/非托管内存统一的安全无拷贝切片。
* **现代泛型集合 (`System.Collections.Generic`)**：`List<T>`、`Dictionary<TKey, TValue>`、`PriorityQueue<TElement, TPriority>` 提供了强类型与极致吞吐。

---

## 📊 核心结构与复杂度

| 容器类型 | .NET 底层实现 | 典型复杂度 | 特性与场景 |
| :--- | :--- | :--- | :--- |
| **`List<T>`** | 动态扩容 `T[]` 数组 | 索引 $O(1)$，追加 $O(1)$ | 默认通用列表 |
| **`Dictionary<K, V>`** | 质数桶哈希表 | 增删查平均 $O(1)$ | 高性能键值对映射 |
| **`PriorityQueue<T, P>`** | 四叉堆 / 二叉堆实现 | 堆顶 $O(1)$，入堆/出堆 $O(\log n)$ | 任务调度、图最短路径 |
| **`Span<T>`** | 栈上 Ref Struct 切片 | 零分配访问 $O(1)$ | 高性能切片操作与算法 |

---

## 1. 线性结构：`List<T>` 与 `Span<T>` 内存切片

<<< ../../../demos/csharp/dsa/linear/DynamicArrayDemo.cs

<DockerOutput image="mcr.microsoft.com/dotnet/sdk:8.0-alpine" sourceFile="demos/csharp/dsa/linear/DynamicArrayDemo.cs" />

---

## 2. 优先队列：`PriorityQueue<TElement, TPriority>`

<<< ../../../demos/csharp/dsa/trees/HeapDemo.cs

<DockerOutput image="mcr.microsoft.com/dotnet/sdk:8.0-alpine" sourceFile="demos/csharp/dsa/trees/HeapDemo.cs" />
