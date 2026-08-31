# Kotlin 数据结构

Kotlin 在 JVM 集合上区分只读接口和可变接口，并通过 Data Class、Sealed 类型和空安全减少结构建模中的非法状态。

## 核心容器

| 结构 | 类型 | 典型复杂度 |
| --- | --- | --- |
| 只读/可变列表 | `List<T>` / `MutableList<T>` | 索引 O(1) |
| 映射/集合 | `Map<K,V>` / `Set<T>` | 平均 O(1) |
| 双端队列 | `ArrayDeque<T>` | 两端操作 O(1) |
| 优先队列 | JVM `PriorityQueue<T>` | O(log n) |

## Kotlin 的独特之处

- `List<T>` 表示只读视图，不保证底层对象真正不可变。
- Data Class 提供值相等、复制和解构；Sealed 接口让递归树的分支可穷尽。
- 空安全类型把“节点可能不存在”放进类型签名，而不是依赖运行时约定。

## 综合示例

<<< ../../../demos/kotlin/data_structures_demo.kt

<DockerOutput image="hello-lang-kotlin:2.0.10" sourceFile="demos/kotlin/data_structures_demo.kt" />
