# JDK 17 LTS

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [OpenJDK JDK 17 Official Features & Release Notes](https://openjdk.org/projects/jdk/17/)  
> JDK 17 包含密封类、Apple Silicon（macOS/AArch64）支持、JDK 内部 API 强封装和伪随机数生成器改进。本文按 OpenJDK 的 14 个 JEP 整理相关变化。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `eclipse-temurin:17-jdk-alpine` 中执行控制台诊断指令 `java -version`：

<DockerOutput
  image="eclipse-temurin:17-jdk-alpine"
  sourceFile="demos/java/jdk17/env.out"
/>

---

## 1. 📦 面向数据建模与语言表达力 (Data Modeling & Language)

### JEP 409: Sealed Classes (密封类与密封接口)
限定类的继承层级结构，明确指定允许继承的子类（`permits Circle, Rectangle`），为穷举模式匹配奠定安全基础。

```java
public sealed interface Shape permits Circle, Rectangle {}

public final class Circle implements Shape { public double r; }
public final class Rectangle implements Shape { public double w, h; }
```

<DockerOutput
  image="eclipse-temurin:17-jdk-alpine"
  sourceFile="demos/java/jdk17/JEP409_SealedClasses.java"
/>

---

### JEP 395: Records (不可变数据载体类 - 正式版)
原生生成基于值的不可变数据结构，自动提供全参构造器、`equals()`、`hashCode()`、`toString()` 与属性访问器。

```java
public record UserRecord(long id, String username, String role) {}
```

<DockerOutput
  image="eclipse-temurin:17-jdk-alpine"
  sourceFile="demos/java/jdk17/JEP395_Records.java"
/>

---

### JEP 378: Text Blocks (多行文本块)
使用三引号 `"""` 编写多行 HTML、JSON 或 SQL 字符串，免去繁琐的转义字符与 `+` 拼接。

```java
String json = """
    {
      "status": "success",
      "code": 200
    }
    """;
```

<DockerOutput
  image="eclipse-temurin:17-jdk-alpine"
  sourceFile="demos/java/jdk17/JEP378_TextBlocks.java"
/>

---

### JEP 394: Pattern Matching for `instanceof` (模式匹配)
消除了显式强转的防范性代码，在判断类型的同时自动完成类型转换绑定。

```java
if (obj instanceof String s) {
    System.out.println("Length: " + s.length());
}
```

<DockerOutput
  image="eclipse-temurin:17-jdk-alpine"
  sourceFile="demos/java/jdk17/JEP394_PatternInstanceOf.java"
/>

---

## 2. 🎲 核心类库与安全增强 (APIs & Security)

### JEP 356: Enhanced Pseudo-Random Number Generators (伪随机数生成器增强)
提供 `RandomGenerator` 统一接口体系，内置 LXM（如 `L128X128MixRandom`）等高性能伪随机数生成算法。

```java
RandomGenerator generator = RandomGeneratorFactory.of("L128X128MixRandom").create();
```

<DockerOutput
  image="eclipse-temurin:17-jdk-alpine"
  sourceFile="demos/java/jdk17/JEP356_RandomGenerators.java"
/>

---

### JEP 403: Strongly Encapsulate JDK Internals (强封装 JDK 内部 API)
默认禁用对 `sun.misc.Unsafe` 以外大部分内部 API 的跨模块反射访问（除非显式指定 `--add-opens`），极大提升 JVM 内部安全性。

---

## 3. 🖥️ 平台与底层架构支持 (Platform Ports & Cleanup)

### JEP 391: macOS/AArch64 Port (Apple Silicon M1/M2/M3 原生支持)
提供针对 Apple M 系列芯片（AArch64 架构）原生优化的 JDK 构建，性能提升巨大。

---

## 4. 📜 全部 14 个官方 JEP 提案索引清单 (JDK 17 Full JEP Matrix)

| JEP 编号 | JEP 提案名称 | 状态 | 核心领域 / 变更意义 |
| :--- | :--- | :--- | :--- |
| **JEP 306** | Restore Always-Strict Floating-Point Semantics | **正式版** | 恢复默认严格浮点语义 (`strictfp`) |
| **JEP 356** | Enhanced Pseudo-Random Number Generators | **正式版** | 伪随机数生成器统一 API (LXM 算法) |
| **JEP 382** | New macOS Rendering Pipeline | **正式版** | 基于 Metal API 的 macOS 图形渲染管线 |
| **JEP 391** | macOS/AArch64 Port | **正式版** | Apple Silicon (M1/M2/M3) 架构原生支持 |
| **JEP 398** | Deprecate the Applet API for Removal | Deprecated | 废弃 Applet API |
| **JEP 403** | Strongly Encapsulate JDK Internals | **正式版** | 强封装 JDK 内部 API (默认禁止反射 sun.misc) |
| **JEP 406** | Pattern Matching for switch | Preview | switch 模式匹配 (初次 Preview) |
| **JEP 407** | Remove RMI Activation | Removed | 彻底移除 RMI Activation 机制 |
| **JEP 409** | Sealed Classes | **正式版** | Sealed 密封类与密封接口 |
| **JEP 410** | Remove Experimental AOT and JIT Compiler | Removed | 移除实验性 jaotc / C2 AOT 编译器 |
| **JEP 411** | Deprecate the Security Manager for Removal | Deprecated | 废弃 Security Manager |
| **JEP 412** | Foreign Function & Memory API | Incubator | 外部函数与内存 API (Project Panama) |
| **JEP 414** | Vector API | Second Incubator | 向量计算 API |
| **JEP 415** | Context-Specific Deserialization Filters | **正式版** | 上下文敏感的反序列化过滤器 |

## 版本信息与迁移

- **发布时间 / 标准时间：** 2021 年 9 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
