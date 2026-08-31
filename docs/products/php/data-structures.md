# PHP 数据结构

PHP 的 `array` 是保持插入顺序的哈希表，可同时表达列表和映射。对队列、堆等语义明确的结构，应优先考虑 SPL 容器。

## 核心容器

| 结构 | 类型 | 典型复杂度 |
| --- | --- | --- |
| 有序映射/列表 | `array` | 键查询平均 O(1) |
| 队列 | `SplQueue` | 两端操作 O(1) |
| 优先队列 | `SplPriorityQueue` | 插入、弹出 O(log n) |
| 对象树 | Readonly 类 + 子节点数组 | 遍历 O(n) |

## PHP 的独特之处

- 数字键与字符串键可以共存，但自动转换规则需要谨慎处理。
- 写时复制让数组按值传递易于使用，修改大型数组时仍需关注复制成本。
- Readonly 类能把节点的引用关系固定下来，但内部引用对象仍有自己的可变性。

## 综合示例

<<< ../../../demos/php/data_structures_demo.php

<DockerOutput image="php:8.3-alpine" sourceFile="demos/php/data_structures_demo.php" />
