# Lisp 版本与方言路线

Lisp 家族必须同时记录“语言标准”和“具体实现版本”。前者规定可移植语义，后者决定编译器、运行时、扩展库、性能与部署方式。

| 路线 | 标准 / 语言版本 | 本项目实现基线 | 说明 |
| --- | --- | --- | --- |
| Common Lisp | ANSI Common Lisp（ANSI X3.226-1994） | SBCL 2.6.8 | ANSI 标准长期稳定，SBCL 独立发布 |
| Scheme | R7RS-small | GNU Guile 3.0.11 | Guile 同时提供扩展模块与 SRFI |
| Clojure | Clojure 1.12.5 | JVM + tools.deps | 语言由项目版本与依赖坐标确定 |
| Racket | Racket 9.3 | Chez Scheme 后端 | `#lang` 还能选择不同子语言 |

- [标准与运行时基线](./runtime-baselines)

迁移时应先列出非标准 API、Reader 扩展、宏依赖和 FFI，再更换实现。不要把 SBCL 版本当作 Common Lisp 标准版本，也不要假设所有 Scheme 都支持同一模块系统。

