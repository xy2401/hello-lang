# Groovy 安装与切换

官方入口包括 [Apache Groovy 下载页](https://groovy.apache.org/download.html)、[Groovy 安装说明](https://groovy-lang.org/install.html) 和 [SDKMAN Groovy](https://sdkman.io/sdks/groovy)。Groovy 需要 JDK；新环境先确认 `java --version`，再安装 Groovy。

## 推荐安装

SDKMAN 能同时管理 JDK 与 Groovy，适合 Linux、macOS 和 WSL：

```bash
sdk install java 25-tem
sdk install groovy 5.1.0
sdk use groovy 5.1.0
sdk default groovy 5.1.0
```

macOS 可用 Homebrew 社区公式 `brew install groovy`。Windows 可下载官方 binary ZIP，校验 `.sha256` 后解压，并设置 `GROOVY_HOME` 与 PATH。Linux 系统包适合发行版维护场景，但版本通常落后于官方稳定线；不要混用系统包和 SDKMAN 的可执行文件。

## 安装验证

```bash
java --version
groovy --version
groovyc --version
command -v groovy
echo "$GROOVY_HOME"
```

## Docker

官方镜像适合一次性确认命令；生产构建应固定完整标签和摘要：

```bash
docker run --rm groovy:5.1.0-jdk21 groovy -e 'println GroovySystem.version'
```

## 版本切换

```bash
sdk list groovy
sdk use groovy 4.0.33
sdk default groovy 5.1.0
sdk current groovy
```

卸载使用 `sdk uninstall groovy 4.0.33`。Gradle、Jenkins 或应用依赖中的 Groovy 由对应构建文件锁定，与全局 CLI 是两条版本线；排查冲突时同时查看命令路径、CLI 版本和构建工具报告。

资料核对日期：2026-08-27。
