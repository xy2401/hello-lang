# Scala 2.13

**官方资料**：[Scala 2.13 release notes](https://www.scala-lang.org/news/2.13.0/)。

发布日期：Scala 2.13.0 于 2019 年发布，重新设计集合库并成为 Scala 2 的主要维护线，生态中仍有大量 `_2.13` 制品。

## 迁移影响

从 2.12 迁移重点是集合 API、Java converters、宏与依赖二进制后缀。不能把 `_2.12` 依赖直接放入 2.13 classpath。

```bash
scala -version
sbt evicted
```

资料核对日期：2026-08-27。
