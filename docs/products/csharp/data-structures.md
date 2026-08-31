# C# 数据结构

.NET 泛型集合提供统一、类型安全的容器体系，Record 和可空引用类型则适合表达节点数据及其生命周期约束。

## 核心容器

| 结构 | 类型 | 典型复杂度 |
| --- | --- | --- |
| 动态数组 | `List<T>` | 索引 O(1)，追加摊销 O(1) |
| 映射/集合 | `Dictionary<K,V>` / `HashSet<T>` | 平均 O(1) |
| 队列 | `Queue<T>` | 入队、出队 O(1) |
| 优先队列 | `PriorityQueue<TElement,TPriority>` | O(log n) |

## C# 的独特之处

- 泛型在 CLR 中保留运行时类型信息，值类型通常无需装箱即可进入泛型集合。
- Record 默认提供基于成员的值相等语义，适合不可变树节点。
- `Span<T>` 能在不分配新数组的情况下查看连续内存，但不能逃逸到托管堆。

## 综合示例

<<< ../../../demos/csharp/DataStructuresDemo.cs

<DockerOutput image="mcr.microsoft.com/dotnet/sdk:8.0-alpine" sourceFile="demos/csharp/DataStructuresDemo.cs" />
