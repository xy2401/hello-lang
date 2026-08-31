# TypeScript 算法

TypeScript 可以把比较器、图节点和返回值都参数化，使通用算法在编译期保持输入输出一致。

## 常用模式

| 操作 | 实现方式 | 复杂度 |
| --- | --- | --- |
| 排序 | 复制数组后调用 `sort(compare)` | O(n log n) |
| 二分查找 | 泛型比较器 | O(log n) |
| BFS | `Map<T, readonly T[]>` + `Set<T>` | O(V + E) |

## 类型安全边界

比较器必须满足自反、反对称和传递关系。`readonly` 输入可以防止算法意外改写调用方数据，但生成的新数组仍可在内部排序。

## 综合示例

<<< ../../../demos/typescript/algorithms_demo.ts

<DockerOutput image="node:20-alpine" sourceFile="demos/typescript/algorithms_demo.ts" />
