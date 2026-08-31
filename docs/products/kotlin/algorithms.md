# Kotlin 算法实战全景

Kotlin 的算法实现兼具**函数式表达与高性能原地计算**：
* **泛型扩展函数**：利用 `<T : Comparable<T>> List<T>.quickSorted()` 实现优雅的链式调用。
* **状态压缩动态规划**：结合 `IntArray` 原生数组与 `maxOrNull` 高阶函数。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Functional QuickSort | 泛型扩展函数、列表过滤划分 | $O(n \log n)$ | $O(n)$ |
| **动态规划** | 0/1 背包问题 | `IntArray` 空间压缩 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 函数式快速排序 (Extension Function QuickSort)

<<< ../../../demos/kotlin/dsa/sorting/QuickSortDemo.kt

<DockerOutput image="hello-lang-kotlin:2.0.10" sourceFile="demos/kotlin/dsa/sorting/QuickSortDemo.kt" />

---

## 2. 动态规划：0/1 背包问题

<<< ../../../demos/kotlin/dsa/dp/KnapsackDemo.kt

<DockerOutput image="hello-lang-kotlin:2.0.10" sourceFile="demos/kotlin/dsa/dp/KnapsackDemo.kt" />
