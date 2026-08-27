# C# 编译与运行

.NET 10 SDK 支持 file-based app，可直接构建和运行单个 `.cs` 文件；较旧 SDK 使用传统 `.csproj`。本页同时给出当前文件模式与兼容回退，不展开完整项目工程。

- [File-based apps](https://learn.microsoft.com/dotnet/core/sdk/file-based-apps)
- [dotnet run](https://learn.microsoft.com/dotnet/core/tools/dotnet-run)
- [dotnet build](https://learn.microsoft.com/dotnet/core/tools/dotnet-build)

## 确认 SDK

```bash
dotnet --version
dotnet --info
dotnet --list-sdks
```

File-based app 需要 .NET 10 SDK 或更高版本；`dotnet --info` 能确认实际 SDK、运行时和 RID。

## 运行单个 C# 文件

`Hello.cs`：

```csharp
var name = args.Length > 0 ? args[0] : "world";
Console.WriteLine($"Hello, {name}");
```

```bash
dotnet run --file Hello.cs -- Alice
dotnet Hello.cs Alice
```

显式 `--file` 可避免当前目录存在项目文件时产生歧义，`--` 后的参数原样交给程序。

## 编译文件式应用

```bash
dotnet build Hello.cs --output out
```

文件式应用的默认构建缓存位于临时目录，指定 `--output` 才便于直接检查产物。需要重复并发运行时，先构建可避免多个进程竞争同一缓存。

## 旧 SDK 的最小回退

不支持 file-based app 时创建最小控制台项目：

```bash
dotnet new console --name HelloApp
dotnet run --project HelloApp -- Alice
dotnet build HelloApp --configuration Release
```

这只是兼容入口；依赖管理、测试与发布留给项目级文档。

## 标准输入与退出码

```csharp
var line = Console.ReadLine();
if (string.IsNullOrWhiteSpace(line)) {
    Console.Error.WriteLine("input is required");
    return 2;
}
Console.WriteLine(line);
return 0;
```

构建错误和程序返回的非零整数都会反映为进程退出状态。遇到 SDK 不匹配时检查 `global.json`、当前目录的项目文件和 `dotnet --list-sdks`，不要只安装额外 runtime 代替 SDK。

资料核对日期：2026-08-28。
