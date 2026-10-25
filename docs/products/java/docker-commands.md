---
title: 容器内命令
aside: false
pageClass: docker-commands-page
---

# 容器内命令

按版本查看 JDK 命令、完整文件清单和安装差异。Ubuntu → SDKMAN → JDK 分别构建为可复用镜像，每个阶段都保存全部路径、权限、大小和哈希。 [命令示例与结果](./docker-command-ops)。

<DockerCommands data-url="/docker-data/java/manifest.json" mode="catalog" />

基线：Ubuntu 26.04 LTS / linux/amd64；本地 WSL 使用 Podman 和 Compose，SDKMAN 安装精确 Temurin 候选版本。页面状态以实际采集结果为准。SDKMAN 缓存和配置变化归入安装差异，产品命令取自所选 JDK 的实际安装目录。

Java 配方、版本表和完整采集原始记录归 Hello Lang；Hello Docker 提供公共 Ubuntu 基线与 Bash 采集工具。本站读取校验后的独立展示包，不依赖 Docker 开发服务器。[历史工具清单](./docker-tooling)继续保留。
