# Java 数据结构深度解析

Java 集合框架（Java Collections Framework, JCF）是工业级面向对象架构与泛型抽象的典范：
* **接口与实现彻底分离**：定义统一高层接口（`List`、`Set`、`Map`、`Queue`、`Deque`），底层提供针对不同硬件局部性与并发模型的具体实现。
* **现代 Java (Java 21 LTS) 增强**：引入顺序集合（Sequenced Collections，如 `getFirst()`, `reversed()`）、`record` 极简节点建模与流式计算（Stream API）。

---

## 📊 核心集合实现对照

| 接口 | 核心实现类 | 底层原理 | 典型时间复杂度 | 最佳使用建议 |
| :--- | :--- | :--- | :--- | :--- |
| **`List`** | `ArrayList` | `Object[]` 动态扩容数组 | 索引 $O(1)$，尾插均摊 $O(1)$ | 绝大多数场景的首选序列容器 |
| **`Deque`** | `ArrayDeque` | 循环数组双端队列 | 首尾操作 $O(1)$ | 比 `Stack` 和 `LinkedList` 更快 |
| **`Map`** | `HashMap` | 数组 + 单链表 + 红黑树 (Treeify) | 增删查平均 $O(1)$ | 通用高性能键值映射 |
| **`Map`** | `TreeMap` | 经典红黑树 (Red-Black Tree) | 增删查 $O(\log n)$ | 范围查询、键有序遍历 |
| **`Queue`** | `PriorityQueue` | 动态数组小顶堆 (Binary Heap) | 堆顶 $O(1)$，插入/弹出 $O(\log n)$ | 任务调度、Top-K 统计 |

---

## 1. 线性结构：动态数组 (`ArrayList` 与 Stream 聚合)

展示 Java `ArrayList` 的泛型操作与基于 Stream 的函数式规约求和：

<<< ../../../demos/java/dsa/linear/DynamicArrayDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/dsa/linear/DynamicArrayDemo.java" />

---

## 2. 树堆结构：优先队列 (`PriorityQueue`)

展示 Java `PriorityQueue` 的小顶堆机制与堆顶元素检索：

<<< ../../../demos/java/dsa/trees/HeapDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/dsa/trees/HeapDemo.java" />
