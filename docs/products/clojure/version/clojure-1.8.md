# Clojure 1.8

**官方资料**：[Clojure 1.8 Release](https://clojure.org/news/2016/01/19/clojure-1-8)。

发布日期：1.8.0 于 2016-01-19 发布。该版本加入直接链接选项、字符串函数、socket REPL 等能力，是大量历史 JVM 应用仍可见的重要版本边界。

## 迁移影响

迁往 1.10 及以后版本时，优先盘点旧 JDK、Leiningen 插件、宏库和 AOT 产物。直接链接会影响 var 的动态替换语义，不应在未覆盖测试的情况下启用；socket REPL 也必须限制监听地址和访问权限。

```bash
clojure -M -e '(println (clojure-version))'
java -version
```

资料核对日期：2026-08-27。
