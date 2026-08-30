# Groovy 依赖与包管理

Groovy 提供脚本运行器和编译器，但真实项目主要使用 Gradle 或 Maven 管理依赖。官方资料包括 [Groovy Grape](https://groovy-lang.org/grape.html)、[Gradle Groovy 插件](https://docs.gradle.org/current/userguide/groovy_plugin.html) 和 [GMavenPlus](https://groovy.github.io/GMavenPlus/)。

## 从手工 JAR 到构建工具

早期脚本会下载 JAR 放入 `lib/` 并手工拼 classpath。这种方式直观，却没有传递依赖解析、冲突报告、锁定和漏洞审计。Groovy 的 Grape 以 Apache Ivy 作为解析基础，用 `@Grab` 把依赖声明写进脚本，适合一次性工具：

```groovy
@Grab('org.apache.commons:commons-csv:1.14.1')
import org.apache.commons.csv.CSVFormat
println CSVFormat.DEFAULT
```

Grape 的优点是单文件方便，缺点是首次运行才下载、缓存状态不明显，也不适合可复现生产构建。缓存通常位于 `~/.groovy/grapes`，离线交付前必须明确填充和校验。

## Gradle

```groovy
plugins {
    id 'groovy'
    id 'application'
}
repositories { mavenCentral() }
dependencies {
    implementation platform('org.apache.groovy:groovy-bom:5.1.0')
    implementation 'org.apache.groovy:groovy'
}
```

Gradle 的优势是 Groovy/Java 混合编译、增量构建、Wrapper 和依赖锁；限制是 DSL 灵活度高，遗留脚本可能难以理解。使用依赖树和 insight 检查冲突，用 dependency locking 与 verification metadata 固定版本和完整性。

```bash
./gradlew dependencies
./gradlew dependencyInsight --dependency groovy
./gradlew dependencies --write-locks
```

升级时同时核对 Gradle 内置 Groovy、项目 Groovy 和 Spock 的兼容线。Gradle 自身使用的 Groovy 不能通过应用的 `implementation` 依赖替换。

## Maven

Maven 通过 `pom.xml`、Maven Central 和 GMavenPlus 组织编译。优势是约定稳定、企业仓库支持成熟；缺点是 Groovy/Java 联合编译配置更显式，复杂任务不如 Gradle 灵活。

```xml
<dependency>
  <groupId>org.apache.groovy</groupId>
  <artifactId>groovy</artifactId>
  <version>5.1.0</version>
</dependency>
```

```bash
mvn dependency:tree
mvn dependency:go-offline
mvn versions:display-dependency-updates
```

Maven 本地缓存位于 `~/.m2/repository`，Gradle 缓存通常位于 `~/.gradle/caches`。缓存不是锁文件；清单仍须固定坐标，CI 应使用 Wrapper 和受控仓库。完整性由仓库 checksum、Gradle verification metadata 或企业代理仓库验证。

## 安全与选择

漏洞检查可接入 OWASP Dependency-Check，并结合 Groovy、Java 与具体库的安全公告判断可达性。`dependencyInsight` 或 `dependency:tree` 用于确认漏洞版本来自直接依赖还是传递依赖，不能只删除缓存掩盖问题。

- 单文件自动化：Grape，但固定坐标并提前填充缓存。
- 新 JVM 应用或 Gradle 插件：Gradle Wrapper，启用依赖锁和校验元数据。
- 现有 Maven 多模块项目：继续 Maven 与 GMavenPlus。
- Jenkins Pipeline：Groovy 版本由 Jenkins 管理，不能由流水线脚本随意替换。

提交 Wrapper、清单、锁定信息和仓库配置，避免依赖开发机缓存的偶然状态。优点、缺点与适合场景应围绕团队已有构建体系决定，而不是只比较命令长短。

资料核对日期：2026-08-28。
