# Lisp 家族数据结构

四个方言都以列表和符号见长，但“列表是否可变”“Map 的默认身份语义”“记录如何声明”并不相同。下面让四个运行时完成同一组确定性任务：列表、向量、Map、Set 与二叉树。

## 能力与复杂度

| 模型 | Common Lisp | Scheme / Guile | Clojure | Racket | 典型复杂度 |
| --- | --- | --- | --- | --- | --- |
| 顺序集合 | list、vector | list、vector | persistent list/vector | list、vector | 头部 O(1)，向量索引 O(1) |
| Map | hash-table、alist | hash-table、alist | persistent map | immutable/mutable hash | 查询平均 O(1) |
| Set | hash-table 或库 | SRFI / hash-table | persistent set | set | 查询平均 O(1) |
| 节点 | `defstruct` / CLOS | record | record | struct | 字段访问 O(1) |

Hash 容器的遍历顺序不构成接口；示例按显式键顺序打印，快照因此可以跨运行比较。

## Common Lisp：可变 cons 与通用序列

<<< ../../../demos/lisp/common_lisp_data_structures_demo.lisp

<DockerOutput image="clfoundation/sbcl:2.6.8" sourceFile="demos/lisp/common_lisp_data_structures_demo.lisp" />

## Scheme：最小核心与实现库

<<< ../../../demos/lisp/scheme_data_structures_demo.scm

<DockerOutput image="hello-lang-guile:3.0.11" sourceFile="demos/lisp/scheme_data_structures_demo.scm" />

## Clojure：持久化不可变集合

<<< ../../../demos/lisp/clojure_data_structures_demo.clj

<DockerOutput image="hello-lang-clojure:1.12.5" sourceFile="demos/lisp/clojure_data_structures_demo.clj" />

## Racket：不可变默认值与透明 Struct

<<< ../../../demos/lisp/racket_data_structures_demo.rkt

<DockerOutput image="hello-lang-racket:9.3" sourceFile="demos/lisp/racket_data_structures_demo.rkt" />

