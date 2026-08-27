# Java 依赖与包管理

Java 早期项目常把 JAR 手工下载到 `lib/`，再自行维护 classpath。后来 Ant 解决重复构建步骤，Ivy 为 Ant 补上依赖解析；Maven 将仓库、依赖与约定式生命周期结合起来，Gradle 则提供可编程构建模型和增量执行。

- [Apache Ant](https://ant.apache.org/manual/)
- [Apache Ivy](https://ant.apache.org/ivy/)
- [Apache Maven](https://maven.apache.org/guides/)
- [Gradle 依赖管理](https://docs.gradle.org/current/userguide/core_dependency_management.html)
- [Maven Central](https://central.sonatype.org/)

## 先分清工具角色

- **JDK / SDKMAN**：选择 Java 工具链版本，不解析项目依赖。
- **Ant**：根据 `build.xml` 执行任务，本身不是完整依赖管理器。
- **Ivy**：依赖解析器，可与 Ant 配合，从 Maven/Ivy 仓库取得构件。
- **Maven / Gradle**：同时承担项目模型、依赖解析、构建生命周期和插件执行。
- **Maven Central**：构件仓库，不是安装在本地的包管理器。

## 演进与取舍

| 方案 | 清单 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| 手工 JAR | `lib/*.jar` | 无额外工具、离线直观 | 传递依赖、来源、校验和升级全靠人工 | 封闭遗留系统、无法联网的固定制品 |
| Ant | `build.xml` | 任务明确、适合迁移旧脚本 | 约定少；依赖解析需 Ivy 等扩展 | 已有大量 Ant 任务的项目 |
| Ant + Ivy | `build.xml`、`ivy.xml` | 保留 Ant 并获得传递依赖 | 配置自由度高，团队约定成本大 | 不能立即迁移 Maven/Gradle 的 Ant 项目 |
| Maven | `pom.xml` | 生态成熟、约定稳定、企业支持广 | XML 冗长；复杂自定义构建不灵活 | 普通 Java 服务、库和企业项目 |
| Gradle | `build.gradle.kts` | 增量构建、组合能力和多项目支持强 | 模型更复杂；脚本过度编程会降低可维护性 | Android、Kotlin、多模块或复杂构建 |

新 Java 服务和库优先选择 Maven；需要 Kotlin DSL、Android、复杂构建图或大型多模块时选择 Gradle。遗留 Ant 项目可以先引入 Ivy，再逐步迁移，不必一次重写所有任务。

## Maven 可复现闭环

依赖版本写入 `pom.xml`；多个模块统一版本时放入 `dependencyManagement` 或导入 BOM。Maven 没有与 npm 完全等价的默认项目锁文件，因此必须避免动态版本，并固定插件、父 POM 与 BOM。

```bash
mvn wrapper:wrapper
./mvnw dependency:tree
./mvnw dependency:analyze
./mvnw -U test
```

添加或移除依赖通常直接审阅 `pom.xml`，然后运行测试和依赖树检查。`./mvnw` 固定 Maven 发行版；在 `.mvn/wrapper/maven-wrapper.properties` 中配置发行包 SHA-256，避免 Wrapper 下载被替换。

镜像和认证属于用户或构建环境的 `settings.xml`，不要把仓库密码写入 POM。清理本地缓存应只删除确认损坏的 `~/.m2/repository/<group>/<artifact>`，不要用全盘删除掩盖解析问题。

## Gradle 可复现闭环

```bash
gradle init
gradle wrapper
./gradlew dependencies
./gradlew dependencyInsight --dependency guava
./gradlew test
```

在构建脚本中启用所有配置的依赖锁定，再生成锁文件：

```kotlin
dependencyLocking {
    lockAllConfigurations()
}
```

```bash
./gradlew dependencies --write-locks
./gradlew --write-verification-metadata sha256 help
```

提交 Wrapper、版本目录、依赖锁和 verification metadata。升级时一次修改一个 BOM、版本目录项或依赖约束，重新写锁并检查 `dependencyInsight`；不要把 `--refresh-dependencies` 当作日常安装命令。

## 供应链与故障定位

- Maven 用 `dependency:tree` 检查传递依赖和版本仲裁，Gradle 用 `dependencies` 与 `dependencyInsight`。
- 固定仓库 URL，只从 HTTPS 官方仓库或受控镜像解析；仓库顺序会影响同坐标构件来源。
- Maven 的 `SNAPSHOT` 和 Gradle 动态版本不适合作为可复现发布基线。
- Wrapper 只固定构建工具，不会自动固定 JDK；JDK 还需 toolchain 或独立版本文件。
- 锁文件和校验和只能确认“取到了声明内容”，不能判断已知漏洞；Maven/Gradle 项目还应接入组织选定的漏洞数据库扫描，并将报告与依赖树一起审阅。

资料核对日期：2026-08-28。
