# Clojure 编译与运行

官方命令参考见 [Clojure CLI Reference](https://clojure.org/reference/clojure_cli) 与 [Deps and CLI Guide](https://clojure.org/guides/deps_and_cli)。

```bash
java --version
clojure --version
clojure -Sdescribe
```

## 表达式、脚本与 REPL

```bash
clojure -M -e '(println "Hello Clojure")'
clojure -M hello.clj Ada
clojure
```

```clojure
;; hello.clj
(println "Hello" (or (first *command-line-args*) "world"))
```

Control-D 退出 REPL。未捕获异常会使非交互命令失败；脚本需要明确退出时使用 `(System/exit 2)`，随后通过 `echo $?` 检查。

## 命名空间入口

```clojure
(ns hello.core)
(defn -main [& args]
  (println "Hello" (first args)))
```

```bash
clojure -M -m hello.core JVM
clojure -X:deps tree
clojure -Stree
```

`-M` 启动 `clojure.main`，`-X` 调用数据函数，`-T` 运行独立工具。三者的参数模型不同，不应把旧 `-A` 示例机械迁移为任意一种。

## AOT 与 Java

```bash
mkdir -p classes
clojure -M -e '(binding [*compile-path* "classes"] (compile (quote hello.core)))'
java -cp "classes:$(clojure -Spath)" clojure.main -m hello.core JVM
```

AOT 生成 JVM class，但仍依赖 Clojure 和项目 classpath。日常开发优先源码加载；只有启动、Java 调用或发行约束明确时才启用 AOT。

资料核对日期：2026-08-28。
