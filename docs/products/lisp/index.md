# Lisp 家族 总览 {#lisp-家族}

Lisp 不是一种单独的语言，而是一条以 S-expression 为共同外形、以“代码即数据”为核心思想的语言谱系。本分卷并列介绍 Common Lisp、Scheme、Clojure 与 Racket：它们共享列表、符号、Reader、Evaluator、REPL 和宏，却在对象系统、不可变数据、运行时与语言扩展方式上走出了不同路线。

## 一段表达式的旅程

```lisp
(mapcar (lambda (value) (* value value)) '(1 2 3))
```

Reader 先把文本读成列表和符号组成的数据，Evaluator 再按照当前语言的求值规则执行它。宏介于两者之间：接收语法数据并生成新语法。这种同像性让 Lisp 特别适合 DSL、编译器、程序变换和交互式探索。

## 四条学习路线

| 方言 | 重点 | 运行基线 |
| --- | --- | --- |
| [Common Lisp](./common-lisp) | ANSI 标准、CLOS、Condition/Restart、Package | SBCL 2.6.8 |
| [Scheme](./scheme) | 最小核心、正确尾调用、卫生宏 | GNU Guile 3.0.11 |
| [Clojure](./clojure) | 持久化集合、Sequence、并发引用、JVM | Clojure 1.12.5 |
| [Racket](./racket) | `#lang`、Contract、Syntax Object、语言导向编程 | Racket 9.3 |

先读[基础语法](./basic)，再通过[数据结构](./data-structures)与[算法](./algorithms)横向比较同一任务。标准、方言和实现版本的关系见[版本与方言路线](./version/)。


## 适用边界

本卷比较多个 Lisp 方言；Reader、宏、模块和运行实现不同，不能把 Common Lisp、Scheme、Clojure、Racket 的代码混用。

## 实验入口与范围

本产品没有统一的浏览器运行时；请从[基础语法](./basic)选择本卷介绍的方言与解释器，在本机运行数据结构和算法示例。 [Docker 验证证据](./docker-tooling)展示已有采集结果与缺口。
