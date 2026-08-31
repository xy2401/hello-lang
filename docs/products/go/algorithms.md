# Go 算法实战全景

Go 标准库算法以**直白、高效、易于内联**为核心哲学：
* **现代标准库 `slices` / `cmp` (Go 1.21+)**：提供泛型排序、二分查找、有序性判定，无需额外反射。
* **分治与指针交换**：通过清晰的切片重划分完成快速排序与原位变换。

---

## 📊 核心算法与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Generic QuickSort / `slices.Sort` | 泛型类型约束 `~int \| ~string`、双指针分区 | $O(n \log n)$ | $O(\log n)$ |
| **二分查找** | `slices.BinarySearch` | 单调切片二分，返回索引与匹配布尔值 | $O(\log n)$ | $O(1)$ |
| **图遍历** | BFS / DFS | 切片队列 / 递归映射图 | $O(V + E)$ | $O(V)$ |

---

## 1. 泛型排序算法：快速排序 (QuickSort)

利用类型约束 `[T ~int | ~string | ~float64]` 实现通用原地快速排序，并配合 `slices.IsSorted` 验证：

<<< ../../../demos/go/dsa/sorting/quick_sort.go

<DockerOutput image="golang:1.22-alpine" sourceFile="demos/go/dsa/sorting/quick_sort.go" />
