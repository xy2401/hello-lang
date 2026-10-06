# Clojure 总览

Clojure 是运行在 JVM 上的 Lisp，强调不可变数据、持久化集合、函数组合和 REPL 驱动开发。代码由列表与数据结构表达，宏可以在语言自身的数据模型上转换程序。

```clojure
(defn greet [name]
  (str "Hello, " name))

(->> [1 2 3 4]
     (filter even?)
     (map #(* % %))
     println)
```

Clojure 与 Java 类库直接互操作。浏览器实验预取官方 Clojure CLI 的基础依赖，并与其他 JVM 语言共享 OpenJDK 25。

## 能力边界

- REPL 适合增量构造系统，但可重复启动仍要落入源码、测试和 `deps.edn`。
- 默认不可变不等于没有状态；Atom、Ref、Agent 与 Java 对象承担不同协调语义。
- Clojure CLI、语言版本和项目依赖是不同版本线，应分别记录。

## 版本阅读范围

[完整版本目录](./version/)收录本仓库已有专题（如 clojure-1.10、clojure-1.11、clojure-1.12）。这些是教学与兼容性对照入口；运行环境的具体版本以安装页、工作台或采集证据为准。

## 推荐学习路线

[安装与环境](./install) → [基础语法](./basic) → [完整版本目录](./version/)。先完成最小示例，再阅读版本差异。

## 实验入口与范围

[容器浏览器工作台](/playground/container-clojure)提供 RISC-V 容器体验，首次使用可能需要较大的运行时下载，先阅读页面资源说明。 [Docker 验证证据](./docker-tooling)展示已有采集结果与缺口。
