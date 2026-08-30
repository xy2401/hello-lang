# Scala 总览

Scala 将面向对象与函数式编程结合在 JVM 上，拥有静态类型、模式匹配、代数数据类型风格和完整 Java 互操作。Scala 3 通过 `given/using`、枚举、扩展方法与缩进语法继续整理语言模型。

```scala
enum Result[+A]:
  case Ok(value: A)
  case Error(message: String)

@main def hello() = println(Result.Ok("Scala"))
```

浏览器环境使用 Scala 3.3 LTS，并与 Java、Kotlin、Groovy、Clojure共享 OpenJDK 25 资产。

## 使用边界

- 新服务通常选择 Scala 3；维护 Spark 等生态项目时仍可能需要 Scala 2.12/2.13。
- Scala 版本号同时关系到源码、二进制后缀和依赖坐标，不能只替换 CLI。
- 小示例可直接使用 `scalac`，工程项目应由 sbt、Mill 或 Scala CLI 管理。
