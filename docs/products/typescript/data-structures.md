# TypeScript 数据结构深度解析

TypeScript 在底层 JavaScript 运行时数据结构之上，赋予了强大的**静态类型系统、泛型参数与不可变数据契约**：
* **编译期类型守卫与泛型**：通过 `<T>`、`ReadonlyArray<T>`、`ReadonlyMap<K, V>` 消除类型转换错误，保证容器不变量。
* **现代 ES6+ 容器体系**：`Array`、`Map`、`Set`、`WeakMap`、`TypedArray`（类型化数组）构成了现代前端与 Node.js 服务端的核心数据基石。

---

## 📊 核心结构特征矩阵

| 容器结构 | TypeScript 类型签名 | 时间复杂度 | 特征与场景 |
| :--- | :--- | :--- | :--- |
| **动态数组** | `T[]` / `Array<T>` | 索引 $O(1)$，`push`/`pop` 均摊 $O(1)$ | 通用序列容器，支持不可变扩展 (`[...arr]`) |
| **键值映射** | `Map<K, V>` | 增删查平均 $O(1)$ | 键类型不受限（支持对象/函数作为 Key） |
| **唯一集合** | `Set<T>` | 增删查平均 $O(1)$ | 快速元素去重与存在性校验 |
| **判别联合树** | `type TreeNode<T>` (带 `kind` 标签) | 遍历 $O(n)$ | 编译器穷尽性检查 (Exhaustiveness checking) |

---

## 1. 线性结构：泛型动态数组 (`DynamicArray<T>`)

封装类型安全的泛型动态数组类：

<<< ../../../demos/typescript/dsa/linear/dynamic_array.ts

<DockerOutput image="node:20-alpine" sourceFile="demos/typescript/dsa/linear/dynamic_array.ts" />
