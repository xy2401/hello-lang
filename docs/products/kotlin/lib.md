# Kotlin 常用外部依赖库（Maven/Gradle）

## 📦 Web 框架

### Spring Boot + Kotlin
官方链接： https://spring.io/projects/spring-boot

JVM后端主流框架，完美支持Kotlin语法特性。协程、扩展函数、Data Class 天然契合。结合 Spring Security实现认证授权。

GitHub: [30k+ stars](https://github.com/spring-projects/spring-boot)

### Ktor
官方链接： https://ktor.io/

JetBrains 开发的轻量级异步 Web 框架。支持 Client/Server双端，类似 Node.js Express。性能优秀，适合微服务。

GitHub: [20k+ stars](https://github.com/ktorio/ktor)

### Exposed
官方链接： https://github.com/JetBrainsExposed/exposed

JetBrains 原生 SQL 库，类型安全。DSL 语法优雅，与 Ktor/Spring集成方便。适合需要 SQL 控制权的场景。

GitHub: [10k+ stars](https://github.com/JetBrainsExposed/exposed)

## 🗄️ 数据库与 ORM

### Hibernate/JPA
官方链接： https://hibernate.org/orm/

Java生态ORM，Kotlin可完全复用。配合 KSP代码生成器，减少样板代码。Enterprise级别稳定。

GitHub: [5k+ stars](https://github.com/hibernate/hibernate-jpa)

### SQLDelight
官方链接： https://cashapp.github.io/sqldelight/

类型安全 SQL，编译时验证查询。支持多平台（iOS/Android/Web）。SQLite首选，PostgreSQL MySQL 也有驱动。

GitHub: [9k+ stars](https://github.com/cashapp/sqldelight)

### Armeria
官方链接： https://armeria.io/

gRPC 客户端和服务端框架，基于 Netty。高性能、自动文档生成（OpenAPI）。适合微服务架构。

GitHub: [25k+ stars](https://github.com.line/armeria)

## 🤖 Android 开发

### Jetpack Compose
官方链接： https://developer.android.com/jetpack/compose

现代声明式 UI 框架，替代 XML布局。状态驱动、组件化、热重载。Android 官方推荐 UI 方案。

### Room
官方链接： https://developer.android.com/training/data-storage/room

SQLite ORM，Type-Safe查询。通过 @Entity/@Dao/@Query注解，自动生成 DAO。支持 LiveData/Flow观察。

### ViewModel
官方链接： https://developer.android.com/topic/libraries/architecture/viewmodel

生命周期感知组件，UI数据持久化。配置更改（旋转屏幕）不丢失数据。配合LiveData/Flow使用。

### LiveData
官方链接： https://developer.android.com/topic/libraries/architecture/livedata

可观察数据持有者，观察者模式。UI状态变化自动更新，避免内存泄漏。已被 Flow 部分取代。

### Coroutines
官方链接： https://kotlinlang.org/docs/coroutines-overview.html

协程库，异步编程利器。Structured Concurrency，轻量级线程，挂起函数。Kotlin 并发标准解决方案。

GitHub: [4k+ stars](https://github.com/Kotlin/kotlinx.coroutines)

## 🧪 测试工具

### JUnit 5
官方链接： https://junit.org/junit5/

单元测试框架，与 Java 互通。参数化测试、嵌套测试、动态测试。Kotlin项目标配。

### Kotest
官方链接： https://kotest.io/

Kotlin 原生测试框架，支持 BDD/Matchers/Data-driven。比 JUnit 更灵活，社区增长迅速。

GitHub: [7k+ stars](https://github.com/kotest/kotest)

### MockK
官方链接： https://mockk.io/

Mock 对象生成器，专为 Kotlin 设计。支持 Lambda、内联函数、扩展方法 Mock。Kotlin 项目首选。

GitHub: [8k+ stars](https://github.com/mockk/mockk)

### AssertJ-Kotlin
官方链接： https://assertj.github.io/doc/

流畅断言库，Kotlin 友好版本。链式调用、自定义断言、错误信息友好。提升测试可读性。

GitHub: [3k+ stars](https://github.com/assertj/assertj)

## 🔧 实用工具库

### kotlinx.serialization
官方链接： https://github.com/Kotlin/kotlinx.serialization

序列化框架，支持 JSON/protobuf/CBOR。类型安全，编译时验证，零反射开销。Kotlin 官方推荐。

GitHub: [3k+ stars](https://github.com/Kotlin/kotlinx.serialization)

### OkHttp
官方链接： https://square.github.io/okhttp/

HTTP 客户端，连接池、Gzip、HTTP/2支持。Kotlin 扩展完善，Android/iOS必备。

GitHub: [18k+ stars](https://github.com/square/okhttp)

### Gson/Jackson
官方链接： https://github.com/google/gson / https://github.com/FasterXML/jackson

JSON 处理，两者皆可。Gson 语法简单，Jackson 性能更好。选择任一即可满足需求。

### Arrow
官方链接： https://arrow-kt.io/

函数式编程扩展库，提供 Monad/Try/Either等。强化 Kotlin 函数式能力，适合 FP 风格项目。

GitHub: [14k+ stars](https://github.com/arrow-kt/arrow)

## ⚠️ 已废弃/不推荐

### RxJava
标记：🔴 学习曲线陡峭

响应式编程库，回调地狱问题严重。学习成本高，调试困难。Kotlin 协程是更好的替代品，逐步被弃用。

替代方案：Coroutines/Flow

### ButterKnife
标记：🔴 已被 ViewBinding 替代

旧版 View注入库，简化 findViewById。现在 Android 官方推荐 ViewBinding/ViewBinding KTX，性能更好更安全。

替代方案：ViewBinding

---

*注：部分经典库已过时，请参考现代替代方案*
