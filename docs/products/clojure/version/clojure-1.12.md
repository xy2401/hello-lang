# Clojure 1.12

**官方资料**：[Clojure 1.12 Release](https://clojure.org/news/2024/09/05/clojure-1-12-0)。

发布日期：1.12.0 于 2024-09-05 发布；1.12 系列仍由后续维护版本持续修正。该版本改善 Java 方法引用与函数接口互操作，并继续完善命令行工具和标准库行为。

## 迁移影响

从 1.11 升级通常保持源码兼容，但应重新验证 Java 互操作、反射警告、AOT 产物和宏展开结果。项目语言版本由 `deps.edn` 决定，升级 Clojure CLI 本身不会自动完成迁移。

```bash
clojure -Sdescribe
clojure -M -e '(println (clojure-version))'
clojure -Stree
```

资料核对日期：2026-08-27。
