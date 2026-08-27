# Go 安装与切换

Go 官方提供平台安装包和 tarball。需要并行版本时可使用 mise/asdf，或使用 Go 官方的 `golang.org/dl` 包；项目语言基线仍由 `go.mod` 声明。

- [Go 官方安装](https://go.dev/doc/install)
- [Go 下载](https://go.dev/dl/)
- [Go 管理多个版本](https://go.dev/doc/manage-install)

## 推荐方式

单版本机器使用 go.dev 官方制品；开发机并行版本可用 mise/asdf。Linux 手工升级应先移除旧 `/usr/local/go` 目录，再解压完整新版本，不能覆盖合并。

## 官方制品与系统包

~~~bash
# Linux：从 go.dev/dl 取得明确文件与校验值后
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.27.0.linux-amd64.tar.gz
# macOS
brew install go
# Windows
winget install GoLang.Go
~~~

Homebrew/WinGet 清单由对应社区维护；官方 MSI、PKG 和 tarball 位于 go.dev。

## mise 与官方并行安装

~~~bash
mise use --global go@1.27
mise use go@1.26.7
mise install go@1.26.7
mise exec go@1.26.7 -- go version
~~~

## 版本切换

~~~bash
mise ls go
mise use go@1.27
go1.26.7 version
go env GOROOT GOPATH
~~~

官方 wrapper 以不同命令名并行，不改变 `go`；mise/asdf 通过 PATH shim 选择。

## Docker

~~~bash
docker run --rm golang:1.22-alpine go version
~~~

## 安装验证

~~~bash
go version
go env GOROOT GOPATH GOVERSION
command -v go
~~~

## 升级、卸载与冲突

官方 tarball 升级必须整体替换 `/usr/local/go`；mise/asdf 由其命令卸载。不要把 `GOPATH/bin` 放在 Go SDK 目录前，也不要手工设置指向旧版本的 `GOROOT`。

## 官方资料

- [Go 官方安装](https://go.dev/doc/install)
- [Go 下载](https://go.dev/dl/)
- [Go 管理多个版本](https://go.dev/doc/manage-install)

资料核对日期：2026-08-27。
