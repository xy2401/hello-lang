# Rust 数据结构

Rust 的容器不仅描述布局，还编码所有权、借用和线程安全边界。选择结构时必须同时考虑访问模式与元素生命周期。

## 核心容器

| 结构 | 类型 | 典型复杂度 |
| --- | --- | --- |
| 连续数组 | `Vec<T>` | 索引 O(1)，追加摊销 O(1) |
| 双端队列 | `VecDeque<T>` | 两端操作 O(1) |
| 映射 | `HashMap<K,V>` / `BTreeMap<K,V>` | 平均 O(1) / O(log n) |
| 最大堆 | `BinaryHeap<T>` | 插入、弹出 O(log n) |

## Rust 的独特之处

- 容器默认拥有其元素，借用检查器阻止悬垂引用和并发数据竞争。
- `enum` 可以精确建模树节点变体；`Box<T>` 用于打破递归类型的无限大小。
- `Reverse<T>` 能在不编写自定义堆的情况下反转排序方向。

## 综合示例

<<< ../../../demos/rust/data_structures_demo.rs

<DockerOutput image="rust:1.75-alpine" sourceFile="demos/rust/data_structures_demo.rs" />
