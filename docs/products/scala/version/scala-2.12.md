# Scala 2.12

**官方资料**：[Scala 2.12 release notes](https://www.scala-lang.org/news/2.12.0/)。

发布日期：Scala 2.12.0 于 2016 年发布，面向 Java 8 字节码和 lambda，并长期作为 Spark 等生态的重要二进制线。

## 迁移影响

升级到 2.13 或 3.x 前先盘点只发布 `_2.12` 的库、编译器插件和框架约束。数据平台项目应服从发行版指定的 Scala 版本。

```bash
scala -version
sbt dependencyTree
```

资料核对日期：2026-08-27。
