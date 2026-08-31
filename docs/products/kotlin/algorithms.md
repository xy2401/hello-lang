# Kotlin 算法

Kotlin 的集合操作符适合表达变换流水线；需要惰性处理时可以切换为 Sequence，需要精确控制分配时则使用可变集合和显式循环。

## 常用能力

| 操作 | API | 复杂度 |
| --- | --- | --- |
| 多级排序 | `sortedWith` | O(n log n) |
| 二分查找 | `List.binarySearch` | O(log n) |
| 惰性变换 | `asSequence` | 按消费量执行 |
| BFS | `ArrayDeque` + MutableSet | O(V + E) |

## 语言特性

扩展函数让算法像容器成员一样调用，但不会改变底层类型。Sequence 可减少中间集合，短小数据上则不一定比直接集合操作更快。

## 综合示例

<<< ../../../demos/kotlin/algorithms_demo.kt

<DockerOutput image="hello-lang-kotlin:2.0.10" sourceFile="demos/kotlin/algorithms_demo.kt" />
