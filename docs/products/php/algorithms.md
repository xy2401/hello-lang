# PHP 算法

PHP 提供丰富的数组函数；当算法需要明确的队列或堆语义时，SPL 能避免昂贵的数组头部操作。

## 常用能力

| 操作 | API/实现 | 复杂度 |
| --- | --- | --- |
| 自定义排序 | `usort` | O(n log n) |
| 二分查找 | 索引循环 | O(log n) |
| BFS | `SplQueue` | O(V + E) |
| 映射/过滤 | `array_map` / `array_filter` | O(n) |

## 语言特性

三路比较运算符 `<=>` 很适合构建多级排序规则。`usort` 会重建数字索引，因此依赖原键时应选择保留键的排序函数。

## 综合示例

<<< ../../../demos/php/algorithms_demo.php

<DockerOutput image="php:8.3-alpine" sourceFile="demos/php/algorithms_demo.php" />
