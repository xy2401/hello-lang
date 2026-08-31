# Rust 算法实战全景

Rust 的算法实现充分利用了**模式匹配、函数式迭代器适配器（Iterator combinators）与类型系统约束**：
* **无恐惧并发与纯函数**：迭代器惰性求值，支持无缝切换至 Rayon 数据并行计算。
* **内存安全与就地修改**：通过 `&mut [T]` 实现不产生多余拷贝的高性能就地排序与动态规划。

---

## 📊 算法专题与时间复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | In-Place QuickSort / `slice.sort` | 泛型分治、双指针可变切片拆分 (`split_at_mut`) | $O(n \log n)$ | $O(\log n)$ |
| **二分查找** | `slice.binary_search` | 单调切片二分，返回 `Result<usize, usize>` 插入点 | $O(\log n)$ | $O(1)$ |
| **动态规划** | 0/1 背包问题 | 迭代器 zip 遍历、反向就地滚动更新 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 排序算法：就地泛型快速排序 (QuickSort)

使用 `split_at_mut` 绕过借用检查限制，实现安全的原地快速排序：

<<< ../../../demos/rust/dsa/sorting/quick_sort.rs

<DockerOutput image="rust:1.75-alpine" sourceFile="demos/rust/dsa/sorting/quick_sort.rs" />

---

## 2. 动态规划：0/1 背包问题

利用 Rust 迭代器 `zip` 与反向区间 `(w..=capacity).rev()` 完成空间压缩状态转移：

<<< ../../../demos/rust/dsa/dp/knapsack.rs

<DockerOutput image="rust:1.75-alpine" sourceFile="demos/rust/dsa/dp/knapsack.rs" />
