# C# 8.0 (.NET Core 3.0)

> **参考官方文档**：[C# / .NET 官方发布说明](https://learn.microsoft.com/dotnet/core/whats-new/)  
> 本页依据正式 Release 与现有仓库版本证据，整理 C# 8.0 (.NET Core 3.0) 的关键变化、兼容边界和升级检查。

## 版本定位

- **发布时间：** 2019 年 9 月
- **维护状态：** 历史版本或兼容基线；实际维护状态以官方页面为准
- **产品线：** C# / .NET

## 核心变化

**主要功能与架构演进：**

- 可为空引用类型（Nullable Reference Types `#nullable enable`），在编译期拦截 NullReferenceException
- 异步流（Async Streams `IAsyncEnumerable<T>` 与 `await foreach`）

**工程影响与选型建议：**

> 消除空指针异常的最强类型防线。

## 兼容与迁移

- 同时更新编译器或运行时、包管理器、构建镜像与 CI，不只修改本机版本。
- 先处理弃用警告，再验证依赖、代码生成器、原生扩展和目标平台。
- 在新旧基线分别运行测试，明确产物的最低运行时与语言版本。

## 版本确认

不要根据安装包名称或容器标签推断实际版本，应在目标环境执行：

```bash
dotnet --info
```

生产记录至少应包含完整版本输出、操作系统或运行时基线、架构，以及所用客户端或驱动版本。

## 官方资料

- [C# / .NET 官方发布说明](https://learn.microsoft.com/dotnet/core/whats-new/)

资料核对日期：2026-08-27。
