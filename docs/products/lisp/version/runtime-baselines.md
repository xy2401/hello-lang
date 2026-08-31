# Lisp 标准与运行时基线

## 发布信息与标准状态

Common Lisp 的可移植语义以 ANSI X3.226-1994 为标准状态，SBCL 2.6.8 是本项目采用的具体实现。Scheme 以 R7RS-small 为标准路线，示例由 GNU Guile 3.0.11 执行。Clojure 1.12.5 通过固定 Maven 坐标运行于 JVM，Racket 9.3 使用 Chez Scheme 后端。

官方资料分别见 [SBCL](https://www.sbcl.org/)、[GNU Guile](https://www.gnu.org/software/guile/)、[Clojure Releases](https://clojure.org/releases/downloads) 与 [Racket Downloads](https://download.racket-lang.org/)。标准的发布时间与实现发布日期属于不同维度，部署记录必须同时保存二者。

## 迁移影响

实现迁移前应盘点 Package/模块系统、Reader 扩展、宏依赖、FFI、线程 API 与实现专属声明。Common Lisp 标准代码不能自动保证所有 SBCL 扩展可移植；Scheme 代码还必须确认目标报告与 SRFI；Clojure 需要同步 JVM 和依赖坐标；Racket 则要确认 `#lang` 与所需 Package。

资料核对日期：2026-08-27。

