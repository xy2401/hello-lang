# Java 编译与运行

Java 的基础命令链是 `javac` 将源码编译为字节码，再由 `java` 启动 JVM。`jshell` 用于交互试验，`jar` 用于整理 class 文件；本页不展开 Maven 或 Gradle 项目流程。

- [javac](https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html)
- [java](https://docs.oracle.com/en/java/javase/25/docs/specs/man/java.html)
- [JShell](https://docs.oracle.com/en/java/javase/25/jshell/)
- [jar](https://docs.oracle.com/en/java/javase/25/docs/specs/man/jar.html)

## 确认工具链

```bash
java -version
javac -version
jshell --version
```

`java` 与 `javac` 应来自同一套 JDK。若版本不一致，先检查 `PATH`、`JAVA_HOME` 和版本管理器当前选择。

## 编译和运行单文件

假设 `Hello.java` 包含公开类 `Hello`：

```java
public class Hello {
    public static void main(String[] args) {
        String name = args.length > 0 ? args[0] : "world";
        System.out.println("Hello, " + name);
    }
}
```

```bash
javac -encoding UTF-8 -d out Hello.java
java -cp out Hello Alice
```

现代 JDK 也能直接启动单个源码文件，适合小示例：

```bash
java Hello.java Alice
```

源码启动模式仍会执行编译检查，但不会替代正式构建过程。

## 交互与标准输入

```bash
jshell
```

```text
jshell> int total = 2 + 3
jshell> System.out.println(total)
jshell> /vars
jshell> /exit
```

程序从 `System.in` 读取时可使用重定向：

```bash
java -cp out Hello < input.txt
```

## 打包与退出码

```bash
jar --create --file hello.jar --main-class Hello -C out .
java -jar hello.jar Alice
jar --list --file hello.jar
```

未捕获异常和 `System.exit(非零值)` 会让进程失败。Shell 中应立即检查 `$?`（PowerShell 使用 `$LASTEXITCODE`），不要只看标准输出。

常见错误中，`ClassNotFoundException` 多与 classpath 或类名有关，`UnsupportedClassVersionError` 表示运行时 JDK 比编译目标旧；例如需要生成 JDK 21 兼容字节码时使用 `javac --release 21`。

资料核对日期：2026-08-28。
