# Groovy 总览

Groovy 是运行在 JVM 上的动态、多范式语言，能够直接调用 Java 类库，也支持可选类型、静态类型检查和静态编译。它常见于 Gradle 构建脚本、Jenkins Pipeline、测试 DSL 与需要快速迭代的 JVM 应用。

```groovy
record User(String name) {}
def users = [new User('Ada'), new User('Linus')]
println users*.name.collect { it.toUpperCase() }
```

Groovy 源码可由 `groovy` 直接执行，也可由 `groovyc` 编译为 JVM class。浏览器实验与 Java、Kotlin、Scala、Clojure共用一份 OpenJDK 25 运行时，避免重复下载 JDK。

## 能力边界

- 动态语法适合脚本与 DSL；`@CompileStatic` 可在需要时提高类型约束。
- 与 Java 的互操作是核心优势，但元编程行为仍需 Groovy Runtime。
- Gradle 使用的 Groovy 版本由 Gradle 自身管理，不应被系统 `groovy` 命令替换。
