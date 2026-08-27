# Kotlin 安装与切换

Kotlin/JVM 编译器依赖 JDK；Android Studio、IntelliJ IDEA 内置的插件不等于命令行编译器。官方文档支持 SDKMAN、Homebrew、Snap 和手工编译器包。

- [Kotlin 命令行编译器](https://kotlinlang.org/docs/command-line.html)
- [Kotlin 发布页](https://github.com/JetBrains/kotlin/releases)
- [SDKMAN Kotlin](https://sdkman.io/sdks/kotlin)

## 推荐方式

命令行学习用 SDKMAN 同时管理 JDK 与 Kotlin；项目构建优先让 Gradle/Maven 插件固定 Kotlin 版本，不依赖全局 `kotlinc`。

## SDKMAN 与包管理器

~~~bash
sdk install java 25-tem
sdk install kotlin
brew install kotlin                 # Homebrew 社区维护
sudo snap install --classic kotlin  # Snap 发布渠道
~~~

## 手工编译器

Windows 或离线环境可从 JetBrains 官方 GitHub Releases 下载例如 `kotlin-compiler-2.3.0.zip` 的明确版本，校验后解压并把其 `bin` 加入用户 PATH。不要从 Maven 缓存中拼装一个全局编译器。

## 版本切换

~~~bash
sdk list kotlin
sdk use kotlin 2.3.0
sdk default kotlin 2.3.0
sdk current kotlin
~~~

Gradle 项目应在插件声明中固定版本，它比全局 SDKMAN 选择优先。

## Docker

~~~bash
docker run --rm eclipse-temurin:25-jdk-alpine java -version
~~~

Kotlin 没有需要长期运行的官方语言服务镜像；容器构建应由 Gradle/Maven wrapper 下载项目锁定的 Kotlin 编译器。

## 安装验证

~~~bash
java -version
kotlinc -version
kotlin -version
command -v kotlinc
~~~

## 升级、卸载与冲突

SDKMAN 用 `sdk upgrade kotlin` 与例如 `sdk uninstall kotlin 2.3.0`；Homebrew/Snap 由原渠道升级。PATH 中若同时存在 IDE、SDKMAN 和手工 ZIP 的 `kotlinc`，以 `command -v` 结果为准。

## 官方资料

- [Kotlin 命令行编译器](https://kotlinlang.org/docs/command-line.html)
- [Kotlin 发布页](https://github.com/JetBrains/kotlin/releases)
- [SDKMAN Kotlin](https://sdkman.io/sdks/kotlin)

资料核对日期：2026-08-27。
