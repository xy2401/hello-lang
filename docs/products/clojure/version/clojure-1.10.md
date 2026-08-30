# Clojure 1.10

**官方资料**：[Clojure 1.10 Release](https://clojure.org/news/2018/12/17/clojure110)。

发布日期：1.10.0 于 2018-12-17 发布。该版本重点改进错误报告、Java 互操作和运行时诊断，使编译、宏展开与执行阶段的异常更容易定位。

## 迁移影响

从 1.8 或 1.9 迁移时，应同时检查 JDK 支持范围、依赖库的 Clojure 下限和已编译 class。不要复用旧 AOT 目录；清理后重新编译，并比较异常处理和日志工具对新错误数据的兼容性。

```bash
clojure -M -e '(println (clojure-version))'
clojure -M -e '(try (/ 1 0) (catch Exception e (println (ex-message e))))'
```

资料核对日期：2026-08-27。
