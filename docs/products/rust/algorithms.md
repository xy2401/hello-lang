# Rust 算法

Rust 的算法大量建立在切片和迭代器之上：切片算法负责原地处理，迭代器负责零成本的惰性组合。

## 常用能力

| 操作 | API | 复杂度 |
| --- | --- | --- |
| 稳定排序 | `slice::sort_by_key` | O(n log n) |
| 二分查找 | `slice::binary_search` | O(log n) |
| 惰性变换 | `iter().map().filter()` | O(n)，按需执行 |
| BFS | `VecDeque` | O(V + E) |

## 所有权与算法

算法可以接收借用而不取得容器所有权；需要产出新集合时再通过 `collect` 明确分配。示例图中的字符串切片与图共享生命周期，签名会把这一约束暴露给调用者。

## 综合示例

<<< ../../../demos/rust/algorithms_demo.rs

<DockerOutput image="rust:1.75-alpine" sourceFile="demos/rust/algorithms_demo.rs" />
