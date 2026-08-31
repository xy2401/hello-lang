# Go 算法

Go 的标准库强调明确的控制流和小接口。排序、搜索与遍历通常直接操作 Slice，并通过闭包描述比较规则。

## 常用能力

| 操作 | API | 复杂度 |
| --- | --- | --- |
| 稳定排序 | `sort.SliceStable` | O(n log n) |
| 二分查找 | `sort.Search` / `SearchInts` | O(log n) |
| BFS | Slice 队列 + Map 集合 | O(V + E) |
| 堆算法 | `container/heap` | O(log n) 每次更新 |

## 语言特性

闭包比较器简洁但缺少静态字段约束；项目也可以用泛型辅助函数封装常见顺序。图遍历中的 `map[string]bool` 同时承担集合与访问标记的角色。

## 综合示例

<<< ../../../demos/go/algorithms_demo.go

<DockerOutput image="golang:1.22-alpine" sourceFile="demos/go/algorithms_demo.go" />
