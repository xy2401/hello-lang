# Ruby 数据结构

Ruby 以 Array、Hash 和 Enumerable 构成统一的集合体验，Set 作为标准库补充去重语义，Data/Struct 适合声明轻量节点。

## 核心容器

| 结构 | 类型 | 典型复杂度 |
| --- | --- | --- |
| 动态数组 | `Array` | 索引 O(1)，尾部追加摊销 O(1) |
| 有序映射 | `Hash` | 查询平均 O(1) |
| 集合 | `Set` | 查询平均 O(1) |
| 值节点 | `Data.define` / `Struct` | 访问 O(1) |

## Ruby 的独特之处

- Hash 保持插入顺序，键的 `hash` 与 `eql?` 共同定义身份。
- 所有容器都能通过 Enumerable 获得一致的遍历和变换能力。
- `Data.define` 创建不可变值对象，比开放式 Hash 更适合固定结构。

## 综合示例

<<< ../../../demos/ruby/data_structures_demo.rb

<DockerOutput image="ruby:3.3-alpine" sourceFile="demos/ruby/data_structures_demo.rb" />
