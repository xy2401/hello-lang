# Groovy 编译与运行

官方命令说明见 [Groovy command line](https://groovy-lang.org/groovyconsole.html) 与 [Groovy 编译器文档](https://docs.groovy-lang.org/latest/html/documentation/tools-groovyc.html)。先确认 JVM 与 Groovy 实际版本：

```bash
java --version
groovy --version
groovyc --version
```

## 直接运行脚本

```groovy
def target = args ? args[0] : 'Groovy'
println "Hello, $target"
```

```bash
groovy hello.groovy JVM
groovy -e 'println System.getProperty("os.arch")'
```

脚本后的参数进入 `args`。命令退出码来自未捕获异常或显式 `System.exit(code)`，可用 `groovy hello.groovy; echo $?` 检查。

## 编译 class

```bash
mkdir -p out
groovyc -d out hello.groovy
java -cp "out:$GROOVY_HOME/lib/*" hello JVM
```

`groovyc` 生成 JVM 字节码，但通常仍需要 Groovy Runtime。若代码使用 `@CompileStatic`，它改变类型检查和调用路径，不意味着自动移除运行时依赖。

## 交互与类路径

```bash
groovysh
groovy -cp libs/example.jar hello.groovy
groovyConsole hello.groovy
```

`groovysh` 适合检查表达式和 Java 互操作；`groovyConsole` 需要图形环境，服务器或浏览器容器中通常不可用。依赖较多时使用 Gradle/Maven 管理 classpath，不要手写不断增长的 `-cp`。

## 联合编译与运行边界

Groovy 可以调用 Java 类，Java 也可以调用已经编译的 Groovy class。两种源码互相引用时应交给 Gradle Groovy 插件或 Maven 的 GMavenPlus 组织联合编译，不要依赖文件碰巧先后出现。

```bash
find src -type f -name '*.groovy' -print
groovyc -d out src/Hello.groovy
javap -classpath out Hello
java -cp "out:$GROOVY_HOME/lib/*" Hello
```

`groovy` 直接执行适合脚本和教学，`groovyc` 适合检查可重复编译结果，工程产物则应由构建工具记录源码目录、JDK、Groovy Runtime 与依赖版本。`hello-lang-version` 可以一次显示共享 JVM 资产中的 Java、Kotlin、Groovy、Scala 与 Clojure 工具版本。

资料核对日期：2026-08-28。
