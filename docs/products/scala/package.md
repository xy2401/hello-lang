# Scala 依赖与包管理

Scala 依赖发布在 Maven 仓库，但工具还必须处理 Scala 二进制版本、编译器插件和跨平台后缀。官方资料见 [sbt dependency management](https://www.scala-sbt.org/1.x/docs/Library-Dependencies.html)、[Scala 构建工具概览](https://docs.scala-lang.org/overviews/scala-book/scala-build-tool-sbt.html)、[Scala CLI dependencies](https://scala-cli.virtuslab.org/docs/guides/introduction/dependencies/) 和 [Mill Java/Scala](https://mill-build.org/mill/javalib/intro.html)。

## 演进与角色

手工下载 JAR 只能处理最简单 classpath。sbt 长期作为 Scala 项目主流构建工具，Coursier 提供底层依赖解析和应用安装；Scala CLI 面向脚本与中小项目的一体化体验，Mill 则以显式任务图和较快反馈提供替代方案。Maven 和 Gradle 也能通过 Scala 插件接入现有 JVM 多模块构建，但需要额外核对编译器插件、二进制后缀和增量编译行为。

运行时版本管理器负责 JDK 或全局 CLI，包管理器负责解析 Maven 坐标，构建工具负责编译、测试与产物。三者不能相互替代。

## sbt

```scala
// build.sbt
ThisBuild / scalaVersion := "3.3.8"
libraryDependencies ++= Seq(
  "com.lihaoyi" %% "os-lib" % "0.11.5"
)
```

`%%` 会加入 Scala 二进制后缀，不能机械替换为普通 `%`。sbt 的优势是插件和 Scala 生态成熟、增量编译稳定；缺点是启动与构建定义学习成本较高，插件兼容性也要纳入升级。

```bash
sbt dependencyTree
sbt evicted
sbt update
sbt clean test package
```

使用 sbt launcher 和 `project/build.properties` 固定工具版本。锁定可采用 Coursier/sbt lock 插件或企业解析策略；无论采用哪种方案，都要提交生成文件并在 CI 执行冻结解析。

## Scala CLI 与 Mill

```scala
//> using scala "3.3.8"
//> using dep "com.lihaoyi::os-lib:0.11.5"
@main def run() = println(os.pwd)
```

```bash
scala-cli compile .
scala-cli test .
scala-cli export --sbt .
```

Scala CLI 的优点是单文件和小项目启动快、指令直接；限制是复杂多模块与高度定制发布仍可能更适合 sbt/Mill。Mill 使用 `build.mill` 与显式模块，优点是任务关系清楚、缓存友好，缺点是团队和插件覆盖不如 sbt 普遍。

## 缓存、完整性与升级

Coursier 缓存通常位于用户缓存目录，Ivy/Maven 还可能使用 `~/.ivy2`、`~/.m2`。缓存只是下载加速，不等同于 lockfile。清理缓存前先用依赖树确认冲突，离线构建则应由受控代理仓库提供经过校验的制品。

```bash
cs resolve org.typelevel::cats-core:2.13.0
cs fetch --classpath org.typelevel::cats-core:2.13.0
sbt reload update evicted
```

升级 Scala 3 小版本时检查 TASTy 与插件兼容；Scala 2.12、2.13 和 Scala 3 的 `_2.12`、`_2.13`、`_3` 制品不能混用。漏洞检查可用 OWASP Dependency-Check、GitHub Advisory 或仓库安全扫描，但仍需结合依赖树判断漏洞路径。

## 选择建议

- 教程、脚本和小工具：Scala CLI，源码中固定版本和依赖。
- 成熟服务或插件生态项目：sbt，固定 launcher、插件与 Scala 版本。
- 追求显式任务图和快速增量反馈：评估 Mill。
- 遗留 Scala 2 项目：先保持原二进制线，再按迁移指南逐库验证，不在一次提交中同时换构建工具。

任何方案都应记录仓库、版本、完整性、缓存策略和漏洞处理。优点、缺点与适合场景必须结合项目规模和二进制兼容要求判断。

资料核对日期：2026-08-28。
