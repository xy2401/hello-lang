# Java 数据结构

Java 通过集合接口分离“能力”与“实现”：业务代码通常依赖 `List`、`Map`、`Set`、`Queue`，再按访问顺序、排序要求和并发模型选择具体实现。

## 核心容器

| 结构 | 常用实现 | 典型复杂度 | 适用场景 |
| --- | --- | --- | --- |
| 动态数组 | `ArrayList` | 随机访问 O(1)，尾部追加摊销 O(1) | 默认顺序容器 |
| 哈希映射 | `HashMap` | 查询/更新平均 O(1) | 按键索引 |
| 有序映射 | `LinkedHashMap` / `TreeMap` | O(1) / O(log n) | 插入顺序或键排序 |
| 优先队列 | `PriorityQueue` | 插入、删除堆顶 O(log n) | 调度与 Top-K |

## Java 的独特之处

- 泛型让集合操作保持编译期类型安全，但运行时采用类型擦除。
- `record` 很适合表达不可变节点和值对象；递归结构仍需通过引用连接。
- 容器通常保存对象引用，值语义取决于对象的 `equals` 与 `hashCode` 实现。

## 综合示例

示例同时使用列表、保持插入顺序的映射、优先队列和泛型树节点。

<<< ../../../demos/java/DataStructuresDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/DataStructuresDemo.java" />
