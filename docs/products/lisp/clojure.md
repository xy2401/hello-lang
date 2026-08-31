# Clojure

Clojure 是运行在 JVM 上的 Lisp，默认数据模型强调持久化不可变集合。Sequence 把“如何遍历”与具体容器解耦，Transducer 把变换过程从输入输出上下文中解耦；Atom、Ref、Agent 为不同协调模型提供显式状态容器。

## 独特能力

- Vector、Map、Set 的更新返回新值，并通过结构共享控制成本。
- `seq`、惰性序列和 Transducer 统一批处理与流式变换。
- Atom 适合独立同步状态，Ref 配合 STM 协调多个引用。
- Java 类、方法和接口可直接互操作，同时仍保留 Lisp 宏系统。

<<< ../../../demos/lisp/clojure_demo.clj

<DockerOutput image="hello-lang-clojure:1.12.5" sourceFile="demos/lisp/clojure_demo.clj" />

命名空间声明代码组织边界；`deps.edn` 声明依赖坐标。本项目固定 `org.clojure/clojure` 1.12.5，而不是依赖基础镜像中偶然存在的版本。

