# JDK 8 LTS

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Oracle JDK 8 Official Release Notes](https://www.oracle.com/java/technologies/javase/8-relnotes.html)  
> JDK 8 引入了 Lambda、Stream API、新的日期时间 API，并用 Metaspace 替代 PermGen。本文按相关 JEP 整理这些变化。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `eclipse-temurin:8-jdk-alpine` 中执行控制台诊断指令 `java -version`：

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/env.out"
/>

---

## 1. 🔀 语法与函数式编程革新 (Syntax & Functional)

### JEP 126: Lambda Expressions & Functional Interfaces
Lambda 表达式允许将代码块作为参数传递，把函数作为一等公民引入 JVM 语言体系。

- **语法**: `(parameters) -> expression` 或 `(parameters) -> { statements; }`
- **函数式接口**: 标注 `@FunctionalInterface` 的接口（有且仅有一个抽象方法）。标准库在 `java.util.function` 集中提供（`Function`, `Predicate`, `Consumer`, `Supplier`）。

```java
@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

public class JEP126_Lambda {
    public static void main(String[] args) {
        MathOperation add = (a, b) -> a + b;
        System.out.println("Lambda Math Operation (10 + 5) = " + add.operate(10, 5));

        List<String> names = Arrays.asList("Alice", "Bob", "Alex");
        List<String> result = names.stream()
                .filter(name -> name.startsWith("A"))
                .map(String::toUpperCase)
                .collect(Collectors.toList());
        System.out.println("Filtered names starting with A: " + result);
    }
}
```

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/JEP126_Lambda.java"
/>

---

### JEP 126 (规范扩展): Method References (方法引用)
提供比 Lambda 更紧凑的调用语法：静态引用 `Integer::parseInt`、实例引用 `String::toUpperCase`、构造器引用 `ArrayList::new`。

```java
BiFunction<String, Integer, String> sub = String::substring;
System.out.println("Static Method Ref: " + sub.apply("HelloWorld", 5));

List<String> names = Arrays.asList("charlie", "alice", "bob");
names.sort(String::compareToIgnoreCase);
```

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/MethodReferenceDemo.java"
/>

---

### JEP 126 (规范扩展): Default & Static Interface Methods (接口默认与静态方法)
在 Interface 中使用 `default` 和 `static` 关键字，解决为类库接口扩展新方法时破坏已有实现类兼容性的难题。

```java
interface Vehicle {
    default String getBrand() { return "Generic Vehicle"; }
    static int getWheelCount() { return 4; }
}
```

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/DefaultMethodsDemo.java"
/>

---

## 2. 🌊 集合与数据管道 (Stream API & Optional)

### JEP 107 & JEP 109: Bulk Data Operations (Stream API)
位于 `java.util.stream` 包，提供对集合数据进行声明式、函数式管道处理的能力，支持 `filter`, `map`, `reduce`, `collect` 及并行流 `parallelStream()`。

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
int sumOfSquares = numbers.parallelStream()
        .filter(n -> n % 2 == 0)
        .mapToInt(n -> n * n)
        .sum();
```

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/JEP107_Streams.java"
/>

---

### JEP 109 (规范扩展): `java.util.Optional<T>` 防空指针容器
优雅解决 NPE (NullPointerException)，提供 `ofNullable()`, `map()`, `orElse()` 链式防护。

```java
String username = null;
String name = Optional.ofNullable(username)
        .map(String::toUpperCase)
        .orElse("DEFAULT_GUEST");
```

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/OptionalDemo.java"
/>

---

## 3. 🧠 JVM 内存：移除 PermGen，引入 Metaspace

### JEP 122: Remove the Permanent Generation (PermGen 废除)
彻底废除了堆内永久代，代之以存在于**本地内存 (Native Memory)** 中的 **元空间 (Metaspace)**。消除了 `OutOfMemoryError: PermGen space` 报错。

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/JEP122_Metaspace.java"
/>

---

## 4. ⚡ 核心数据结构与高并发性能优化 (HashMap Treeification & Concurrency)

### JEP 180: Handle Frequent HashMap Collisions with Balanced Trees (红黑树树化)
当同一个哈希桶内冲突链表长度超过阈值 `TREEIFY_THRESHOLD = 8` 且数组容量 $\ge 64$ 时，链表自动转为**红黑树**，检索复杂度从 $O(n) \to O(\log n)$。

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/JEP180_HashMapTree.java"
/>

---

### JEP 155: Concurrency Updates (`CompletableFuture` & `LongAdder` & `StampedLock`)
提供 `CompletableFuture<T>` 响应式编排、高并发计数 `LongAdder` 以及乐观读锁 `StampedLock`。

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/JEP155_CompletableFuture.java"
/>

---

## 5. 📅 全新日期与时间 API (JSR-310 Date & Time)

### JEP 150: Date and Time API (JSR 310)
引入不可变且线程安全的 `LocalDate`, `LocalTime`, `LocalDateTime`, `ZonedDateTime`, `Instant`, `Period`, `Duration`, `DateTimeFormatter`。

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/JEP150_DateTime.java"
/>

---

## 6. 📜 脚本引擎与标准 Base64 API (Nashorn & Base64)

### JEP 174: Nashorn JavaScript Engine
基于 `invokedynamic` 的高性能 JS 引擎及 `jjs` 命令行工具。

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/JEP174_Nashorn.java"
/>

---

### JEP 135: Base64 Encoding & Decoding API
内置官方标准 `java.util.Base64`。

```java
String encoded = Base64.getEncoder().encodeToString("Hello Java 8 Base64".getBytes());
```

<DockerOutput
  image="eclipse-temurin:8-jdk-alpine"
  sourceFile="demos/java/jdk8/JEP135_Base64.java"
/>

---

## 📜 全部官方 JEP 提案索引清单 (JDK 8 Key JEP Matrix)

| JEP 编号 | JEP 提案名称 | 核心领域 |
| :--- | :--- | :--- |
| **JEP 103** | Parallel Array Sorting | 并行数组排序 (`Arrays.parallelSort()`) |
| **JEP 107** | Bulk Data Operations for Collections | Stream API 集合批量数据处理 |
| **JEP 109** | Enhance Core Libraries with Lambda | 核心类库支持 Lambda (`java.util.function`, `Optional`) |
| **JEP 122** | Remove the Permanent Generation | 废除永久代 (PermGen)，引入元空间 (Metaspace) |
| **JEP 126** | Lambda Expressions for Java | Lambda 表达式、接口默认方法与方法引用 |
| **JEP 135** | Base64 Encoding & Decoding | 标准 Base64 编解码 API |
| **JEP 150** | Date and Time API | JSR-310 全新日期时间体系 |
| **JEP 155** | Concurrency Updates | 并发更新 (`CompletableFuture`, `LongAdder`, `StampedLock`) |
| **JEP 174** | Nashorn JavaScript Engine | Nashorn JS 脚本引擎 |
| **JEP 180** | Handle Frequent HashMap Collisions with Balanced Trees | HashMap 冲突链表红黑树树化 $O(\log n)$ |

## 版本信息与迁移

- **发布时间 / 标准时间：** 2014 年 3 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 目标 JDK、JVM 发行版，以及 Jakarta EE、GraalVM 或应用服务器的独立兼容矩阵

**迁移影响：** 升级时先处理移除模块、弃用 JVM 参数、`javax.*`/`jakarta.*` 边界、框架与字节码工具兼容性，再在目标 GC、容器和 CPU 架构上做回归与性能验证。

## 版本确认

```bash
java --version
javac --version
```

资料核对日期：2026-08-27。
