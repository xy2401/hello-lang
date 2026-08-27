# Kotlin 依赖与包管理

Kotlin 没有独立于目标平台的统一包仓库。Kotlin/JVM 主要使用 Maven Central 与 Gradle/Maven，Kotlin Multiplatform 则以 Gradle 和 Kotlin 插件为事实标准；SDKMAN 只负责 JDK/Kotlin 命令行工具版本，不管理项目库。

- [Kotlin 与 Gradle](https://kotlinlang.org/docs/gradle.html)
- [Kotlin Multiplatform 依赖](https://kotlinlang.org/docs/multiplatform-add-dependencies.html)
- [Gradle 依赖管理](https://docs.gradle.org/current/userguide/core_dependency_management.html)
- [Maven 中使用 Kotlin](https://kotlinlang.org/docs/maven.html)

## 从 JVM 工具链到 Kotlin DSL

早期 Kotlin/JVM 项目沿用 Java 的手工 JAR、Ant 或 Maven。随着 Kotlin Gradle Plugin 和 Kotlin DSL 成熟，Gradle 成为 JVM、Android、JS、Native 与 Multiplatform 统一构建入口。依赖仍通常来自 Maven Central、Google Maven 等仓库。

| 方案 | 优点 | 缺点 | 推荐用途 |
| --- | --- | --- | --- |
| 手工 classpath | 无额外构建工具 | 无传递解析和来源记录，编译器插件难维护 | 只读遗留示例 |
| Maven | 生命周期稳定、企业插件成熟、Java/Kotlin 混编清晰 | Multiplatform 支持有限，XML 配置较长 | 单一 Kotlin/JVM 服务或库 |
| Gradle Groovy DSL | 资料多、旧项目常见 | 动态 DSL 对 Kotlin 开发者不够直观 | 维护既有 Gradle 项目 |
| Gradle Kotlin DSL | 类型提示好、KMP/Android 支持完整 | Gradle 模型和插件兼容仍需学习 | 新 Kotlin、Android 与 KMP 项目 |

新 Kotlin/JVM 项目通常选择 Gradle Kotlin DSL；已有标准 Maven 基础设施的单 JVM 项目继续使用 Maven没有问题；KMP 项目直接选择 Gradle。

## Gradle 基本工作流

`build.gradle.kts` 同时固定 Kotlin 插件和库版本：

```kotlin
plugins {
    kotlin("jvm") version "2.3.0"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")
    testImplementation(kotlin("test"))
}
```

```bash
gradle wrapper
./gradlew dependencies
./gradlew dependencyInsight --dependency kotlinx-coroutines-core
./gradlew test
```

删除依赖时修改对应 source set 的 `dependencies`，然后重新构建。升级 Kotlin 插件时同时核对 Gradle、JDK、Compose、KSP 和 kotlinx 库兼容范围，不要只改一个版本号。

## KMP 的依赖边界

Multiplatform 项目按 source set 声明依赖：公共代码放 `commonMain`，平台库放 `jvmMain`、`iosMain` 等。公共依赖必须真正支持目标集合，JVM 构件不能因为能解析就放进 `commonMain`。

```kotlin
kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.9.0")
        }
    }
}
```

## 锁定、缓存与验证

启用 Gradle dependency locking，提交锁文件；大型项目再使用 version catalog 统一坐标。执行：

```bash
./gradlew dependencies --write-locks
./gradlew --write-verification-metadata sha256 help
./gradlew --offline test
```

`--offline` 只验证缓存能否满足当前解析结果，不代表依赖来源可信。镜像地址和凭据应放在 Gradle 用户配置或受控环境变量中；仓库内容筛选可以防止同名构件从错误仓库解析。

Maven 项目使用 `dependency:tree`、BOM 和 Wrapper；Gradle 项目使用 `dependencyInsight`、锁文件、verification metadata 与 Wrapper。两种构建中都应明确 Kotlin 插件版本，不能依赖全局 `kotlinc`。

完整性验证不会发现已知漏洞。Kotlin/JVM 项目还应使用组织选定的 JVM 漏洞数据库扫描 Gradle/Maven 解析树；Kotlin/Native 与 KMP 则要同时检查平台依赖。扫描报告、锁文件差异和插件兼容性应作为同一次升级评审的独立证据。

资料核对日期：2026-08-28。
