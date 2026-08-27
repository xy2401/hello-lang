# Java 安装与切换

Java 开发需要 JDK；只运行已有应用时才考虑 JRE。OpenJDK 有多个发行版，本页以 Eclipse Temurin 与 SDKMAN 为可复现入口，不把 Oracle JDK、OpenJDK 与 JRE 混称为同一个包。

- [Adoptium 安装](https://adoptium.net/installation/)
- [OpenJDK 项目](https://openjdk.org/)
- [SDKMAN 安装](https://sdkman.io/install/)
- [SDKMAN 使用](https://sdkman.io/usage/)

## 推荐方式

开发机优先安装受支持的 LTS JDK；Unix 类系统需要并行版本时使用 SDKMAN，Windows 可用 Adoptium MSI/WinGet。CI 直接固定供应商、JDK 主版本和容器 digest。

## Windows、macOS 与 Linux

~~~bash
winget install EclipseAdoptium.Temurin.25.JDK
brew install --cask temurin@25
sudo apt install temurin-25-jdk       # 配置 Adoptium 官方仓库后
sudo dnf install temurin-25-jdk       # 配置 Adoptium 官方仓库后
~~~

## SDKMAN

~~~bash
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk list java
sdk install java 25-tem
~~~

候选标识会随供应商发布变化，先用 `sdk list java` 取得当前精确 ID。

## 版本切换

~~~bash
sdk use java 25-tem       # 仅当前 Shell
sdk default java 25-tem   # 新会话默认
sdk current java
# 项目目录固定
sdk env init
~~~

## Docker

~~~bash
docker run --rm eclipse-temurin:25-jdk-alpine java -version
~~~

## 安装验证

~~~bash
java -version
javac -version
command -v java
echo "$JAVA_HOME"
~~~

## 升级、卸载与冲突

SDKMAN 用 `sdk upgrade java`、例如 `sdk uninstall java 25-tem` 管理；MSI/包管理器由原渠道维护。`java` 与 `javac` 应来自同一 JDK，检查 `JAVA_HOME`、PATH、IDE 自带 JDK 和构建工具的 toolchain 配置。

## 官方资料

- [Adoptium 安装](https://adoptium.net/installation/)
- [OpenJDK 项目](https://openjdk.org/)
- [SDKMAN 安装](https://sdkman.io/install/)
- [SDKMAN 使用](https://sdkman.io/usage/)

资料核对日期：2026-08-27。
