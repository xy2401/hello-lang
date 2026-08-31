# JavaScript 数据结构

JavaScript 的容器都是动态对象。Array 适合有序序列，Map/Set 在键语义和迭代顺序上比普通 Object 更清晰，TypedArray 则面向二进制数据。

## 核心容器

| 结构 | 类型 | 典型复杂度 |
| --- | --- | --- |
| 动态数组/栈 | `Array` | 索引 O(1)，尾部操作摊销 O(1) |
| 映射与集合 | `Map` / `Set` | 平均 O(1) |
| 二进制缓冲区 | `Uint8Array` 等 | 索引 O(1)，长度固定 |
| 对象树 | 普通对象 + Array 子节点 | 遍历 O(n) |

## JavaScript 的独特之处

- Map 和 Set 按插入顺序迭代，并使用 SameValueZero 判断键相等。
- 私有字段 `#items` 在运行时也具有封装性，不只是命名约定。
- TypedArray 视图可以共享同一块 `ArrayBuffer` 内存。

## 综合示例

<<< ../../../demos/javascript/data_structures_demo.js

<DockerOutput image="node:22-alpine" sourceFile="demos/javascript/data_structures_demo.js" />
