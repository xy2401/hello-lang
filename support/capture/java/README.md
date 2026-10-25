# Java 分层镜像与完整文件采集

在本机 WSL2 / Linux 中使用 Podman，Windows 负责编辑。WSL 本身的发行版与容器内的 Ubuntu 26.04 基线独立。

```text
Hello Docker：Ubuntu 26.04 + 更新 + 通用采集工具
└─ Hello Lang：SDKMAN 镜像
   ├─ Temurin 8
   ├─ Temurin 11
   ├─ Temurin 17
   ├─ Temurin 21
   └─ Temurin 25
```

每个节点都是可复用的独立镜像。`sdkman.Dockerfile` 从显式指定的 Ubuntu 镜像构建；`jdk.Dockerfile` 从已构建的 SDKMAN 镜像 ID 构建。Compose 保存构建参数，`build.sh` 按父镜像先、子镜像后的顺序执行，不用 `depends_on` 表示构建顺序。安装只发生在镜像构建阶段。

## 本地执行

需要 Bash、Node.js 22.16+、rootless Podman 和 Compose provider。已验证的 provider 为 podman-compose 1.5.0。`ENGINE=docker` 可选；不会自动切换引擎或提升权限。

下面命令在 WSL 中执行，三个路径都显式指定。`HELLO_DOCKER_HOME` 可以是本地共享工具检出，也可以是固定提交检出的 `.hello-docker`，脚本不猜测相邻仓库路径。

```bash
export HELLO_DOCKER_HOME=/mnt/d/xy2401/codePublic/hello-world/hello-docker
export LANG_HOME=/mnt/d/xy2401/codePublic/hello-world/hello-lang
export EVIDENCE_DIR="$HOME/hello-captures/java/25.0.3-tem/$(date -u +%Y%m%dT%H%M%SZ)"
export ENGINE=podman
export PODMAN_COMPOSE_PROVIDER=podman-compose

# 公共 Ubuntu 基线可被 Java、MongoDB、RabbitMQ 复用。
BASE_IMAGE=localhost/hello-capture/ubuntu:26.04 \
  bash "$HELLO_DOCKER_HOME/support/capture/ubuntu/build.sh"

# 显式执行 Lang 自己的两个安装 Dockerfile。
BASE_IMAGE=localhost/hello-capture/ubuntu:26.04 \
  bash "$LANG_HOME/support/capture/java/build.sh" 25.0.3-tem "$EVIDENCE_DIR/build"

# 下面三个变量是镜像 ID，后续改动标签不会改变本次采集对象。
source "$EVIDENCE_DIR/build/images.env"
bash "$HELLO_DOCKER_HOME/scripts/capture/run.sh" \
  --recipe "$EVIDENCE_DIR/build/recipe.json" \
  --workspace "$EVIDENCE_DIR/capture" \
  --stage "ubuntu=$BASE_IMAGE" \
  --stage "sdkman=$SDKMAN_IMAGE" \
  --stage "jdk=$JDK_IMAGE"
```

同一 Ubuntu 基线下，将候选 ID 改为 `21.0.11-tem` 并使用新的 `EVIDENCE_DIR`，SDKMAN 镜像可以复用。`versions.json` 列出 8/11/17/21/25 的精确 ID、官方来源和 SHA-256。2026-10-19 已在本地 WSL 完成这五个版本的镜像构建和真实采集；实际状态和批次以本站 `docs/public/docker-data/java/versions.json` 及各批次 `manifest.json` 为准。构建日志、三个镜像 inspect 信息、固定 ID 和配方保存在 `build/`。失败时保留已产生的日志，不生成成功清单。

`install-jdk.sh` 正常调用 `sdk install java`。SDKMAN 会把原始 tar 包转换为 ZIP，因此脚本在 SDKMAN 下载完成、转换之前核对原始包 SHA-256，成功后把实际哈希和来源写入镜像的 `/usr/local/share/hello-capture`。哈希不符或 SDKMAN 下载接口变化都会使构建失败。

默认复用缓存；需要更新 SDKMAN 时，先显式重建 SDKMAN 镜像，再重建依赖它的 JDK。不能仅凭同名标签认定是相同镜像；采集结果以镜像 ID 为准。不要删除或覆盖已归档批次。

## 数据与差异

采集由 Hello Docker 的通用 Bash 工具执行。它不接收 `--product java`，Java 版本选择、安装方式、产品目录和五组案例都归 Lang 管理。采集阶段只有一个可写挂载 `/capture`，里面放脚本、输出和案例工作目录；SDKMAN/JDK 留在镜像文件系统中。`/capture` 不进入软件文件清单。

保存 Ubuntu、SDKMAN、JDK 的完整清单，生成 Ubuntu → SDKMAN、SDKMAN → JDK 和 Ubuntu → JDK 差异。SDKMAN 缓存、配置和 `current` 链接变化仍保留在安装差异中；产品命令只取所选版本的实际 `candidates/java/<candidate>/bin`，不会把新增的系统命令当成 JDK 命令。

案例在独立的新 JDK 容器中执行，依次记录版本、编译运行、JAR 打包/列表、`javap`、`jdeps`。每一步有参数、工作目录、stdout、stderr、退出码和断言。Java 8 使用 `java -version`、`jar cf/tf`，依赖结果检查 `java.lang`；Java 9+ 检查 `java.base`。

完整原始证据归 Lang 的按版本/采集 ID 组织的本地归档或 Actions artifact；提交的站点展示包由共同采集工具生成到本站 `docs/public`。需要导入时为 `run.sh` 增加显式 `--site <展示包目录>`；本站页面不访问 Docker 开发服务器。旧 `support/docker`、DockerTooling 和已发布证据保留。

## 手动 Actions 与检查

`collect-java-layers.yml` 只支持手动触发，要求完整 Hello Docker 提交 SHA，使用同一套 Dockerfile、Compose 和 Bash 工具，默认只上传结果，不提交、推送或发布镜像。

```bash
node --test support/capture/java/recipe.test.mjs
bash -n support/capture/java/build.sh
```

安装方式参考 [SDKMAN 官方安装说明](https://sdkman.io/install/) 与 [指定版本安装](https://sdkman.io/usage/)。Podman 的 `compose` 是 [外部 Compose provider 的包装入口](https://docs.podman.io/en/latest/markdown/podman-compose.1.html)。
