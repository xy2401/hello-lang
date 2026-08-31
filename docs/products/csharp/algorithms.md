# C# 算法

C# 将原地集合算法、LINQ 查询和专用容器组合使用：前者控制分配，后者强调可读的数据变换。

## 常用能力

| 操作 | API | 复杂度 |
| --- | --- | --- |
| 多级排序 | `OrderBy` / `ThenBy` | O(n log n) |
| 二分查找 | `List<T>.BinarySearch` | O(log n) |
| BFS | `Queue<T>` + `HashSet<T>` | O(V + E) |
| Top-K | `PriorityQueue<T,P>` | O(n log k) |

## 语言特性

LINQ 运算通常采用延迟执行，枚举结果时才真正运行。需要固定快照或避免重复计算时，应调用 `ToList` 或 `ToArray` 明确物化。

## 综合示例

<<< ../../../demos/csharp/AlgorithmsDemo.cs

<DockerOutput image="mcr.microsoft.com/dotnet/sdk:8.0-alpine" sourceFile="demos/csharp/AlgorithmsDemo.cs" />
