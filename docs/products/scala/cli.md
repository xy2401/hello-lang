# Scala 编译与运行

官方入口见 [Scala 3 command-line tools](https://docs.scala-lang.org/scala3/book/tools-compiler.html) 与 [Scala 3 REPL](https://docs.scala-lang.org/scala3/book/taste-repl.html)。

```bash
java --version
scala -version
scalac -version
```

## 编译并运行

```scala
// hello.scala
@main def hello(name: String = "Scala") =
  println(s"Hello, $name")
```

```bash
mkdir -p out
scalac -d out hello.scala
scala -classpath out hello JVM
echo $?
```

Scala 3 的 `@main` 会生成可启动入口。参数解析失败或未捕获异常会返回非零退出码；生产脚本不要依赖 REPL 的交互提示判断成功。

## 单文件与 REPL

```bash
scala hello.scala JVM
scala
scala -classpath libs/example.jar
```

具体发行版对直接运行 `.scala` 的能力可能不同；需要稳定构建时明确执行 `scalac`。REPL 适合检查类型推断、集合变换与 Java API，不承担项目依赖锁定。

## JAR 与 Java 互操作

```bash
jar --create --file hello.jar -C out .
scala -classpath hello.jar hello
javap -classpath out hello
```

Scala class 依赖 Scala 标准库，不能把普通 class 目录误当成无依赖 Java 应用。工程项目使用 sbt、Mill 或 Scala CLI 生成可复现 classpath 和发行包。

## 多源码与产物检查

入口和普通类型可以分文件编译，输出目录必须同时保留生成的 class 与 TASTy 元数据。不要只复制某一个主类文件：Scala 3 的后续编译和工具分析可能依赖 `.tasty`。

```bash
find src -type f -name '*.scala' -print
scalac -d out src/model.scala src/main.scala
find out -type f -maxdepth 3 -print
scala -classpath out hello
javap -classpath out hello
```

共享 JVM 浏览器资产固定 Scala 3.3 LTS，产品页面显示的 Scala 标题和示例仍然独立。对于真实项目，命令行编译只是最低层验证；sbt、Mill 或 Scala CLI 还要负责依赖后缀、增量编译、测试和可发布产物。升级编译器后应清空旧 class/TASTy 目录再重新构建。

资料核对日期：2026-08-28。
