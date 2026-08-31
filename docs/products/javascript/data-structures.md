# JavaScript 数据结构深度解析

JavaScript 作为现代 Web 与 Node.js 的基石，提供了高表达力与高度优化的运行时数据结构：
* **引擎级深度优化**：V8 引擎对 `Array` 采用了基于连续内存（Fast Elements）与字典模式（Dictionary Elements）的自适应转换机制。
* **现代 ES6+ 容器**：`Map` 与 `Set` 提供了任意键类型支持与常数级查找性能。

---

## 📊 核心结构与复杂度对照

| 容器类型 | 描述与底层模型 | 典型复杂度 | 最佳使用建议 |
| :--- | :--- | :--- | :--- |
| **`Array`** | 动态连续元素缓冲区 / 稀疏字典 | 索引 $O(1)$，尾部 `push`/`pop` $O(1)$ | 通用列表，头部 `shift`/`unshift` 为 $O(n)$ |
| **`Map`** | 确定插入顺序的哈希字典 | 增删查平均 $O(1)$ | 频繁增删键值对的首选 |
| **`Set`** | 唯一值集合 | 增删查平均 $O(1)$ | 元素去重与快速集合运算 |
| **二叉搜索树** | 自定义 Class 指针节点 | 增删查 $O(\log n)$ | 树形层次与区间搜索 |

---

## 1. 线性结构：动态数组与双端队列 (`Array` / 双端模拟)

<<< ../../../demos/javascript/dsa/linear/dynamic_array.js

<DockerOutput image="node:22-alpine" sourceFile="demos/javascript/dsa/linear/dynamic_array.js" />

---

## 2. 树形结构：二叉搜索树 (BST)

<<< ../../../demos/javascript/dsa/trees/bst.js

<DockerOutput image="node:22-alpine" sourceFile="demos/javascript/dsa/trees/bst.js" />
