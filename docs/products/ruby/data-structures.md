# Ruby 数据结构深度解析

Ruby 将“万物皆对象”与强大的 `Enumerable` 模块完美结合：
* **原生动态数组 (`Array`)**：既可作为随机访问列表，也可原生作为栈 (`push`/`pop`) 和双端队列 (`unshift`/`shift`)。
* **哈希与集合 (`Hash` / `Set`)**：支持确定插入顺序与任意可哈希对象键。

---

## 📊 核心容器特征

| 容器 | Ruby 类型 | 典型复杂度 | 特征 |
| :--- | :--- | :--- | :--- |
| **动态数组** | `Array` | 索引 $O(1)$，两端操作 $O(1)$ | 灵活内置栈与队列操作 |
| **哈希字典** | `Hash` | 增删查平均 $O(1)$ | 插入有序，支持默认值块 |
| **集合** | `Set` | 增删查平均 $O(1)$ | 集合论运算 |

---

## 1. 线性结构：Ruby `Array` 动态栈与双端操作

<<< ../../../demos/ruby/dsa/linear/dynamic_array.rb

<DockerOutput image="ruby:3.3-alpine" sourceFile="demos/ruby/dsa/linear/dynamic_array.rb" />
