# Go 数据结构深度解析

Go 的数据结构设计推崇**极简、务实与高性能**：
* **核心原生原语**：以 `Slice`（切片）和 `Map` 覆盖 90% 的工程场景，切片作为轻量级三元组（`ptr`, `len`, `cap`）提供极高的缓存局部性。
* **现代泛型演进 (Go 1.18+)**：通过 `[T any]` 与 `[T comparable]` 为自定义树、优先队列、图结构提供编译期强类型安全，摆脱了以往 `interface{}` 带来的类型断言开销。

---

## 📊 核心结构与复杂度对照

| 数据结构 | Go 语言实现 | 典型复杂度 | 底层内存模型与机制 |
| :--- | :--- | :--- | :--- |
| **动态切片** | `[]T` / `make([]T, len, cap)` | 索引 $O(1)$，`append` 均摊 $O(1)$ | 连续数组指针，容量不足时按步长自动倍增扩容 |
| **哈希映射** | `map[K]V` | 查/增/删平均 $O(1)$ | 桶数组 (`hmap` + `bmap`)，增量哈希扩容 |
| **泛型二叉树** | `type TreeNode[T any] struct` | 增删查 $O(\log n)$ | 显式指针引用，结构紧凑 |
| **二叉堆** | `container/heap` 接口 | 堆顶 $O(1)$，Push/Pop $O(\log n)$ | 基于底层切片的隐式完全二叉树 |

---

## 1. 线性结构：切片与动态扩容 (`Slice`)

展示 Go 切片的 `make` 容量初始化、`append` 自动扩容与切片引用传递：

<<< ../../../demos/go/dsa/linear/dynamic_array.go

<DockerOutput image="golang:1.22-alpine" sourceFile="demos/go/dsa/linear/dynamic_array.go" />

---

## 2. 树形结构：泛型二叉搜索树 (Generic BST)

利用 Go 泛型参数 `[T any]` 实现强类型二叉搜索树的插入与递归检索：

<<< ../../../demos/go/dsa/trees/bst.go

<DockerOutput image="golang:1.22-alpine" sourceFile="demos/go/dsa/trees/bst.go" />
