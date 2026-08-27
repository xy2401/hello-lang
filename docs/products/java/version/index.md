# Java 版本演进

Java 生态至少有三条需要分别追踪的版本线：

- **Java SE / JDK**：语言、标准库与 JVM 的基础版本。
- **[J2EE / Java EE / Jakarta EE](./jakarta-ee)**：企业应用规范、API 与兼容实现的版本。
- **[GraalVM](./graalvm)**：Graal 编译器、Native Image 与多语言运行时的版本。

JDK 采用每半年一个功能版本、每两年一个 **LTS（长期支持版，维护数年）** 的稳定发布节奏。三条版本线有关联，但版本号不能互相替代：选择 Jakarta EE 或 GraalVM 时，仍要单独核对它支持的 JDK 基线。

## 版本索引

### [JDK 25 LTS](./jdk-25)

- **发布时间：** 2025 年 9 月
- **版本重点：** 模式匹配（Pattern Matching）语法最终标准化，灵活解构复杂嵌套对象。

### [JDK 21 LTS](./jdk-21)

- **发布时间：** 2023 年 9 月
- **版本重点：** 虚拟线程（Virtual Threads，Project Loom）：轻量级协程模型，单机可高并发创建百万级线程。

### [JDK 17 LTS](./jdk-17)

- **发布时间：** 2021 年 9 月
- **版本重点：** 密封类（Sealed Classes）：严格限制允许继承或实现的子类集合。

### [JDK 11 LTS](./jdk-11)

- **发布时间：** 2018 年 9 月
- **版本重点：** 局部变量类型推断语法增强（Lambda 形参支持 var）。

### [JDK 8 LTS](./jdk-8)

- **发布时间：** 2014 年 3 月
- **版本重点：** Lambda 表达式与函数式接口（Functional Interfaces）。

## 生产升级建议
- 从 JDK 8 升级至 JDK 17/21 时，需注意升级废弃的外部依赖（如更换为 jakarta 命名空间），并移除 `-XX:+UseConcMarkSweepGC`（CMS 已被彻底移除，推荐改用 G1 或 ZGC）。

## 相关版本资料

- [Jakarta EE 10](./jakarta-ee-10)
- [Jakarta EE 11](./jakarta-ee-11)
- [Java EE 8 / Jakarta EE 8](./jakarta-ee-8)
- [Jakarta EE 9 / 9.1](./jakarta-ee-9)
