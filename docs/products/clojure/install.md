# Clojure 安装与切换

官方入口包括 [Install Clojure](https://clojure.org/guides/install_clojure)、[Clojure Downloads](https://clojure.org/releases/downloads) 和 [Tools Releases](https://clojure.org/releases/tools)。Clojure CLI 需要 Java、Bash、curl 与 rlwrap；语言 JAR 通常由 CLI 根据 `deps.edn` 获取。

## 推荐安装

Linux 使用官方固定版本安装脚本并核对脚本内 SHA-256；macOS 使用官方 Homebrew tap：

```bash
curl -LO https://github.com/clojure/brew-install/releases/download/1.12.5.1664/linux-install.sh
chmod +x linux-install.sh
sudo ./linux-install.sh
brew install clojure/tools/clojure
```

Windows 推荐 WSL 以保持命令和路径语义一致，也可使用官方说明链接的 Windows 安装器。发行版社区包可能只提供语言 JAR 或旧版 CLI，安装前确认它是否包含 `clj`、`clojure` 和 tools.deps。

## 安装验证

```bash
java --version
clojure --version
clojure -Sdescribe
command -v clojure
```

## Docker

Clojure 没有必要伪造统一官方运行镜像；可在固定 JDK 镜像中安装官方 CLI。最小容器检查先验证所需 JVM：

```bash
docker run --rm eclipse-temurin:25-jdk-alpine java --version
```

## 版本切换

Clojure CLI 与语言版本独立。CLI 通过重新运行固定版本安装器切换；项目语言通过 `deps.edn` 坐标切换：

```clojure
{:deps {org.clojure/clojure {:mvn/version "1.12.5"}}}
```

```bash
clojure -Spath
clojure -Stree
```

升级或卸载前记录 `/usr/local/lib/clojure` 与 PATH 来源。不要通过替换 CLI 猜测项目语言版本，也不要把用户级 `~/.clojure/deps.edn` 当作项目可复现配置。

资料核对日期：2026-08-27。
