# Kotlin 编译与运行

Kotlin/JVM 命令行工具使用 `kotlinc` 编译源码，可由 `kotlin` 启动 classpath 中的入口，也可生成包含 Kotlin 运行时的可执行 JAR。以下只覆盖单文件流程。

- [Kotlin 命令行编译器](https://kotlinlang.org/docs/command-line.html)
- [Kotlin 编译器选项](https://kotlinlang.org/docs/compiler-reference.html)
- [Kotlin/JVM](https://kotlinlang.org/docs/jvm-get-started.html)

## 确认编译器与 JVM

```bash
kotlinc -version
kotlin -version
java -version
```

Kotlin/JVM 需要可用 JDK。编译器与运行时版本差异过大时，可能出现 metadata 或字节码兼容错误。

## 编译并运行 JAR

`hello.kt`：

```kotlin
fun main(args: Array<String>) {
    val name = args.firstOrNull() ?: "world"
    println("Hello, $name")
}
```

```bash
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar Alice
```

`-include-runtime` 把所需 Kotlin 运行时放进 JAR，便于单文件演示，但会增加体积。

## 运行 class 文件

```bash
kotlinc hello.kt -d out
kotlin -classpath out HelloKt Alice
```

顶层函数所在的生成类通常以文件名加 `Kt` 命名。若声明了 package，启动时必须使用完整限定类名。

## 脚本与交互

```bash
kotlinc -script hello.kts -- Alice
kotlinc
```

`.kts` 使用脚本模式；普通 `.kt` 与脚本的解析和依赖模型不同。无参数运行编译器时可进入交互环境，输入 `:quit` 退出。

## 参数与退出码

参数来自 `main(args)`。明确失败状态可使用 `kotlin.system.exitProcess(2)`；未捕获异常也会使 JVM 进程失败。编译报错时先确认目标 JVM、classpath、package 与入口类，不要通过把所有 JAR 都加入 classpath 来掩盖依赖冲突。

资料核对日期：2026-08-28。
