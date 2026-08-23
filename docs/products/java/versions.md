# Java (JDK) 版本演进

Java 采用每半年一个功能版本、每两年一个 **LTS（长期支持版，维护数年）** 的稳定发布节奏。

## 核心版本演进与关键里程碑

### JDK 25 LTS（2025 年 9 月）

**主要功能与架构演进：**

- 模式匹配（Pattern Matching）语法最终标准化，灵活解构复杂嵌套对象
- 紧凑对象头（Compact Object Headers，JEP 450）降低 JVM 堆内存开销 10%~20%

**工程影响与选型建议：**

> 下一代企业级微服务核心运行基线。

### JDK 21 LTS（2023 年 9 月）

**主要功能与架构演进：**

- 虚拟线程（Virtual Threads，Project Loom）：轻量级协程模型，单机可高并发创建百万级线程
- 模式匹配的 switch 表达式（Pattern Matching for switch）与 Record Patterns 解构
- 分代 ZGC（Generational ZGC）：亚毫秒级低延迟垃圾收集器正式生产就绪

**工程影响与选型建议：**

> Java 高并发吞吐与现代语法的革命性里程碑，Spring Boot 3 强力推荐。

### JDK 17 LTS（2021 年 9 月）

**主要功能与架构演进：**

- 密封类（Sealed Classes）：严格限制允许继承或实现的子类集合
- 强封装 JDK 内部 API（彻底阻止通过反射访问 sun.misc.Unsafe 等内部包）
- 原生支持 macOS AArch64 (Apple Silicon) 架构

**工程影响与选型建议：**

> Spring Boot 3 与现代企业框架的最低基线版本。

### JDK 11 LTS（2018 年 9 月）

**主要功能与架构演进：**

- 局部变量类型推断语法增强（Lambda 形参支持 `var`）
- 全新的内置标准化 HTTP Client API（支持 HTTP/2 与 WebSocket）
- 彻底移除 Java EE 与 CORBA 模块

**工程影响与选型建议：**

> 模块化与云原生时代的经典基线。

### JDK 8 LTS（2014 年 3 月）

**主要功能与架构演进：**

- Lambda 表达式与函数式接口（Functional Interfaces）
- Stream 流式计算 API 与全新的 `java.time` 日期时间 API
- 接口默认方法（Default Methods）与方法引用（Method References）

**工程影响与选型建议：**

> Java 历史上最伟大、影响最为深远的划时代版本。

## 生产升级建议
- 从 JDK 8 升级至 JDK 17/21 时，需注意升级废弃的外部依赖（如更换为 jakarta 命名空间），并移除 `-XX:+UseConcMarkSweepGC`（CMS 已被彻底移除，推荐改用 G1 或 ZGC）。
