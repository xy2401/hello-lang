# JDK 11 LTS

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [OpenJDK JDK 11 Official Features & Release Notes](https://openjdk.org/projects/jdk/11/)  
> JDK 11 是继 JDK 8 之后的第二个 LTS 版本，包含标准 HTTP Client、单文件源码运行、ZGC 和开源 JFR。本文按 OpenJDK 的 17 个 JEP 整理相关变化。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `eclipse-temurin:11-jdk-alpine` 中执行控制台诊断指令 `java -version`：

<DockerOutput
  image="eclipse-temurin:11-jdk-alpine"
  sourceFile="demos/java/jdk11/env.out"
/>

---

## 1. 🔀 语言语法与开发效率 (Syntax & Developer Ergonomics)

### JEP 323: Local-Variable Syntax for Lambda Parameters
允许在 Lambda 表达式参数列表中声明 `var` 关键字，使得开发者能够为 Lambda 参数添加属性注解（如 `@Deprecated var a`）。

```java
BiFunction<String, String, String> concat = (@Deprecated var a, var b) -> a + " " + b;
System.out.println(concat.apply("Hello", "JDK 11"));
```

<DockerOutput
  image="eclipse-temurin:11-jdk-alpine"
  sourceFile="demos/java/jdk11/JEP323_VarLambda.java"
/>

---

### JEP 330: Launch Single-File Source-Code Programs
允许直接通过 `java SingleFileApp.java` 命令编译并运行单个 Java 源文件，免去显式执行 `javac` 的繁琐过程。

```java
public class SingleFileApp {
    public static void main(String[] args) {
        System.out.println("Running directly without manual javac!");
    }
}
```

<DockerOutput
  image="eclipse-temurin:11-jdk-alpine"
  sourceFile="demos/java/jdk11/SingleFileApp.java"
/>

---

## 2. 🌐 现代网络通信与标准库 (Standard Library & Networking)

### JEP 321: HTTP Client (Standard)
在 `java.net.http` 包中引入全新的标准化 HTTP Client，原生支持 HTTP/1.1、HTTP/2 以及 WebSocket，全面取代老旧阻塞的 `HttpURLConnection`。

```java
HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_2)
        .build();

HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://httpbin.org/get"))
        .GET()
        .build();
```

<DockerOutput
  image="eclipse-temurin:11-jdk-alpine"
  sourceFile="demos/java/jdk11/JEP321_HttpClient.java"
/>

---

## 3. 🧠 垃圾回收与 JVM 性能剖析 (GC & Diagnostics)

### JEP 333: ZGC: A Scalable Low-Latency Garbage Collector (Experimental)
引入大堆亚毫秒级停顿垃圾回收器 ZGC（Z Garbage Collector），可在TB级堆内存下保证最大 GC 暂停时间不超过 10ms。

<DockerOutput
  image="eclipse-temurin:11-jdk-alpine"
  sourceFile="demos/java/jdk11/ZGCDemo.java"
/>

---

### JEP 318: Epsilon: A No-Op Garbage Collector
引入只分配内存、不进行任何回收的 Epsilon 垃圾回收器，专门用于性能基准测试与短生存期的 Serverless 任务。

---

### JEP 328: Flight Recorder (JFR)
将以往仅在商业版 JDK 中提供的 Java Flight Recorder 诊断工具完全开源并内置于 OpenJDK 核心，提供极低开销的 JVM 运行时事件监控与分析。

---

## 4. 📜 全部 17 个官方 JEP 提案索引清单 (JDK 11 Full JEP Matrix)

| JEP 编号 | JEP 提案名称 | 状态 | 核心领域 / 变更意义 |
| :--- | :--- | :--- | :--- |
| **JEP 181** | Nest-Based Access Control | **正式版** | 嵌套类/内部类基于 Nest 的访问控制权限优化 |
| **JEP 309** | Dynamic Class-File Constants | **正式版** | 常量池动态类文件常量 (`CONSTANT_Dynamic`) |
| **JEP 315** | Improve Aarch64 Intrinsics | **正式版** | 优化 ARM64 (AArch64) 内联函数指令集 |
| **JEP 318** | Epsilon: A No-Op Garbage Collector | Experimental | 零回收 Epsilon 垃圾回收器 (性能测试/Serverless) |
| **JEP 320** | Remove the Java EE and CORBA Modules | Removed | 彻底移除 Java EE (JAX-WS, JAXB) 和 CORBA 模块 |
| **JEP 321** | HTTP Client (Standard) | **正式版** | 标准化 HTTP/2 & WebSocket 客户端 |
| **JEP 323** | Local-Variable Syntax for Lambda Parameters | **正式版** | Lambda 参数允许使用 `var` 关键字 |
| **JEP 324** | Key Agreement with Curve25519 and Curve448 | **正式版** | 密码学 Curve25519/448 椭圆曲线密钥协商 |
| **JEP 327** | Unicode 10 | **正式版** | 升级支持 Unicode 10.0 标准字符集 |
| **JEP 328** | Flight Recorder | **正式版** | Java 飞行记录器 (JFR) 开源并集成于 JDK |
| **JEP 329** | ChaCha20 and Poly1305 Cryptographic Algorithms | **正式版** | 实现 ChaCha20 和 Poly1305 加密算法 |
| **JEP 330** | Launch Single-File Source-Code Programs | **正式版** | 单文件源程序免编译直接运行 (`java App.java`) |
| **JEP 331** | Low-Overhead Heap Profiling | **正式版** | JVMTI 低开销堆内存分析与采样 API |
| **JEP 332** | Transport Layer Security (TLS) 1.3 | **正式版** | 支持安全传输层协议 TLS 1.3 |
| **JEP 333** | ZGC: A Scalable Low-Latency Garbage Collector | Experimental | ZGC 亚毫秒级低延迟垃圾回收器 |
| **JEP 335** | Deprecate the Nashorn JavaScript Engine | Deprecated | 废弃 Nashorn JavaScript 脚本引擎 |
| **JEP 336** | Deprecate the Pack200 Tools and API | Deprecated | 废弃 Pack200 压缩工具与 API |

## 版本信息与迁移

- **发布时间 / 标准时间：** 2018 年 9 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
