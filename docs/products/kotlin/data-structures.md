# Kotlin 数据结构深度解析

Kotlin 在 JVM 集合生态之上，提供了**不可变性优先（Read-Only vs Mutable）与空安全契约**：
* **只读视图与可变集合**：`List<T>`（只读）与 `MutableList<T>` 明确区分数据边界。
* **原生双端队列与扩展函数**：提供 `ArrayDeque` 与丰富的集合操作符（`filter`、`map`、`associate`）。

---

## 📊 核心结构特征

| 容器接口 | Kotlin 标准实现 | 典型复杂度 | 特征与场景 |
| :--- | :--- | :--- | :--- |
| **`List<T>`** | 只读接口 (底层 `java.util.ArrayList`) | 索引 $O(1)$ | 不可变引用传递 |
| **`MutableList<T>`** | 可变动态数组 | 追加均摊 $O(1)$ | 内部数据修改 |
| **`ArrayDeque<T>`** | 双端循环数组 | 首尾操作 $O(1)$ | 栈与队列的首选 |

---

## 1. 线性结构：`MutableList` 与 `ArrayDeque`

<<< ../../../demos/kotlin/dsa/linear/DynamicArrayDemo.kt

<DockerOutput image="hello-lang-kotlin:2.0.10" sourceFile="demos/kotlin/dsa/linear/DynamicArrayDemo.kt" />
