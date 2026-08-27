# Java EE 8 / Jakarta EE 8

> **参考官方文档**: [Java EE 8 Official Platform Overview](https://www.oracle.com/java/technologies/java-ee-glance.html) · [Jakarta EE 8 Official Release](https://jakarta.ee/release/8/)  
> EE 8 包含 Servlet 4.0、JAX-RS 2.1、CDI 2.0、JSON-B 1.0 和 Security 1.0 等变化；本文重点说明 Java EE 8 与 Jakarta EE 8 的兼容关系。

Java EE 8 与 Jakarta EE 8 是同一代企业 Java API 的两个治理阶段。前者是 Oracle/JCP 时代的最后一个 Java EE 版本；后者由 Eclipse Foundation 发布，并保持对 Java EE 8 规范与 TCK 的兼容。

## 版本关系

- **Java EE 8**：2017 年发布，以 Java SE 8 为基础。
- **Jakarta EE 8**：2019-09-10 发布，规范治理和 TCK 转入 Eclipse Foundation。
- 两者都使用 `javax.*` 包名，例如 `javax.persistence`、`javax.ws.rs`、`javax.servlet`。
- Jakarta EE 8 的重点是完成平台交接，不是源码级 API 重命名。

## 主要平台能力

- Servlet 4.0：加入 HTTP/2 与服务器推送支持；应用不必改变 Servlet 编程模型就能使用多路复用连接。
- JAX-RS 2.1：加入 Server-Sent Events、`CompletionStage` 异步响应和反应式客户端 API。
- CDI 2.0：支持 Java SE 引导、异步事件，并把部分 SPI 拆成可独立使用的模块。
- JSON-B 1.0 与 JSON-P 1.1：统一 JSON 绑定和处理模型。
- Security 1.0：通过 `HttpAuthenticationMechanism`、`IdentityStore` 等 API 提供可移植的认证与身份存储机制。
- Bean Validation 2.0：支持容器元素约束、重复注解以及 Java 8 日期时间类型。
- JPA 2.2：支持 `java.time`、查询结果流与 CDI 注入的 `AttributeConverter`。
- JSF 2.3：增强 WebSocket、CDI 集成、组件搜索表达式和类型安全转换能力。

## Platform 与 Web Profile

- **Platform 8** 包含 EJB、JMS、JCA、Batch、Web Services 等完整企业能力。
- **Web Profile 8** 聚焦 Servlet、JSF、JAX-RS、CDI、JPA 等常用 Web 技术，适合不需要完整平台服务的应用。
- “兼容 Jakarta EE 8”应以产品是否通过对应 Profile 的 TCK 为准；只支持若干 API 不能等同于平台兼容。
- Java EE 8 与 Jakarta EE 8 的应用模型基本一致，但规范维护组织、API Maven 坐标和认证品牌不同。

## 识别现有项目

依赖或源码出现下列特征时，通常仍处于 EE 8 基线：

```java
import javax.persistence.Entity;
import javax.ws.rs.GET;
import javax.servlet.http.HttpServlet;
```

常见 API 坐标为 `javax:javaee-api:8.0` 或 `jakarta.platform:jakarta.jakartaee-api:8.0.0`。虽然后一个坐标带有 Jakarta 名称，API 包仍是 `javax.*`。

```xml
<dependency>
  <groupId>jakarta.platform</groupId>
  <artifactId>jakarta.jakartaee-api</artifactId>
  <version>8.0.0</version>
  <scope>provided</scope>
</dependency>
```

## 升级判断

- 只更换到 Jakarta EE 8 兼容服务器，通常不要求把源码改成 `jakarta.*`。
- 升级到 Jakarta EE 9 及以上时，必须处理命名空间、依赖、XML schema 和框架兼容性。
- 应按目标服务器的兼容认证选择 Platform 或 Web Profile，不要只看服务器产品版本号。

## 官方资料

- [Oracle：Java EE 8](https://www.oracle.com/java/technologies/java-ee-glance.html)
- [Jakarta EE 8 发布页](https://jakarta.ee/release/8/)
- [Jakarta EE Platform 8 规范](https://jakarta.ee/specifications/platform/8/)

## 版本信息与迁移

- **发布时间 / 标准时间：** Java EE 8：2017 年 9 月；Jakarta EE 8：2019 年 9 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
