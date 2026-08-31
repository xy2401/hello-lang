# Groovy 常用第三方库（Gradle/Maven）

## 📦 Web 框架

### Grails
官方链接： https://grails.org/

Ruby on Rails 风格的 Web 框架，全功能 MVC。自动配置、Scaffolding、GORM集成。适合快速开发企业应用。

GitHub: [3k+ stars](https://github.com/grails/grails-core)

### Spock Framework
官方链接： https://spockframework.org/

BDD测试框架，Groovy 专属。语法优雅（given/when/then），Mocking支持好。Groovy项目标配。

GitHub: [6k+ stars](https://github.com/spockframework/spock)

### Jersey
官方链接： https://jersey.github.io/

JAX-RS RESTful API实现，Java生态。支持 JSON/XML绑定、认证、过滤器。可配合 Spring使用。

GitHub: [5k+ stars](https://github.com/jersey/jersey)

## 🔧 实用工具库

### Groovy-SQL
官方链接： https://groovy.apache.org/docs/latest/gapi/org/codehaus/groovy/sql/SQL.html

SQL处理库，原生支持 SQL查询。ResultSet映射到 List<Map》，灵活易用。类似 ActiveRecord简化版。

### Grailss
官方链接： https://grails.org/command-reference/

Grails CLI工具，命令行管理。创建项目、运行服务器、打包部署。Grails开发必备工具。

### Gant
官方链接： https://docs.groovy-lang.org/last/html/guide/gant.html

构建脚本工具，Ant-like DSL。可替代 Ant/Maven，自定义构建设计。

### JsonSlurper
官方链接： https://groovy.lang.org/api//org/codehaus/groovy/json/JsonSlurper.html

JSON解析器，便捷高效。解析 JSON 字符串到 Groovy对象（Map/List）。内置于 stdlib。

## 🧪 测试工具

### Spock
官方链接： https://spockframework.org/

Groovy专属 BDD 测试框架。行为驱动开发语法，Mocking、Stubbing能力强大。比 JUnit更灵活。

GitHub: [6k+ stars](https://github.com/spockframework/spock)

### JUnit
官方链接： https://junit.org/

Java标准测试框架，Groovy兼容使用。适合跨语言团队，生态成熟稳定。

GitHub: [4k+ stars](https://github.com/junit-team/junit5)

### AssertJ
官方链接： https://assertj.github.io/doc/

流畅断言库，链式调用友好。测试失败信息清晰，提升可读性。

GitHub: [10k+ stars](https://github.com/assertj/assertj)

## 🏗️ 构建与工具

### Gradle
官方链接： https://gradle.org/

基于 Groovy的构建系统，主流 Java构建工具。支持多模块、依赖管理、任务编排。Android官方构建工具。

GitHub: [7k+ stars](https://github.com/gradle/gradle)

### Apache Grape
官方链接： https://groovy.apache.org/grape/

Groovy包管理工具，类似 npm/maven。@Grab注解导入依赖，本地缓存。

### Groovy-SQL
官方链接： https://groovy.apache.org/docs/latest/gapi/org/codehaus/groovy/sql/SQL.html

数据库访问库，DSL 语法简洁。支持 PreparedStatement、事务控制、结果集转换。

## ⚠️ 已废弃/不推荐

### Grails 2.x
标记：🔴 已过时

旧版本框架，建议升级到 Grails 4+/5+。新版本有更大改进，性能优化、Kotlin支持等。

替代方案：Spring Boot + Kotlin

### Ant-Groovy
标记：🔴 被 Gradle替代

旧构建系统，已被 Gradle 取代。Gradle 更灵活、插件生态丰富、构建速度快。

替代方案：Gradle/Maven

---

*注：部分经典库已过时，请参考现代替代方案*
