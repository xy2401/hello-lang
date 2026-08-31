# Java 算法

Java 的算法通常围绕集合接口、`Comparator` 和 Stream 管道组织。需要原地修改时使用集合算法；需要声明式转换时再选择 Stream。

## 常用能力

| 操作 | API | 复杂度 |
| --- | --- | --- |
| 比较排序 | `List.sort(Comparator)` | O(n log n) |
| 二分查找 | `Collections.binarySearch` | O(log n)，前提是输入已排序 |
| 广度优先遍历 | `ArrayDeque` + `Set` | O(V + E) |
| Top-K | `PriorityQueue` | O(n log k) |

## 语言特性

`Comparator.comparing` 可以组合多级排序规则，Record 的访问器可直接作为方法引用。图遍历优先使用 `ArrayDeque`，避免把 `LinkedList` 当作默认队列。

## 综合示例

下面按分数降序、姓名升序排列 Record，并演示二分查找和 BFS。

<<< ../../../demos/java/AlgorithmsDemo.java

<DockerOutput image="eclipse-temurin:21-jdk-alpine" sourceFile="demos/java/AlgorithmsDemo.java" />
