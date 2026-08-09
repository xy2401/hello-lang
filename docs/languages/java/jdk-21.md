# JDK 21 LTS 官方 Release Notes 深度拆解大典

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [OpenJDK JDK 21 Official Features & Release Notes](https://openjdk.org/projects/jdk/21/)  
> JDK 21 是现代 Java 发展史上的里程碑式 LTS 长期支持版本。它包含了著名的 **Project Loom (虚拟线程)**、**Project Panama (FFM API)** 以及语言层面解构匹配与有序集合的重大变革。本文严格按照 OpenJDK 官方 15 个 JEP 提案进行系统化规范梳理。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `eclipse-temurin:21-jdk-alpine` 中执行控制台诊断指令 `java -version`：

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/jdk21/env.out"
/>

---

## 1. ⚡ 协程级轻量高并发 (Project Loom)

### JEP 444: Virtual Threads (轻量级虚拟线程)
在 JVM 层面引入由 JVM 管理而非 OS 线程管理的轻量级虚拟线程（M:N 调度），将传统并发吞吐量提升数倍，单 JVM 可支持百万级并发任务。

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(10);
            return i;
        });
    });
}
```

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/jdk21/JEP444_VirtualThreads.java"
/>

---

## 2. 🧩 集合与模式匹配革命 (Language & Collections)

### JEP 431: Sequenced Collections (有序集合)
为 `List`, `Deque`, `Set` 补全统一的头部与尾部访问与反转视图 API（`getFirst()`, `getLast()`, `addFirst()`, `addLast()`, `reversed()`）。

```java
SequencedCollection<String> list = new ArrayList<>(List.of("Alpha", "Beta", "Gamma"));
list.addLast("Omega");
System.out.println("First: " + list.getFirst() + ", Reversed: " + list.reversed());
```

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/jdk21/JEP431_SequencedCollections.java"
/>

---

### JEP 440: Record Patterns (Record 结构解构模式)
允许直接在 `instanceof` 和 `switch` 中解构 Record 内部成员。

```java
if (obj instanceof Rectangle(Point(int x1, int y1), Point(int x2, int y2))) {
    int area = Math.abs(x2 - x1) * Math.abs(y2 - y1);
}
```

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/jdk21/JEP440_RecordPatterns.java"
/>

---

### JEP 441: Pattern Matching for switch (正式版)
扩展 `switch` 表达式，支持类型匹配、`null` 处理以及 `when` 保护子句。

```java
String formatted = switch (obj) {
    case Integer i -> String.format("int %d", i);
    case String s when s.length() > 5 -> "Long string: " + s;
    case String s -> "Short string: " + s;
    case null, default -> "Unknown";
};
```

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/jdk21/JEP441_SwitchPattern.java"
/>

---

### JEP 443: Unnamed Patterns and Variables (Preview - 匿名变量 `_`)
允许在解构和变量声明中使用下划线 `_` 标记不使用的占位变量。

---

## 3. 🧠 垃圾回收与性能优化 (Generational ZGC)

### JEP 439: Generational ZGC (分代 ZGC)
为 ZGC 引入年轻代与老年代独立回收算法（`-XX:+UseZGC -XX:+ZGenerational`），在保持 <1ms 超低延迟停顿的同时提高 40% 的内存吞吐效率。

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/jdk21/JEP439_GenerationalZGC.java"
/>

---

## 4. 📜 全部 15 个官方 JEP 提案索引清单 (JDK 21 Full JEP Matrix)

| JEP 编号 | JEP 提案名称 | 状态 | 核心领域 |
| :--- | :--- | :--- | :--- |
| **JEP 430** | String Templates | Preview | 字符串模板与安全插值 |
| **JEP 431** | Sequenced Collections | **正式版** | 统一有序集合 API |
| **JEP 439** | Generational ZGC | **正式版** | 分代 ZGC 低延迟高吞吐垃圾回收 |
| **JEP 440** | Record Patterns | **正式版** | Record 结构解构匹配 |
| **JEP 441** | Pattern Matching for switch | **正式版** | switch 模式匹配 |
| **JEP 442** | Foreign Function & Memory API | Third Preview | Native C/C++ 内存交互 (Panama) |
| **JEP 443** | Unnamed Patterns and Variables | Preview | 下划线 `_` 匿名变量与模式 |
| **JEP 444** | Virtual Threads | **正式版** | 虚拟线程 (Project Loom) |
| **JEP 445** | Unnamed Classes and Instance Main Methods | Preview | 隐式类与实例 main 入口 |
| **JEP 446** | Scoped Values | Preview | 作用域值 |
| **JEP 448** | Vector API | Sixth Incubator | 向量计算 |
| **JEP 449** | Deprecate Windows 32-bit x86 Port | Deprecated | 废弃 Windows 32位 x86 支持 |
| **JEP 451** | Prepare to Disallow Dynamic Loading of Agents | Warning | 动态 Agent 加载预警 |
| **JEP 452** | Key Encapsulation Mechanism (KEM) API | **正式版** | 密码学密钥封装机制 API |
| **JEP 453** | Structured Concurrency | Preview | 结构化并发 |
