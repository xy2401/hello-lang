# C# 14 / .NET 10 LTS

> **参考官方文档**：[C# / .NET 官方发布说明](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/overview)  
> 本页依据正式 Release 与现有仓库版本证据，整理 C# 14 / .NET 10 LTS 的关键变化、兼容边界和升级检查。

## 版本定位

- **发布时间：** 2025 年 11 月
- **维护状态：** 截至 2026-08-27 的当前重要版本线
- **产品线：** C# / .NET

## 核心变化

- C# 14 加入扩展成员、`field` 支持字段属性和空条件赋值
- .NET 10 改进 JIT、Native AOT、库、SDK 与文件式应用
- .NET 10 提供三年 LTS 支持

## 兼容与迁移

- 升级项目目标框架后检查分析器、源生成器、NuGet 包、运行时标识和部署模型；新语法要求对应编译器。

## 版本确认

不要根据安装包名称或容器标签推断实际版本，应在目标环境执行：

```bash
dotnet --info
```

生产记录至少应包含完整版本输出、操作系统或运行时基线、架构，以及所用客户端或驱动版本。

## 官方资料

- [C# / .NET 官方发布说明](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/overview)

资料核对日期：2026-08-27。
