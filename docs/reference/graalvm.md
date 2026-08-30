---
title: GraalVM & Truffle：通用 Polyglot 多语言运行时
description: 深入解析 GraalVM 25.x 体系（JVM + Truffle + LLVM Sulong 三合一架构）、支持语言全景、跨语言零开销互操作与“统一运行时”评测哲学。
---

# GraalVM & Truffle：通用 Polyglot 多语言运行时

如果你心中的目标是：**“构建一个统一平台，可以塞进 20 种语言，在同一个环境中统一执行、互相调用、共享对象并横向测速”**，那么 **GraalVM** 及其核心子系统 **Truffle** 正是目前工业界中最接近这一愿景的 **Polyglot（多语言通用运行时）**。

截至 GraalVM 25.x，它已经演进为一个将 **JVM 字节码 + Truffle AST 动态语言 + LLVM Bitcode 原生代码** 全部聚合于单一进程内的巨型统一运行时：

```text
  【JVM 体系】
  Java / Kotlin / Scala / Clojure / Groovy ──→ JVM Bytecode ──────┐
                                                                  │
  【Truffle 多语言体系】                                          │
  JavaScript / TypeScript (GraalJS) ─────────────────────────────┤
  Python (GraalPy) ──────────────────────────────────────────────┼──→ [ GraalVM Polyglot 运行时 ]
  Ruby (TruffleRuby) ────────────────────────────────────────────┤    ├─ 共享托管堆内存
  R (FastR) / WebAssembly (GraalWasm) ───────────────────────────┤    ├─ 通用互操作协议 (Interop)
  Java on Truffle (Espresso) / Lua / Prolog 等 ──────────────────┤    └─ Graal JIT 动态优化与跨语言内联
                                                                  │          ↓
  【LLVM 原生体系 (Sulong 引擎)】                                  │     高效物理机器码 / Native Image
  C / C++ / Fortran (经 Clang/Flang 生成 LLVM Bitcode) ──────────┘
  (理论拓展：Rust / Swift / D 生成的兼容 LLVM Bitcode)
```

---

## 1. GraalVM 多语言生态全景

GraalVM 官方与社区目前已覆盖了惊人宽广的语言生态，大致分为三个层级：

### ① 官方主力核心语言（Graal Languages）
- **JavaScript / TypeScript (`GraalJS`)**：完全符合 ECMAScript 最新规范，性能可与 V8 媲美，并可与 Java 直接互操作。
- **Python (`GraalPy`)**：现代 Python 3.11+ 实现，支持标准库与核心科学计算包（NumPy 互操作逐步成熟）。
- **WebAssembly (`GraalWasm`)**：在 JVM 中直接以沙箱形式安全高效执行 WASM 二进制模块。
- **Java bytecode (`Espresso`)**：用 Truffle 本身实现的 Java 虚拟机，支持在同一个进程中沙箱隔离运行其他 Java 代码与热重载。

### ② Truffle 生态语言实现（成熟度各异）
- **Ruby (`TruffleRuby`)**：目前性能最高的 Ruby 运行时之一，在长周期计算中吞吐量经常大幅超越 CRuby 与 JRuby。
- **R (`FastR`)**：高性能 R 语言实现，支持直接复用 Java 内存中的大数据集进行统计建模。
- **研究与实验性实现**：Smalltalk、Lua、Prolog、Pascal、Oz、PureScript、Newspeak、Brainfuck 等。

### ③ “作弊级”能力：LLVM Runtime (`Sulong`)
GraalVM 最独特的地方在于它自带名为 **Sulong** 的 LLVM 运行时：
- 它能够直接加载由 **Clang / Flang** 等编译器生成的 **LLVM Bitcode (`.bc`)** 文件。
- Sulong 把 LLVM Bitcode 作为一种 Truffle 语言进行解释，并由 **Graal JIT 对热点原生代码进行动态编译与即时优化**。
- 这意味着：**C/C++、Fortran 甚至部分 Rust 编译出来的 bitcode 也可以直接塞入 GraalVM 内部运行！**

---

## 2. 真正的多语言零开销互操作（Zero-Overhead Interop）

传统跨语言调用（如 Java 调 Python，或 Node.js 调 C++）必须依赖繁琐的 JNI/FFI，需要对数据进行深拷贝或序列化打包，且无法跨语言内联优化。

在 GraalVM 内部，所有语言的对象都遵循统一的 **Truffle Interoperability Protocol**：
- **同一堆内存**：Python 对象、JS 对象、Java 实例在同一进程堆中分配。
- **跨语言 JIT 内联（Cross-Language Inlining）**：Graal 编译器在即时编译时，能够把一段 Java 方法中调用的 Python 函数体、甚至 Python 函数中调用的 C 动态函数直接**展开内联到同一个机器码编译单元**内！

示例代码（在 Java 宿主中无缝混用 JavaScript 与 Python）：
```java
import org.graalvm.polyglot.*;

try (Context context = Context.newBuilder().allowAllAccess(true).build()) {
    // 1. 在 JS 引擎中构建复杂业务数据
    Value userJs = context.eval("js", "({ name: 'Alice', scores: [95, 88, 92] })");

    // 2. 无需序列化，直接注入 Python 上下文
    context.getBindings("python").putMember("user", userJs);

    // 3. Python 像本地对象一样操作 JS 对象的字段与数组
    context.eval("python", """
        total = sum(user.scores)
        print(f"用户 {user.name} 的总分是: {total}")
    """);
}
```

---

## 3. 核心哲学抉择：控制“编译后端相同”还是“最终运行时相同”？

如果你的目标是评测、比较或承载 20 种编程语言，现在面临两个截然不同的设计维度：

| 评估维度 | 方案 A：LLVM 路线 | 方案 B：GraalVM 体系 |
| :--- | :--- | :--- |
| **你的控制变量** | **控制“编译后端相同”**（Shared Compiler Backend） | **控制“最终运行时相同”**（Shared Polyglot Runtime） |
| **语言如何接入** | 每门语言编译到 **LLVM IR**，由 LLVM 生成独立的 Native 二进制 | 编译为字节码、Truffle AST 或 LLVM Bitcode，由 Graal 统一托管 |
| **覆盖语言范围** | C, C++, Rust, Swift, Fortran, Zig, Julia, D, Haskell, Crystal, CUDA 等（~15+ 种） | Java, Kotlin, Scala, JS, Python, Ruby, R, WASM, C/C++, Fortran 等（~20+ 种） |
| **执行模型** | 纯 AOT 静态机器码（无中央运行时） | JIT 即时编译 + 统一垃圾回收 + 跨语言内联调用 |
| **多语言交互** | 只能通过系统 C ABI 进行外部通信（有边界开销） | **零开销互通**（同一进程空间共享对象与上下文） |
| **性能测试本质** | **测试“各语言前端优化 + 原生机器码”的极限性能** | **测试“统一托管虚拟机与自适应 JIT”的动态吞吐量** |

---

## 4. 总结

- 如果你的核心诉求是**“看 20 种语言谁能编译出最快的独立二进制”**，应当选择 **LLVM 路线**。
- 如果你的核心诉求是**“让 20 种语言在一个统一平台里像装插件一样运行与交互”**，那么 **GraalVM** 是目前最强大、最完备的工业级方案。
