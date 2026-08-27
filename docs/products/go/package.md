# Go 依赖与包管理

Go 的编译器、依赖解析器与构建命令都由 `go` 工具提供。`goenv`、mise 等负责切换 Go 运行时，不参与模块解析；`proxy.golang.org` 是模块代理，`sum.golang.org` 是公开校验数据库，也不是包管理器。

## 从 GOPATH 到 Modules

早期 Go 代码必须位于 `GOPATH/src`，第三方工具常把仓库直接复制到工作区，缺少可靠版本语义。Go Modules 以 `go.mod` 声明模块路径、Go 基线与依赖，以 `go.sum` 记录下载内容校验和。Go 1.16 起 Modules 成为默认模式；vendor 和 workspace 是其补充，不是另一套包管理器。

| 方案 | 文件 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| GOPATH / `go get` 旧模式 | 无标准清单 | 老代码可直接工作 | 路径绑定、不可稳定复现 | 仅维护历史项目 |
| Go Modules | `go.mod`、`go.sum` | 官方内建、语义清晰、工具链统一 | 最小版本选择与替换规则需要理解 | 所有新项目 |
| vendor | `vendor/`、`modules.txt` | 构建时可不访问外部代理 | 仓库变大，必须同步更新 | 离线、审计或封闭构建 |
| workspace | `go.work`、`go.work.sum` | 本地联合开发多个模块 | 不应替代每个模块自己的版本声明 | 多仓库联调 |

`go.sum` 是已用模块内容的完整性记录，不是“所有平台精确安装结果”的传统锁文件。Go 通过最小版本选择（MVS）在模块图中选择版本；`go.mod` 中的最低要求和工具链版本因此是评审重点。

## 可复现工作流

```bash
mkdir hello && cd hello
go mod init example.com/hello
go get github.com/google/uuid@v1.6.0

# 移除源码不再使用的依赖并补齐缺项
go mod tidy
go list -m all
go mod graph
go mod why -m github.com/google/uuid

# 检查已下载模块是否匹配 go.sum
go mod verify
go test ./...
```

移除依赖通常先删除源码中的导入，再运行 `go mod tidy`。锁定安装依赖于提交的 `go.mod`、`go.sum` 和固定 Go 工具链；CI 不应随意运行会修改模块图的命令。

受控升级先查看，再只升级目标模块：

```bash
go list -m -u all
go get github.com/google/uuid@v1.6.0
go mod tidy
go test ./...
```

不要用不带版本边界的批量升级替代变更评审。主版本 v2 及以上通常进入模块路径，例如 `example.com/lib/v2`，它是新的导入身份，不只是一个数字变化。

## 代理、校验与离线

```bash
go env GOPROXY GOSUMDB GOPRIVATE GOMODCACHE
go clean -modcache
go mod vendor
go test -mod=vendor ./...
```

公开依赖默认经模块代理获取并由校验数据库核验。私有模块应设置 `GOPRIVATE`（必要时细化 `GONOPROXY`、`GONOSUMDB`），而不是关闭所有校验。`GONOSUMDB=*` 会显著削弱供应链完整性。

官方 Go 漏洞数据库可由 `govulncheck` 按实际调用路径检查；它与 `go mod verify` 的内容校验职责不同：

```bash
go install golang.org/x/vuln/cmd/govulncheck@v1.7.0
govulncheck ./...
```

团队应固定安装的 `govulncheck` 版本；升级审计工具也应作为独立变更，不使用浮动版本替代项目依赖审查。

`vendor/` 需要随 `go.mod` 一起提交，并在变更后重新运行 `go mod vendor`。缓存只是下载副本；清理 `GOMODCACHE` 后仍应能由已声明来源还原构建。

## 多模块本地联调

```bash
go work init ./service ./shared
go work use ./tools
go work sync
```

`go.work` 适合开发者本地组合多个模块。发布或 CI 的每个模块仍应独立通过，不要让未提交的 workspace 掩盖缺失的模块版本。

## 选择建议

- **新项目：** 只使用 Go Modules，提交 `go.mod` 与 `go.sum`，固定 `go`/`toolchain` 基线。
- **遗留 GOPATH 项目：** 先在仓库根创建模块并跑测试，再逐步取消相对路径与手工复制依赖。
- **离线或强审计：** 使用 vendor，但仍维护正常模块清单和校验和。
- **多仓库联调：** 用 `go.work`，避免把临时 `replace ../local` 提交为发布配置。
- **内部模块：** 精确配置私有域，保留公开依赖的代理和校验保护。

## 官方资料

- [Go Modules Reference](https://go.dev/ref/mod)
- [`go` command documentation](https://pkg.go.dev/cmd/go)
- [Managing dependencies](https://go.dev/doc/modules/managing-dependencies)
- [Module release and versioning workflow](https://go.dev/doc/modules/release-workflow)
- [Go vulnerability management](https://go.dev/doc/security/vuln/)

资料核对日期：2026-08-28。
