# Jakarta EE 10

> **参考官方文档**: [Jakarta EE 10 Official Release](https://jakarta.ee/release/10/)  
> Jakarta EE 10 支持 Java SE 11 和 17，引入 Core Profile，并更新 CDI、Persistence、REST、Security 与 Concurrency 等规范。

Jakarta EE 10 于 2022-09-22 发布，是命名空间迁移完成后的首个主要功能版本。它支持 Java SE 11 和 17，并新增面向轻量运行时的 Core Profile。

## 平台变化

- **Core Profile 10**：面向依赖注入与 REST 服务的轻量规范集合，包含 Annotations 2.1、CDI 4.0 Lite、Dependency Injection 2.0、Interceptors 2.1、JSON-P 2.1、JSON-B 3.0 与 REST 3.1。
- **CDI 4.0**：区分 CDI Lite 与 CDI Full，加入 Build Compatible Extensions，使构建期处理和轻量容器实现有标准扩展点。
- **Jakarta REST 3.1**：补充独立 Bootstrap API、multipart/form-data 支持，并允许在非 Servlet 环境启动 REST 应用。
- **Jakarta Persistence 3.1**：加入 UUID 主键生成、`CEILING`、`EXP`、`FLOOR`、`LN`、`POWER`、`ROUND`、`SIGN` 等查询函数和 `SchemaManager`。
- **Jakarta Security 3.0**：标准化 OpenID Connect 客户端支持。
- **Jakarta Concurrency 3.0**：进入 Web Profile，并更好地对齐现代 Java SE 并发 API。
- **Servlet 6.0 与 Faces 4.0**：移除长期弃用项；Faces 进一步依赖 CDI，并更新资源与扩展 API。
- **JSON-B 3.0**：加入多态类型处理等能力。

## 三个 Profile

- **Core Profile**：最小的标准化运行体，适合微服务框架、构建期容器和其他规范复用。
- **Web Profile**：在 Core 之上提供 Servlet、Faces、Persistence、Security、Concurrency 等 Web 应用能力。
- **Platform**：再加入 Messaging、Batch、Mail、Connectors、Enterprise Beans 等完整企业服务。

Profile 是逐层扩展关系，但产品认证是明确的能力边界。选择 Core Profile 不能假定同时拥有 Servlet 或 JPA；选择 Web Profile 也不能假定拥有完整 Platform 的 JMS、JCA 等服务。

## JDK 基线

- 可在 Java SE 11 或 17 上开发和部署。
- 新项目通常优先以 JDK 17 为生产基线，减少后续升级跨度。
- Jakarta EE 版本与 JDK 版本仍是两套编号，运行时必须明确声明两者。

标准 Platform API 坐标如下；实际应用通常使用 `provided`，由兼容服务器提供实现：

```xml
<dependency>
  <groupId>jakarta.platform</groupId>
  <artifactId>jakarta.jakartaee-api</artifactId>
  <version>10.0.0</version>
  <scope>provided</scope>
</dependency>
```

## 从 Jakarta EE 9.1 升级

- 不再有 `javax.*` → `jakarta.*` 级别的整体包名变化。
- 重点检查 CDI 4、Faces 4、Servlet 6、Persistence 3.1、REST 3.1 等规范的移除项和行为变化。
- 确认目标应用服务器通过 Jakarta EE 10 Platform、Web Profile 或 Core Profile 的相应认证。
- 升级到 JDK 17 时同时检查反射、强封装、启动参数和第三方代理库。

## 官方资料

- [Jakarta EE 10 发布页](https://jakarta.ee/release/10/)
- [Jakarta EE Platform 10 规范](https://jakarta.ee/specifications/platform/10/)
- [Jakarta EE 10 教程概览](https://jakarta.ee/learn/docs/jakartaee-tutorial/current/intro/overview/overview.html)

## 版本信息与迁移

- **发布时间 / 标准时间：** 2022 年 9 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
