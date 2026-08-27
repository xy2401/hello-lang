# GraalVM 版本演进

> **参考官方文档**: [GraalVM Community Edition Official Release Notes](https://www.graalvm.org/release-notes/)  
> GraalVM 版本线涵盖 Graal 编译器、Native Image 与多语言运行时；本文按 19.x 至 25.x 的命名方式、JDK 基线和发行节奏整理。

GraalVM 不是新的 Java 语言版本。它是一套基于 JDK 的高性能运行时与工具集合，核心包括 Graal 编译器、Native Image、Truffle 多语言框架，以及 GraalJS、GraalPy、GraalWasm、Espresso 等语言运行时。

选择 GraalVM 时至少要同时记录三项：**GraalVM 发行版本、底层 JDK 版本、所用组件版本**。

## 版本模型变化

### GraalVM 19.x（2019）

- 19.0 是早期正式编号的重要起点，发行包以 JDK 8 为基础。
- Native Image 当时仍作为可安装组件提供，Windows 支持处于早期阶段。
- 这一时期形成了 JIT 编译、AOT Native Image 与多语言运行时并存的产品形态。

### GraalVM 20.x、21.x、22.x（2020–2022）

- 使用独立的 `年.版本` 编号，例如 21.3、22.3。
- 底层可能同时提供 JDK 8、11 或 17 变体，因此只写“GraalVM 22.3”不足以复现环境。
- Native Image 的构建报告、可达性元数据仓库、监控和框架兼容能力逐步成熟。
- 22.3 改进构建输出、生成软件物料清单（SBOM），并预览对 JDK 19 虚拟线程的支持。
- 22.3 与 Spring Boot 3 的 AOT/Native Image 支持形成重要生态节点，Java 原生镜像开始从框架专用实验进入标准构建流程。

### GraalVM for JDK 17 / 20（2023）

- 发行名称开始突出底层 JDK，例如 `GraalVM for JDK 17`。
- JDK 17.0.7 版本简化了 Community Edition 安装包命名。
- 迁移时应同时核对 Graal Languages/Truffle 组件版本，而不是只比较 JDK 补丁号。

### GraalVM for JDK 21（2023-09-19）

- 基于 Oracle JDK 21 或 OpenJDK 21 发布。
- JavaScript、Python、Ruby 等语言运行时改为独立发行包，不再默认包含在 GraalVM JDK 中。
- `gu` 组件更新器随之移除；语言与工具应按各自发行包或构建依赖安装，旧的 `gu install` 教程不再适用。
- SDK 被拆分为 `nativeimage`、`polyglot`、`word`、`collections` 等更细模块，原聚合 `graal-sdk` 进入弃用路径。
- Native Image 增强 JFR、堆转储与 Vector API 支持，生产诊断能力继续接近常规 JVM。
- 这是重要的长期维护基线，但 Native Image 与 HotSpot 对同一 JDK 特性的支持范围仍需分别核对。

### GraalVM for JDK 22、23（2024）

- 与 JDK 半年功能版本同步发布，底层 JDK 版本成为发行标识的核心。
- Graal Languages 组件有自己的兼容版本，例如 GraalVM for JDK 23 对应 24.1.0 组件线。
- 这类非 LTS JDK 基线适合验证新 JDK 与 Native Image 能力，生产采用需考虑较短的维护窗口。

### GraalVM for JDK 24（2025-03-18）

- Native Image 在最高优化级别加入 GNN 静态性能分析器（Oracle GraalVM），用于改进缺少运行时 Profile 时的代码布局和内联决策。
- 实验性 SkipFlow 静态分析能利用条件分支信息减少被判定为可达的代码。
- AArch64 默认目标提升到 `armv8.1-a`，升级构建机或部署机时要重新核对 CPU 基线。
- 原生镜像开始使用模块化的服务加载，并加入实验性 `jcmd` 支持，持续改善诊断与模块边界。

### GraalVM 25（2025-09-16）

- 名称从 `GraalVM for JDK 25` 简化为 `GraalVM 25`，Oracle 版基于 Oracle JDK 25，Community Edition 基于 OpenJDK 25。
- 组件版本统一进入 25.0.x 版本线。
- Native Image 默认启用 WP-SCCP 优化，利用调用者参数信息继续折叠分支与常量。
- FFM API 的配置、跟踪与 AArch64 支持增强，Vector API 优化范围扩大。
- `--future-defaults` 可提前验证未来默认行为；Tracing Agent 增加元数据来源跟踪，便于定位反射和资源配置。
- 原生调试信息、JDWP 调试、SBOM 与构建诊断继续完善，但 Oracle GraalVM 与 Community Edition 的可用特性仍需分别核对。

### GraalVM 25.1+（2026）

- 从 25.1 开始，功能版本由半年节奏改为**每月发布**，季度 CPU 安全更新继续并入对应版本。
- 版本号遵循 JDK 风格的 `MAJOR.MINOR.SECURITY`：`25` 表示 Java 基线，`25.1`、`25.2` 表示功能线，最后一位反映安全更新层级。
- 最新功能版本会取代前一功能版本；生产环境应根据官方日历区分功能更新与 CPU 更新。
- 25.1 引入实验性的 Web Image 后端，可把 Java 应用构建为面向浏览器或 JavaScript 运行时的 WebAssembly 模块；它与面向操作系统本机可执行文件的 Native Image 是两条不同产物路径。

## 版本证据

版本号必须来自实际工具输出，不要从下载文件名或 CI 镜像标签推断：

```bash
java --version
native-image --version
```

第一条用于确认发行版、JDK 基线与补丁版本；第二条用于确认 Native Image 是否存在及其组件版本。使用 GraalJS、GraalPy 等独立语言时，还应记录相应启动器或依赖版本。

## GraalVM 与普通 JDK 的差异

### HotSpot / Graal JIT

普通 `java` 启动方式仍运行 JVM 字节码。Graal 编译器可以作为高层 JIT 编译器优化热点代码，但应用仍保留动态类加载、反射和 JVM 运行时行为。

### Native Image

`native-image` 对 Java 字节码做静态可达性分析并生成平台相关的本机可执行文件。它通常启动更快、内存占用更低，但遵循封闭世界假设。

反射、JNI、动态代理、资源加载、序列化和动态类加载可能需要可达性元数据。不能因为项目能在 JVM 上运行，就推断它一定能直接构建为 Native Image。

### Polyglot / Truffle

GraalJS、GraalPy、GraalWasm、Espresso 等组件有各自版本和发行方式。自 GraalVM for JDK 21 起，多种语言运行时改为独立发行，因此旧教程中的 `gu install` 或内置启动器流程可能不再适用。

## 选型与升级检查

1. 记录完整的 `java --version` 与 `native-image --version` 输出。
2. 确认所选版本基于 JDK 17、21、25 或非 LTS JDK，不要只记录“GraalVM”。
3. 检查框架与库的 Reachability Metadata，特别是反射、代理、JNI 和资源文件。
4. 在目标操作系统和 CPU 架构上重新构建；Native Image 产物不是跨平台字节码。
5. 比较 JVM 与 Native Image 两条运行路径的启动时间、峰值吞吐、内存、构建时间和可观测能力。
6. 跟随官方 Release Calendar 安排功能升级和季度安全更新。

## 官方资料

- [GraalVM Community Edition 发行说明索引](https://www.graalvm.org/release-notes/)
- [GraalVM Release Calendar 与版本编号](https://www.graalvm.org/release-calendar/)
- [GraalVM 25 发行说明](https://www.graalvm.org/release-notes/JDK_25/)
- [GraalVM for JDK 21 发行说明](https://www.graalvm.org/release-notes/JDK_21/)
- [Native Image 文档](https://www.graalvm.org/latest/reference-manual/native-image/)
- [Native Image 动态特性与可达性元数据](https://www.graalvm.org/latest/reference-manual/native-image/dynamic-features/)

## 版本信息与迁移

- **发布时间 / 标准时间：** 覆盖 2019–2026 年的 GraalVM 重要版本线
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
