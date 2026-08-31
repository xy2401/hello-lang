# Java 常用第三方库

## 📦 Web 开发框架

### Spring Boot
官方链接：https://spring.io/projects/spring-boot

Spring Boot 是 Spring 生态的核心框架，用于快速构建微服务和 RESTful API。内置 Tomcat/Jetty 容器，支持自动配置、Starter 依赖简化、生产级监控（Actuator）。目前最新版本为 3.x，支持 GraalVM 原生编译。

GitHub: [46k+ stars](https://github.com/spring-projects/spring-boot)

### Vert.x
官方链接：https://vertx.io/

响应式 Web 框架，基于事件循环的异步处理模型。支持 HTTP/WebSocket/RESTful API，适用于高并发场景。可运行在 JVM/Clojure/Java/Kotlin/Groovy上。

GitHub: [7k+ stars](https://github.com/eclipse-vertx/vert.x)

### Play Framework
官方链接：https://www.playframework.com/

高生产力 Web 框架，同时支持 Scala 和 Java。模式类似 Ruby on Rails，提供热重载、路由、表单处理等内置功能。

GitHub: [8k+ stars](https://github.com/playframework/playframework)

## 🗄️ 数据库与 ORM

### Hibernate / JPA
官方链接：https://hibernate.org/orm/

Java Persistence API (JPA) 参考实现，最主流的 ORM 工具。支持缓存机制、懒加载、事务管理。通过注解或 XML 定义实体映射关系。

GitHub: [5k+ stars](https://github.com/hibernate/hibernate-jpa)

### MyBatis
官方链接：https://mybatis.org/mybatis-3/zh-CN/index.html

灵活的数据持久层框架，SQL 映射文件和 XML 注解结合。支持动态 SQL、结果集映射、插件扩展。国内使用广泛，适合需要精细控制 SQL 的场景。

GitHub: [14k+ stars](https://github.com/mybatis/mybatis-3)

### JDBC
官方链接：https://docs.oracle.com/javase/tutorial/jdbc/

Java Database Connectivity 原生接口，所有数据库连接的基础。虽然直接操作较繁琐，但性能最好，某些轻量级 ORM 底层仍是 JDBC。

## 🧪 测试框架

### JUnit 5
官方链接：https://junit.org/junit5/

现代单元测试框架，参数化测试、嵌套测试类、动态测试生成。相比 JUnit 4 更灵活，支持 Lambda 表达式。Spring Boot 默认测试框架。

GitHub: [4k+ stars](https://github.com/junit-team/junit5)

### Mockito
官方链接：https://site.mockito.org/

Mock 对象创建工具，用于隔离被测代码依赖。配合 JUnit 使用，支持 Mock、Stub、Verify、Answer 等功能。配合 Powermock 可实现私有方法 Mock。

GitHub: [17k+ stars](https://github.com/mockito/mockito)

### AssertJ
官方链接：https://assertj.github.io/doc/

流畅断言库，比 JUnit assertThat 更强大。支持链式调用、自定义断言器、丰富的类型检查。测试失败时错误信息更友好。

GitHub: [10k+ stars](https://github.com/assertj/assertj)

## 🔧 实用工具库

### Lombok
官方链接：https://projectlombok.org/

代码简化工具，通过注解自动生成 getter/setter、构造方法、toString、equals 等方法。减少样板代码，提高可读性。IDE 插件需单独安装。

GitHub: [9k+ stars](https://github.com/projectlombok/lombok)

### Apache Commons Lang
官方链接： https://commons.apache.org/proper/commons-lang/

Apache 软件基金会通用工具库，String 处理、Object 比较、反射辅助、数字转换等。几乎每个项目都会用到 StringUtils/ObjectUtils。

GitHub: [5k+ stars](https://github.com/apache/commons-lang)

### Guava
官方链接：https://github.com/google/guava

Google 扩展库，集合增强、缓存（LoadingCache）、并发工具（RateLimiter）、字符串处理（Joiner/Splitter）等。功能丰富但增加包体积。

GitHub: [27k+ stars](https://github.com/google/guava)

### SLF4J + Logback
官方链接：https://www.slf4j.org/

SLF4J 是日志门面接口，Logback 是其原生实现。高性能、支持异步日志、灵活的输出格式。相比 Log4j 更现代化，相比 java.util.logging 更易用。

### Jackson
官方链接：https://github.com/FasterXML/jackson

JSON 序列化/反序列化核心库，性能优秀、功能全面。Spring Boot 默认 JSON 库，支持 Stream/DOM 两种解析模式，插件系统丰富。

GitHub: [7k+ stars](https://github.com/FasterXML/jackson)

### Gson
标记：🔴 已废弃，推荐使用 Jackson

Google 的 JSON 库，语法简单，早期流行。但随着时间推移，性能不如 Jackson，缺乏流式处理，社区活跃度下降。新项目不建议使用。

GitHub: [7k+ stars](https://github.com/google/gson)

## 🌐 网络通信

### OkHttp
官方链接：https://square.github.io/okhttp/

Square 公司出品的高效 HTTP 客户端。支持连接池（复用 TCP 连接）、Gzip 压缩、HTTP/2、WebSocket。Android 开发必备库。

GitHub: [18k+ stars](https://github.com/square/okhttp)

### Netty
官方链接：https://netty.io/

NIO 异步事件驱动网络框架，阿里 Dubbo/Redis 客户端都基于 Netty。高性能、低延迟，适合开发网关、即时通讯等服务端应用。

GitHub: [40k+ stars](https://github.com/netty/netty)

## ⚠️ 已废弃/不推荐

### Struts 2
状态：🔴 严重安全问题，不再维护

Struts 2曾是 Java EE 主流 MVC 框架，但因多次重大安全漏洞（如 2017 年 OGNL 远程代码执行），已停止维护。存在未修复高危漏洞，强烈建议迁移到 Spring Boot。

替代方案：Spring Boot + Spring MVC

### JBoss Seam
状态：🔴 已过时，被替代

JBoss Seam 是企业级组件框架，与 EJB 深度绑定。随着 CDI 和 Spring Security 的成熟，Seam 逐渐失去优势。现已归档，新功能建议使用 Spring Security 或 Keycloak。

---

*注：部分经典库已过时，请参考现代替代方案*
