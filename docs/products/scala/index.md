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

## 版本阅读范围

[完整版本目录](./version/)收录本仓库已有专题（如 scala-2.12、scala-2.13、scala-3.3）。这些是教学与兼容性对照入口；运行环境的具体版本以安装页、工作台或采集证据为准。

## 推荐学习路线

[安装与环境](./install) → [基础语法](./basic) → [完整版本目录](./version/)。先完成最小示例，再阅读版本差异。

## 实验入口与范围

[容器浏览器工作台](/playground/container-scala)提供 RISC-V 容器体验，首次使用可能需要较大的运行时下载，先阅读页面资源说明。 [Docker 验证证据](./docker-tooling)展示已有采集结果与缺口。
