---
title: 命令示例与结果
aside: false
pageClass: docker-commands-page
---

# 命令示例与结果

按案例查看实际命令、备注与执行记录；每个步骤分别保留 stdout、stderr 和退出码。 [容器内命令与文件清单](./docker-commands)。

<DockerCommands data-url="/docker-data/java/manifest.json" mode="examples" />

五组案例覆盖版本、编译运行、JAR 打包与列表、`javap` 和 `jdeps`，在独立的 JDK 容器执行。工作目录为 `/capture/work`，不会污染镜像文件清单。Java 8 使用兼容选项，版本之间的输出各自归档。

基线为 Ubuntu 26.04 LTS / linux/amd64，安装关系为 Ubuntu → SDKMAN → 精确 JDK 版本。Java 原始记录归 Hello Lang；本站只读取本批次校验后的展示包，未执行或失败步骤会明确显示状态。[历史工具清单](./docker-tooling)继续保留。
