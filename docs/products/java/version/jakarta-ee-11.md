# Jakarta EE 11

> **参考官方文档**: [Jakarta EE 11 Official Release](https://jakarta.ee/release/11/)  
> Jakarta EE 11 最低支持 Java SE 17，新增 Jakarta Data 1.0，并更新 Persistence 3.2、CDI 4.1、Servlet 6.1 和 REST 4.0 等规范。

Jakarta EE 11 于 2025-06-26 发布，最低支持 Java SE 17，并能在 Java 21 及以上环境利用虚拟线程等现代 JVM 能力。

## 主要变化

- **Jakarta Data 1.0**：首次把 Repository 抽象、方法名派生查询、`@Query`、分页、排序和基础 CRUD 纳入平台标准。
- **Jakarta Persistence 3.2**：支持 Record 作为 `@Embeddable` 或 `@IdClass`，增加 `Instant`、`Year` 映射、复合主键简化和更丰富的查询能力。
- **CDI 4.1**：允许用 `@Priority` 全局启用拦截器、装饰器与替代 Bean，并继续完善构建兼容扩展。
- **Servlet 6.1**：完善请求 ID、协议升级和 Servlet 映射等 API，并完成对已移除 SecurityManager 的清理。
- **REST 4.0**：继续现代化客户端与服务器 API，`@Context` 被弃用，依赖注入成为更明确的上下文获取方式。
- **Validation 3.1 与 Security 4.0**：补充验证能力并清理过时安全接口。
- **Concurrency 3.1**：允许兼容实现以 Java 21 虚拟线程执行托管任务，同时继续传播 Jakarta EE 上下文。

Jakarta Data 的目标不是替换 Persistence，而是在其上定义可移植的数据访问接口。应用仍由 JPA 或其他数据存储实现完成实体映射和查询执行。

```java
@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
    List<Book> findByTitleLike(String title);
}
```

## 平台收紧

- Managed Beans 规范被移除，使用 CDI 替代。
- 移除平台中对 Java SecurityManager 的引用。
- 移除旧的可选规范，降低兼容实现的负担。
- SOAP with Attachments 与 XML Binding 不再属于 Jakarta EE 11 Platform；需要时应单独引入相关规范或实现。
- CORBA/IIOP 互操作要求退出平台，依赖远程 EJB 互操作的遗留系统需要单独评估。
- Persistence 3.2 弃用旧的 `java.sql.Date`、`java.sql.Time`、`java.sql.Timestamp`、`Calendar` 与 `@Temporal` 路径，新代码优先使用 `java.time`。

## JDK 与部署基线

- 最低 JDK：Java 17。
- Java 21 可提供虚拟线程等额外能力，但平台规范不会自动保证所有应用都适合改用虚拟线程。
- 升级时应分别记录 Jakarta EE 11、具体应用服务器版本和 JDK 17/21 的补丁版本。

## 从 Jakarta EE 10 升级

1. 检查已移除的 Managed Beans、SecurityManager 与可选规范依赖。
2. 核对 Persistence 3.2、CDI 4.1、REST 4.0 等 API 的弃用和行为变化。
3. 在 JDK 17 与实际生产 JDK 上分别完成 TCK 之外的业务回归。
4. 若启用虚拟线程，重新验证线程本地变量、阻塞驱动、连接池和监控指标。

Jakarta EE 11 的 Platform 与 Web Profile 以 Java 17 为最低基线；Core Profile 仍保持较小的规范集合。应用服务器“能在 JDK 21 上启动”不等于已经通过 Jakarta EE 11 认证，应同时核对产品版本、认证 Profile 与所用 JDK。

## 官方资料

- [Jakarta EE 11 发布页](https://jakarta.ee/release/11/)
- [Jakarta EE Platform 11 规范](https://jakarta.ee/specifications/platform/11/)
- [Jakarta EE 全部发布版本](https://jakarta.ee/release/)

## 版本信息与迁移

- **发布时间 / 标准时间：** 2025 年 6 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
