# Lisp 家族算法

算法示例固定执行稳定排序、二分查找和 BFS。结果相同，表达方式则体现方言个性：Common Lisp 的 LOOP 与通用序列、Scheme 的尾递归、Clojure 的 `loop/recur` 与持久化队列、Racket 的 `for` 形式与不可变 Set。

| 算法 | 时间 | 额外空间 | 注意点 |
| --- | --- | --- | --- |
| 稳定比较排序 | O(n log n) | 依实现 | 比较器必须满足严格顺序 |
| 二分查找 | O(log n) | O(1) 或递归深度 | 输入必须已按同一顺序排序 |
| BFS | O(V + E) | O(V) | 队列与 visited Set 缺一不可 |

## Common Lisp

<<< ../../../demos/lisp/common_lisp_algorithms_demo.lisp

<DockerOutput image="clfoundation/sbcl:2.6.8" sourceFile="demos/lisp/common_lisp_algorithms_demo.lisp" />

## Scheme

<<< ../../../demos/lisp/scheme_algorithms_demo.scm

<DockerOutput image="hello-lang-guile:3.0.11" sourceFile="demos/lisp/scheme_algorithms_demo.scm" />

## Clojure

<<< ../../../demos/lisp/clojure_algorithms_demo.clj

<DockerOutput image="hello-lang-clojure:1.12.5" sourceFile="demos/lisp/clojure_algorithms_demo.clj" />

## Racket

<<< ../../../demos/lisp/racket_algorithms_demo.rkt

<DockerOutput image="hello-lang-racket:9.3" sourceFile="demos/lisp/racket_algorithms_demo.rkt" />

Lua 使用 1 基索引，因此相同二分查找目标返回 4；四个 Lisp 示例使用 0 基向量索引，返回 3。这个差异属于语言接口，不是算法错误。

