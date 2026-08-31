# Lua 数据结构深度解析

Lua 的设计哲学是“唯一的复合数据结构”：
* **表 (Table)**：兼具数组（Array Part）与哈希字典（Hash Part）双重底层表示。
* **极低内存开销**：通过 1-based 连续整数键激活高速数组部分，提供与原生 C 数组媲美的访问速度。

---

## 📊 核心结构与操作

| 结构 | Lua 表达 | 典型复杂度 | 特征 |
| :--- | :--- | :--- | :--- |
| **数组** | 连续数字索引 Table | 索引 $O(1)$，`table.insert`/`remove` 尾部 $O(1)$ | 紧凑 C 数组底层 |
| **字典** | 字符串/对象键 Table | 增删查 $O(1)$ | 开放寻址哈希表 |

---

## 1. 线性结构：Lua Table 动态数组

<<< ../../../demos/lua/dsa/linear/dynamic_array.lua

<DockerOutput image="hello-lang-lua:5.5.1" sourceFile="demos/lua/dsa/linear/dynamic_array.lua" />
