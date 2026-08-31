# TypeScript 算法实战全景

TypeScript 的算法实现充分利用了**高阶函数（Higher-Order Functions）、比较器函数（Comparators）与类型推导**：
* **强类型算法签名**：通过比较器 `compare: (a: T, b: T) => number` 实现真正的通用泛型算法。
* **不可变状态转换**：借助 `filter`、`map`、展开运算符 `...` 编写纯函数风格的算法流程。

---

## 📊 核心算法与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Generic QuickSort / `Array.prototype.sort` | 泛型比较器、递归分治 / V8 TimSort | $O(n \log n)$ | $O(n)$ |
| **查找** | `Array.prototype.indexOf` / `find` | 谓词匹配查找 | $O(n)$ | $O(1)$ |
| **图/树遍历** | DFS / BFS | 递归 / 数组队列操作 | $O(V + E)$ | $O(V)$ |

---

## 1. 泛型排序算法：快速排序 (QuickSort)

利用泛型类型 `<T>` 与自定义比较器实现不可变风格快速排序：

<<< ../../../demos/typescript/dsa/sorting/quick_sort.ts

<DockerOutput image="node:20-alpine" sourceFile="demos/typescript/dsa/sorting/quick_sort.ts" />
