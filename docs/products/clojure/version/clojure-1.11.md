# Clojure 1.11

**官方资料**：[Clojure 1.11 Release](https://clojure.org/news/2022/03/22/clojure-1-11-0)。

发布日期：1.11.0 于 2022-03-22 发布。该版本扩展函数参数表达能力，增加 `parse-long`、`parse-double` 等标准函数，并改进运行时与库的可用性。

## 迁移影响

从 1.10 升级前应检查依赖声明是否显式固定 Clojure，并在目标 JDK 上重新执行测试。新函数可能与项目自定义同名 var 发生遮蔽；编译告警、命名空间加载顺序和 AOT 结果也应纳入回归。

```bash
clojure -M -e '(println (clojure-version))'
clojure -M -e '(println (parse-long "42"))'
```

资料核对日期：2026-08-27。
