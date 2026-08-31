# Scala 常用第三方库（Sbt/Maven）

## 📦 Web 框架

### Play Framework
官方链接： https://playframework.com/

全功能 MVC 框架，支持 Scala 和 Java。内置路由、表单处理、WebSocket、测试工具。类似 Rails/Django。

GitHub: [23k+ stars](https://github.com/playframework/playframework)

### Akka HTTP
官方链接： https://doc.akka.io/docs/akka-http/current/

响应式 HTTP 框架，基于 Akka 运行时。函数式风格，性能极高。适合高并发微服务、API Gateway。

GitHub: [5k+ stars](https://github.com/akka/akka-http)

### Http4s
官方链接： https://http4s.org/

函数式 Web 框架，纯 Scala 实现。ZIO/Cats Effect 集成，类型安全。现代 Scala Web 首选。

GitHub: [10k+ stars](https://github.com/http4s/http4s)

### Tapir
官方链接： https://tapiris.ai/

API 定义与实现框架，基于 endpoint 设计。自动生成 OpenAPI/Swagger文档，多后端支持。

GitHub: [9k+ stars](https://github.com/softwaremill/tapir)

## 🗄️ 数据库与 ORM

### Slick
官方链接： https://slick.bergmensch.net/

类型安全数据库访问，SQL 编译时验证。支持多种数据库，性能优秀。适合需要 SQL 控制权的场景。

GitHub: [7k+ stars](https://github.com/slick/slick)

### Doobie
官方链接： https://www.tuturito.org/doobie/

函数式 JDBC 库，基于 Cats Effect。流式处理、异步查询、事务管理。Monad 编程典范。

GitHub: [7k+ stars](https://github.com/tpolecat/doobie)

### Quill
官方链接： https://getquill.io/

SQL 编译时生成器，Query DSL。通过 Scala代码生成 SQL，类型安全。可嵌入任意表达式。

GitHub: [9k+ stars](https://github.com/scalalang/quill)

### Lakehouse
官方链接： https://docs.databricks.com/lakehouse.html

Spark SQL 集成，大数据处理。配合 Spark DataFrame API，处理 PB 级数据。

## 🧪 测试工具

### ScalaTest
官方链接： https://www.scalatest.org/

最流行的测试框架，支持 BDD/Matchers/Data-driven。JUnit兼容，与 sbt集成好。Scala 生态主流。

GitHub: [3k+ stars](https://github.com/scalatest/scalatest)

### Specs2
官方链接： https://specs2.github.io/

BDD 风格测试，渐进式复杂。语法灵活，可自定义 Matche rs。适合 TDD/BDD项目。

GitHub: [3k+ stars](https://github.com/specs2/specs2)

### Munit
官方链接： https://scalameta.org/munit/

快速单元测试，零依赖。语法类似 JUnit，速度快三倍。新项目首选。

GitHub: [2k+ stars](https://github.com/scalameta/munit)

### Mockito
官方链接： https://site.mockito.org/

Java Mock 框架，Scala 兼容使用。配合 ScalaTest/Munit，Mock 对象创建简单。

## 🔧 函数式编程库

### Cats
官方链接： https://typelevel.org/cats/

函数式编程核心库，提供 Monad/Either/Try等。类型类体系完善，Cats Effect 异步 IO 基础。

GitHub: [4k+ stars](https://github.com/typelevel/cats)

### ZIO
官方链接： https://zio.dev/

现代并发模型，无 Future Promise。Effect 系统强类型，错误处理优雅。新世代并发方案。

GitHub: [32k+ stars](https://github.com/zio/zio)

### Scalaz
官方链接： http://scalaz.org/

函数式工具箱，Monoid/Functor/Traversable等。比 Cats 更古老，学习曲线陡。部分被 Cats 取代。

### Monocle
官方链接： https://github.com/optics-dev/Monocle

光学库（Lenses），不可变数据更新。函数式 getter/setter组合，类型安全。

GitHub: [4k+ stars](https://github.com/optics-dev/Monocle)

## 🌐 异步与并发

### Akka
官方链接： https://akka.io/

并发与分布式系统框架，Actor 模型。Mailbox、Supervisor、Cluster 分布式支持。适合微服务架构。

GitHub: [18k+ stars](https://github.com/akka/akka)

### Future/Promise
官方链接： https://docs.scala-lang.org/overviews/core/futures.html

Scala 原生异步抽象，基于回调。与 Cats/ZIO结合使用，处理复杂异步流程。

### ZStream
官方链接： https://zio.github.io/zio/ref/zio.stream.zstream/

ZIO流处理，背压支持。管道式操作符，数据流处理利器。ZIO生态系统组件。

## ⚠️ 已废弃/不推荐

### Shapeless 0.x
标记：🔴 版本陈旧

旧版本函数式工具库，建议升级到最新版。新版有更大的改进和更好的类型推导。

替代方案：Shapeless 2.x/3.x + Cats

### Scalatags
标记：🔴 较少维护

HTML构建器，但维护速度慢。可用 HTMLDSL或Thymeleaf 替代，生态更多选择。

---

*注：部分经典库已过时，请参考现代替代方案*
