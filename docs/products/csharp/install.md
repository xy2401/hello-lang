# C# / .NET 安装与切换

C# 开发安装 .NET SDK；只运行框架依赖应用时才安装 Runtime。SDK 可以并行存在，`dotnet` 按 `global.json`、当前目录和回退规则选择。

- [.NET 安装](https://learn.microsoft.com/dotnet/core/install/)
- [.NET 下载](https://dotnet.microsoft.com/download)
- [选择 SDK 版本](https://learn.microsoft.com/dotnet/core/versions/selection)

## 推荐方式

使用 Microsoft 官方安装包或官方仓库安装受支持的 SDK。Windows 开发也可由 Visual Studio workload 提供，但仍要用 `dotnet --list-sdks` 核对。

## 平台安装

~~~powershell
winget install Microsoft.DotNet.SDK.10
brew install --cask dotnet-sdk
# Debian / Ubuntu 配置 Microsoft 官方仓库后
sudo apt install dotnet-sdk-10.0
# Fedora / RHEL 按官方支持矩阵选择 Microsoft 或发行版包
sudo dnf install dotnet-sdk-10.0
~~~

## 官方安装脚本

~~~bash
./dotnet-install.sh --channel 10.0 --install-dir "$HOME/.dotnet-10"
~~~

官方脚本适合 CI 和非管理员安装，不负责系统依赖与持续安全更新；生产主机优先使用软件包。

## 版本切换

~~~json
{
  "sdk": {
    "version": "10.0.100",
    "rollForward": "latestPatch"
  }
}
~~~

把文件保存为项目根目录的 `global.json`。用 `dotnet --list-sdks` 查看可选版本。

## Docker

~~~bash
docker run --rm mcr.microsoft.com/dotnet/sdk:8.0-alpine dotnet --info
~~~

## 安装验证

~~~bash
dotnet --info
dotnet --list-sdks
dotnet --list-runtimes
~~~

## 升级、卸载与冲突

由 WinGet、系统包或 Visual Studio Installer 升级卸载。多个 SDK 并行是正常状态；PATH 中只应有一个 `dotnet` host，实际 SDK 由解析规则决定。删除 SDK 前先检查所有 `global.json`。

## 官方资料

- [.NET 安装](https://learn.microsoft.com/dotnet/core/install/)
- [.NET 下载](https://dotnet.microsoft.com/download)
- [选择 SDK 版本](https://learn.microsoft.com/dotnet/core/versions/selection)

资料核对日期：2026-08-27。
