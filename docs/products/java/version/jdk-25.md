# JDK 25 LTS

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [OpenJDK JDK 25 Official Features & Release Notes](https://openjdk.org/projects/jdk/25/)  
> JDK 25 涵盖简化程序入口、AOT 优化、紧凑对象头、Scoped Values 和分代 Shenandoah 等变化。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `eclipse-temurin:25-jdk-alpine` 中执行控制台诊断指令 `java -version`：

<DockerOutput
  image="eclipse-temurin:25-jdk-alpine"
  sourceFile="demos/java/jdk25/env.out"
/>

---

## 1. 🔀 语言表达力与入门简化 (Language & Developer Productivity)

### JEP 512: Compact Source Files and Instance Main Methods
彻底简化了 Java 程序入口点，允许直接编写隐式类和实例 `main` 方法，免去繁琐的 `public static void main(String[] args)` 模板代码。

```java
void main() {
    System.out.println("JDK 25 Instance Main Method:");
    System.out.println("void main() executed directly without public static void main!");
}
```

<DockerOutput
  image="eclipse-temurin:25-jdk-alpine"
  sourceFile="demos/java/jdk25/JEP512_InstanceMain.java"
/>

---

### JEP 513: Flexible Constructor Bodies (灵活的构造函数体)
允许在构造函数中 `super(...)` 或 `this(...)` 调用**之前**执行预校验或准备语句（前提是不引用未初始化的 `this` 实例）。

```java
public class JEP513_FlexibleConstructor extends ParentClass {
    JEP513_FlexibleConstructor(int input) {
        // 在 super() 之前允许执行参数校验与计算
        int validated = Math.max(1, input);
        super(validated);
    }
}
```

<DockerOutput
  image="eclipse-temurin:25-jdk-alpine"
  sourceFile="demos/java/jdk25/JEP513_FlexibleConstructor.java"
/>

---

### JEP 507: Primitive Types in Patterns, instanceof, and switch
将解构模式匹配拓展至所有基本数据类型（`int`, `double`, `boolean` 等），消除了类型包装的限制。

```java
int val = 42;
String result = switch (val) {
    case byte b -> "byte " + b;
    case int i when i > 10 -> "large int " + i;
    case int i -> "small int " + i;
    default -> "other";
};
```

<DockerOutput
  image="eclipse-temurin:25-jdk-alpine"
  sourceFile="demos/java/jdk25/JEP507_PrimitivePatterns.java"
/>

---

## 2. ⚡ 协程与高并发演进 (Project Loom & Scoped Values)

### JEP 506: Scoped Values (作用域值)
提供比 `ThreadLocal` 更轻量、不可变且在虚拟线程（Virtual Threads）树状结构间高效共享上下文的机制。

```java
ScopedValue<UserContext> USER = ScopedValue.newInstance();
```

<DockerOutput
  image="eclipse-temurin:25-jdk-alpine"
  sourceFile="demos/java/jdk25/JEP506_ScopedValues.java"
/>

---

### JEP 505: Structured Concurrency (结构化并发 - Preview)
将运行在不同线程中的相关任务视为单个工作单元，简化并发错误处理与取消流程。

---

## 3. 🧠 内存与 GC（Compact Headers、Shenandoah）

### JEP 519: Compact Object Headers (紧凑对象头)
在 64 位 HotSpot JVM 中将对象头大小从 128 位（16 字节）压缩降至 **64 位（8 字节）**，直接降低 10% ~ 20% 的 JVM 堆内存开销！

<DockerOutput
  image="eclipse-temurin:25-jdk-alpine"
  sourceFile="demos/java/jdk25/JEP519_CompactObjectHeaders.java"
/>

---

### JEP 521: Generational Shenandoah (分代 Shenandoah GC)
为 Shenandoah 垃圾回收器引入年轻代与老年代分代回收机制，在维持亚毫秒级低停顿的同时提升 50% 以上的高吞吐量。

<DockerOutput
  image="eclipse-temurin:25-jdk-alpine"
  sourceFile="demos/java/jdk25/JEP521_GenerationalShenandoah.java"
/>

---

## 4. 📜 全部官方 JEP 提案索引清单 (JDK 25 Full JEP Matrix)

| JEP 编号 | JEP 提案名称 | 核心领域 |
| :--- | :--- | :--- |
| **JEP 470** | PEM Encodings of Cryptographic Objects | 密码学 PEM 标准编码 |
| **JEP 502** | Stable Values | 性能与不变性优化 |
| **JEP 503** | Remove the 32-bit x86 Port | 架构清理（废除 32位 x86） |
| **JEP 505** | Structured Concurrency | 结构化并发 |
| **JEP 506** | Scoped Values | 作用域值 |
| **JEP 507** | Primitive Types in Patterns, instanceof, and switch | 基本类型模式匹配 |
| **JEP 508** | Vector API | 向量计算 |
| **JEP 509** | JFR CPU-Time Profiling | JFR CPU 性能剖析 |
| **JEP 510** | Key Derivation Function API | 密钥派生 API |
| **JEP 511** | Module Import Declarations | 模块导入声明 (`import module`) |
| **JEP 512** | Compact Source Files and Instance Main Methods | 隐式类与实例 main |
| **JEP 513** | Flexible Constructor Bodies | 灵活构造函数体 |
| **JEP 514/515**| Ahead-of-Time Profiling & Command-Line Ergonomics | AOT 预热编译优化 |
| **JEP 519** | Compact Object Headers | 紧凑对象头 (8 字节) |
| **JEP 521** | Generational Shenandoah | 分代 Shenandoah GC |

## 版本信息与迁移

- **发布时间 / 标准时间：** 2025 年 9 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
