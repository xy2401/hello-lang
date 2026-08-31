# Lisp 数据结构深度解析

Lisp 家族（Common Lisp, Scheme, Clojure, Racket）在数据结构上以**同像性（Homoiconicity）与表（List）/可调向量（Vector）**为核心：
* **Cons Cell 与链表**：通过 `(car . cdr)` 构建代码与数据的统一表示。
* **可调动态向量 (`make-array`)**：Common Lisp 提供了支持动态扩展的强类型原生向量。

---

## 📊 核心结构与操作

| 结构 | Lisp 表达 | 典型复杂度 | 特征 |
| :--- | :--- | :--- | :--- |
| **可调向量** | `make-array :adjustable t` | 索引 $O(1)$，`vector-push-extend` 均摊 $O(1)$ | 动态数组 |
| **单向链表** | `cons` / `list` | 头部操作 $O(1)$ | S 表达式天然同构 |

---

## 1. 线性结构：Common Lisp 动态扩展向量

<<< ../../../demos/lisp/dsa/linear/dynamic_array.lisp

<DockerOutput image="clfoundation/sbcl:2.6.8" sourceFile="demos/lisp/dsa/linear/dynamic_array.lisp" />
