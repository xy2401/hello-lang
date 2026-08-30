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
