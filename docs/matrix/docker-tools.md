# Docker 构建、运行与工具矩阵

> 本页比较镜像里真实携带的编译器、运行时、包管理器和诊断工具。配置条目不等于实测；只有产品页出现“已验证”并带三类快照时才视为 Docker 证据完整。

| 产品 | 构建/检查环境 | 运行环境 | 重点工具 | 核心流程 |
| :--- | :--- | :--- | :--- | :--- |
| Java | Temurin JDK 25 | Temurin JRE 25 | `javac`、`jar`、`jcmd`、`jfr`、`jlink`、`jshell`、`jstack` | `javac` → class → `java` |
| C & C++ | GCC 14 | Debian slim | `gcc`、`g++`、`gcov`、`gprof`、`ld` | 编译 C/C++ → 复制二进制 → 运行 |
| Go | Go 1.24 | Debian slim | `go`、`gofmt` | 静态构建 → 最小镜像运行 |
| Rust | Rust 1.89 | Debian slim | `rustc`、`cargo`、`rustdoc`、`rustfmt` | release 构建 → 最小镜像运行 |
| C# | .NET SDK 8 | .NET Runtime 8 | `dotnet` | publish → runtime 执行 DLL |
| Kotlin | Temurin JDK + 固定 Kotlin | Temurin JRE | `kotlinc`、`kotlin`、JDK 工具 | jar 构建 → JRE 运行 |
| TypeScript | Node 22 + TypeScript 5.9.3 | Node 22 | `tsc`、`node`、`npm` | TS → JS → Node |
| JavaScript | Node 22 | Node 22 | `node`、`npm`、`npx` | 语法检查 → 运行 |
| Python / Ruby / PHP | 官方语言镜像 | 同一解释器环境 | 解释器、包管理器、文档/交互工具 | 语法检查 → 运行 |
| HTML / CSS | Node 工具链 | Nginx | `html-validate` / `stylelint` / `nginx` | 校验 → 静态服务 → HTTP 断言 |

完整 PATH 与 vendor bin 清单、命令原文和断言位于各产品页的“Docker 验证证据”。首次真实采集由手动 `collect-docker-outputs` 工作流完成。
