# J2EE / Java EE / Jakarta EE 版本演进

> **参考官方文档**: [Jakarta EE Official Release Versions](https://jakarta.ee/release/)  
> 本页梳理 J2EE 1.x、Java EE 5–7 与 Jakarta EE 的名称、治理和兼容边界，并链接现代企业 Java 的独立版本说明。

这条版本线描述的是**企业 Java 平台规范**，不是某一个应用服务器。GlassFish、Payara、WildFly、Open Liberty 等实现是否兼容，应以对应版本的 TCK 认证结果为准。

## 名称与治理变化

- **J2EE 1.x**：早期名称是 Java 2 Platform, Enterprise Edition。
- **Java EE 5–8**：2006 年起移除名称中的“2”和“.0”，`J2EE 5.0` 政名为 `Java EE 5`。
- **Jakarta EE 8+**：平台移交 Eclipse Foundation 后使用 Jakarta EE 名称，由开放规范流程继续演进。

名称变化不等于包名立即变化。真正影响源码的分界点是 **Jakarta EE 9**。

## 版本节点

### J2EE 1.2

- 确立 Web 容器与 EJB 容器协作的企业平台模型。
- Servlet 2.2、JSP 1.1、EJB 1.1、JMS、JTA、JavaMail 等技术进入统一平台。
- 应用通常打包为 WAR、EJB JAR 与 EAR，部署行为高度依赖 XML 描述符。

### J2EE 1.3

- EJB 2.0 引入本地接口、消息驱动 Bean 与 CMP 2.0，企业消息和持久化能力明显增强。
- Servlet 2.3 增加 Filter 与 Listener，JSP 1.2 完善标签扩展。
- JCA 1.0 标准化应用服务器与企业信息系统之间的资源适配器。

### J2EE 1.4

- 加强基于 XML 的 Web Service：JAX-RPC、SAAJ、JAXR 与 Web Services Metadata 进入平台。
- Servlet 2.4、JSP 2.0、EJB 2.1、JMS 1.1 与 JCA 1.5 构成主要基线。
- 部署描述符仍很重要，但 JSP Expression Language 等能力开始减少页面模板代码。
- 维护这一时期的系统时，常见风险是 EJB 2.x、远程接口、容器专属部署描述符和过时 SOAP 栈。

### Java EE 5

- 平台由 J2EE 改名为 Java EE。
- 注解、依赖注入和约定优于配置开始取代大量 XML。
- EJB 3.0 以普通 Java 对象和注解简化组件模型，减少 Home/Remote 接口与部署描述符负担。
- JPA 1.0 首次把 ORM 作为平台标准，取代 EJB 2.x Entity Bean 的核心位置。
- JSF 1.2、JAX-WS 2.0、Servlet 2.5 与 JAXB 2.0 构成新的 Web 与服务开发基线。

### Java EE 6

- 引入 Web Profile，允许实现更小的 Web 应用平台子集。
- CDI 1.0 统一依赖注入、上下文与事件模型，Bean Validation 1.0 标准化声明式校验。
- Servlet 3.0 支持注解配置、异步处理和 Web Fragment，降低 `web.xml` 的中心地位。
- EJB 3.1 Lite、JPA 2.0、JAX-RS 1.1 与 JSF 2.0 成为现代企业 Java 的基础。
- 适合识别仍大量使用 `javax.*`、但已采用 CDI/JPA/JAX-RS 的传统系统。

### Java EE 7

- JMS 2.0 简化消息发送和消费 API，减少连接、会话与生产者样板代码。
- WebSocket 1.0、Batch 1.0、JSON-P 1.0 与 Concurrency Utilities 1.0 首次进入平台。
- JAX-RS 2.0 增加标准客户端与过滤器，Servlet 3.1 增加非阻塞 I/O。
- 平台进一步加强异步、消息、批处理和 HTML5 应用支持，并继续沿用 `javax.*` 包名。

### [Java EE 8 / Jakarta EE 8](./jakarta-ee-8)

- Servlet 4.0 支持 HTTP/2，引入 JSON-B 1.0、Security 1.0，并更新 CDI、JAX-RS、JSF 与 Bean Validation。
- 以 Java SE 8 为基础，是 Oracle 主导时期最后一个 Java EE 平台版本。
- 在 Eclipse Foundation 下发布，但保持与 Java EE 8 的规范和 TCK 兼容。
- API 仍使用 `javax.*` 包名，主要变化是治理、规范过程和知识产权归属。
- 它是从 Java EE 迁往 Jakarta EE 的过渡基线，不应与 Jakarta EE 9 的包名迁移混为一谈。

### [Jakarta EE 9 / 9.1](./jakarta-ee-9)

- 企业 API 包名由 `javax.*` 迁移到 `jakarta.*`。
- 目标是以较少功能变化完成命名空间切换，并移除少量旧的可选或废弃规范。
- 升级通常需要同时更换依赖坐标、源码 import、XML namespace、框架版本和应用服务器。
- 在 Jakarta EE 9 基础上加入 Java SE 11 支持，同时仍可使用 Java SE 8。
- 对已经完成 `jakarta.*` 迁移、准备升级 JDK 的项目，是重要的兼容节点。

### [Jakarta EE 10](./jakarta-ee-10)

- 支持 Java SE 11 和 17。
- 新增轻量的 Core Profile，并更新 CDI、Persistence、REST、Security、Concurrency 等规范。
- 适合把 Jakarta EE 与 MicroProfile、现代云原生运行时组合使用。

### [Jakarta EE 11](./jakarta-ee-11)

- 最低支持 Java SE 17，并能利用 Java 21 的虚拟线程等能力。
- 新增 Jakarta Data 1.0，更新 Persistence 3.2、CDI 4.1、Servlet 6.1、REST 4.0 等规范。
- 移除 Managed Beans、SecurityManager 相关要求和部分可选规范，平台继续收紧并现代化。

### Jakarta EE 12（开发中）

- 官方仍标记为 WIP，不应当作已发布的生产兼容基线。
- 评估时应分别核对 Platform、Web Profile、Core Profile 及具体规范的里程碑状态。

## 最重要的升级边界

1. **Java EE 8 / Jakarta EE 8 → Jakarta EE 9+**：`javax.*` 到 `jakarta.*` 是源码、依赖与运行容器的整体迁移。
2. **Jakarta EE 平台版本 ≠ JDK 版本**：例如 Jakarta EE 11 的最低 JDK 基线是 Java 17，并可利用 Java 21 能力。
3. **规范版本 ≠ 产品版本**：必须确认应用服务器通过了目标 Platform、Web Profile 或 Core Profile 的兼容认证。
4. **不要只升级 API JAR**：部署描述符、持久化提供者、Bean Validation、REST 客户端、Servlet 容器和测试环境需要一起验证。

## 官方资料

- [Jakarta EE 全部发布版本](https://jakarta.ee/release/)
- [Jakarta EE Platform 规范](https://jakarta.ee/specifications/platform/)
- [Jakarta EE 11 发布页](https://jakarta.ee/release/11/)
- [Oracle：Java EE 8 与早期 Java EE 版本](https://www.oracle.com/java/technologies/java-ee-glance.html)
- [Oracle：Java 平台命名变化](https://www.oracle.com/java/technologies/javase/javanaming.html)

## 版本信息与迁移

- **发布时间 / 标准时间：** 覆盖 J2EE 1.2 至 Jakarta EE 11 的正式版本线
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
