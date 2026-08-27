# Jakarta EE 9 / 9.1

> **参考官方文档**: [Jakarta EE 9 Official Release](https://jakarta.ee/release/9/) · [Jakarta EE 9.1 Official Release Notes](https://jakarta.ee/news/jakarta-ee-9-1-released/)  
> Jakarta EE 9 完成 `javax.*` 到 `jakarta.*` 的命名空间迁移，9.1 增加 Java SE 11 支持；本文集中整理这一关键兼容断点。

Jakarta EE 9 是企业 Java 现代化过程中最明确的源码兼容分界线：平台 API 从 `javax.*` 迁移到 `jakarta.*`。Jakarta EE 9.1 保持同一套 API 主体，并扩展到 Java SE 11。

## Jakarta EE 9（2020-12-08）

- 将企业平台 API 包名统一改为 `jakarta.*`。
- Maven 坐标、XML namespace、服务提供者配置和反射字符串也需要一起迁移。
- 功能目标接近 Jakarta EE 8，重点是完成命名空间切换。
- Servlet 5.0、Faces 3.0、Persistence 3.0、REST 3.0、CDI 3.0、Validation 3.0、JSON-B 2.0 与 JSON-P 2.0 等规范同步提升主版本，主要变化同样来自包名迁移。
- XML Registries 1.0、XML RPC 1.1、Deployment 1.7、Management 1.1 与 EJB 分布式互操作等旧规范被移出平台。

```java
// EE 8
import javax.persistence.Entity;
import javax.ws.rs.Path;

// Jakarta EE 9+
import jakarta.persistence.Entity;
import jakarta.ws.rs.Path;
```

标准 Platform API 坐标也进入 9.x：

```xml
<dependency>
  <groupId>jakarta.platform</groupId>
  <artifactId>jakarta.jakartaee-api</artifactId>
  <version>9.0.0</version>
  <scope>provided</scope>
</dependency>
```

Jakarta EE 9 仍要求实现识别部分旧版部署描述符，因此 `web.xml` 等文件不一定要为了运行立即改写；但新代码和新描述符应使用 Jakarta EE 9 的 schema。源码与依赖则不存在这种兼容层，`javax.*` 类型和 `jakarta.*` 类型是不同的类型。

## Jakarta EE 9.1（2021-05-25）

- 在 Jakarta EE 9 基础上支持 Java SE 11，同时仍兼容 Java SE 8。
- 平台 API 没有再次进行类似 `javax` → `jakarta` 的大规模重命名。
- 对已完成命名空间迁移、准备提升 JDK 基线的项目，是更实用的落点。

9.1 没有新增一轮平台 API，而是把 Java SE 11 纳入正式支持范围。它让应用服务器能够以 JDK 11 作为认证基线，也使完成 `jakarta.*` 迁移的项目不必停留在 JDK 8。

## 迁移检查

1. 将 `javax.*` 企业 API import 改为 `jakarta.*`，但不要误改 `javax.sql`、`javax.crypto` 等仍属于 Java SE 的包。
2. 更新 Jakarta EE API、应用服务器、ORM、Bean Validation、REST、Servlet 与测试框架版本。
3. 检查 `persistence.xml`、`web.xml`、JAXB 文件和其他 XML namespace。
4. 检查字符串形式的类名、反射配置、序列化数据、模板与代码生成结果。
5. 不要在同一部署中混用依赖于 `javax.*` 和 `jakarta.*` 的框架主版本。

自动重写工具可以完成大量 import、坐标和描述符转换，但不能替代测试：序列化数据、反射字符串、插件接口与第三方库仍可能在运行时暴露两个命名空间之间的边界。

## 官方资料

- [Jakarta EE 9 发布页](https://jakarta.ee/release/9/)
- [Jakarta EE 9.1 发布说明](https://jakarta.ee/news/jakarta-ee-9-1-released/)
- [Jakarta EE 9.1 教程概览](https://jakarta.ee/learn/docs/jakartaee-tutorial/9.1/intro/overview/overview.html)

## 版本信息与迁移

- **发布时间 / 标准时间：** Jakarta EE 9：2020 年 12 月；9.1：2021 年 5 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
