# Rust 数据结构深度解析

Rust 的数据结构体系不仅描述内存布局，还与**所有权（Ownership）、生命周期（Lifetimes）和借用检查器（Borrow Checker）**深度交织：
* **零成本抽象与安全内存**：容器默认拥有其元素，离开作用域自动析构，杜绝空悬指针与内存泄漏。
* **现代代数数据类型**：利用 `enum` 与 `Option<T>`/`Result<T, E>` 精确建模树与链式节点，`Box<T>` 规避递归类型无限大小限制。

---

## 📊 核心容器特征矩阵

| 容器类型 | 内存布局 | 典型复杂度 | 所有权与借用特征 | 最佳实践场景 |
| :--- | :--- | :--- | :--- | :--- |
| **`Vec<T>`** | 堆上连续内存 | 随机访问 $O(1)$，尾部追加均摊 $O(1)$ | 单一拥有者，切片 `&[T]` 借用 | 默认通用线性集合 |
| **`VecDeque<T>`** | 环形分段缓冲区 | 首尾插入与弹出 $O(1)$ | 双端拥有，两端高效扩展 | 任务队列、BFS 工作列表 |
| **`HashMap<K, V>`** | SipHash 安全哈希表 | 增删查平均 $O(1)$ | Key 需实现 `Eq + Hash` | 高速键值对查询 |
| **`BTreeMap<K, V>`** | B 树（有序节点） | 增删查 $O(\log n)$ | Key 需实现 `Ord` | 有序遍历、范围查找 (`range`) |
| **`BinaryHeap<T>`** | 大顶堆（数组组织） | 堆顶 $O(1)$，入堆出堆 $O(\log n)$ | 元素需实现 `Ord`，配合 `Reverse` 变小顶堆 | 优先调度、Dijkstra 最短路径 |

---

## 1. 动态数组与双端队列 (`Vec` / `VecDeque`)

展示 Rust `Vec` 的容量预分配、借用切片与求和迭代器：

<<< ../../../demos/rust/dsa/linear/dynamic_array.rs

<DockerOutput image="rust:1.75-alpine" sourceFile="demos/rust/dsa/linear/dynamic_array.rs" />

---

## 2. 优先队列与二叉堆 (`BinaryHeap`)

展示 Rust 标准库 `BinaryHeap` 的最大值优先弹出与安全 `Option` 模式：

<<< ../../../demos/rust/dsa/trees/heap.rs

<DockerOutput image="rust:1.75-alpine" sourceFile="demos/rust/dsa/trees/heap.rs" />
