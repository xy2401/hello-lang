# TypeScript 数据结构

TypeScript 的运行时结构来自 JavaScript，额外价值在于用泛型、只读接口和判别联合约束结构的不变量。

## 核心结构

| 结构 | TypeScript 表达 | 典型复杂度 |
| --- | --- | --- |
| 动态数组 | `T[]` / `ReadonlyArray<T>` | 索引 O(1)，尾部追加摊销 O(1) |
| 键值映射 | `Map<K, V>` / `ReadonlyMap<K, V>` | 平均 O(1) |
| 去重集合 | `Set<T>` | 平均 O(1) |
| 递归树 | 判别联合 + `readonly` 子节点 | 遍历 O(n) |

## TypeScript 的独特之处

- 结构化类型关注对象具有什么成员，而不是声明自哪个类。
- `readonly` 是编译期约束；它不会自动冻结运行时对象。
- 判别联合可让 `switch` 对树节点进行穷尽检查。

## 综合示例

示例实现泛型栈，并组合只读映射与判别联合树。

<<< ../../../demos/typescript/data_structures_demo.ts

<DockerOutput image="node:20-alpine" sourceFile="demos/typescript/data_structures_demo.ts" />
