# Ruby 算法实战全景

Ruby 算法以**简洁优雅的 Block 闭包与链式调用**著称：
* **`select` 过滤与分治**：用极少行数实现清晰无歧义的快速排序。
* **`downto` 逆向步进**：优雅表达动态规划的状态倒序压缩。

---

## 📊 算法专题与复杂度

| 算法专题 | 典型问题 / 算法 | 核心思想 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **排序** | Functional QuickSort / `sort` | Block 谓词划分 / C 内部排序 | $O(n \log n)$ | $O(n)$ |
| **动态规划** | 0/1 背包问题 | `downto` 迭代倒序压缩 | $O(N \cdot W)$ | $O(W)$ |

---

## 1. 快速排序算法 (QuickSort with Blocks)

<<< ../../../demos/ruby/dsa/sorting/quick_sort.rb

<DockerOutput image="ruby:3.3-alpine" sourceFile="demos/ruby/dsa/sorting/quick_sort.rb" />

---

## 2. 动态规划：0/1 背包问题

<<< ../../../demos/ruby/dsa/dp/knapsack.rb

<DockerOutput image="ruby:3.3-alpine" sourceFile="demos/ruby/dsa/dp/knapsack.rb" />
