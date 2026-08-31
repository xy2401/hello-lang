# Lisp 算法实战全景

Lisp 的算法实现充分展现了**函数式递归与一等函数（First-Class Functions）**的威力：
* **纯函数式快速排序**：使用 `remove-if` 与 `remove-if-not` 优雅解构列表。
* **递归分治**：天然契合树与图的分治算法结构。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Functional QuickSort | 列表谓词划分、函数式 `append` | $O(n \log n)$ | $O(n)$ |

---

## 1. 函数式快速排序 (Functional QuickSort)

<<< ../../../demos/lisp/dsa/sorting/quick_sort.lisp

<DockerOutput image="clfoundation/sbcl:2.6.8" sourceFile="demos/lisp/dsa/sorting/quick_sort.lisp" />
