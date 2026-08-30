# Scala 安装与切换

官方来源包括 [Scala 下载页](https://www.scala-lang.org/download/)、[Scala 3 安装说明](https://docs.scala-lang.org/getting-started/install-scala.html) 和 [Coursier](https://get-coursier.io/docs/cli-installation)。Scala 运行需要 JDK，项目开始前先固定 Java 与 Scala 两条版本线。

## 推荐安装

Coursier 是 Scala 生态常用入口，可安装 Scala、Scalac 和 sbt；SDKMAN 适合同时管理 JVM 工具：

```bash
cs install scala:3.3.8 scalac:3.3.8 sbt
scala -version
scalac -version
sdk install scala 3.3.8
```

macOS 可使用 Homebrew 社区公式。Windows、Linux 离线环境可下载官方 Scala 3 distribution，校验 release checksum 后解压并加入 PATH。系统包可能固定在 Scala 2，不应假定 `apt install scala` 得到 Scala 3。

## 安装验证

```bash
java --version
scala -version
scalac -version
command -v scala
```

## Docker

Scala 没有需要假装通用的单一官方运行镜像。最小验证可在固定 Temurin JDK 镜像中安装官方 Scala distribution；浏览器环境同样基于 OpenJDK 25。以下仅验证 JVM 基线：

```bash
docker run --rm eclipse-temurin:25-jdk-alpine java --version
```

## 版本切换

```bash
cs install scala:3.3.8 scalac:3.3.8
cs install scala:3.8.4 scalac:3.8.4
sdk use scala 3.3.8
sdk current scala
```

sbt 项目实际 Scala 版本由 `scalaVersion` 固定，与全局命令无关。卸载或覆盖 Coursier app 前先检查 `cs list`；PATH 同时存在 SDKMAN、Coursier 和系统包时，用 `command -v` 定位真正执行文件。

资料核对日期：2026-08-27。
