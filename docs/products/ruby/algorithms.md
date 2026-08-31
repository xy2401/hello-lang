# Ruby 算法

Ruby 算法强调可枚举对象与代码块。`sort_by` 先生成排序键，复杂规则通常比反复调用三路比较块更清晰。

## 常用能力

| 操作 | API | 复杂度 |
| --- | --- | --- |
| 按键排序 | `sort_by` | O(n log n) |
| 二分定位 | `bsearch` / `bsearch_index` | O(log n) |
| 惰性流水线 | `Enumerator::Lazy` | 按消费量执行 |
| BFS | Array 队列 + Hash 集合 | O(V + E) |

## 语言特性

Block 是 Ruby 算法 API 的核心扩展点。大型队列在生产代码中应避免频繁 `Array#shift` 搬移元素，可使用游标或专用队列实现。

## 综合示例

<<< ../../../demos/ruby/algorithms_demo.rb

<DockerOutput image="ruby:3.3-alpine" sourceFile="demos/ruby/algorithms_demo.rb" />
