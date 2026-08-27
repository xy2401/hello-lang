# C# 12 / .NET 8 LTS

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Microsoft .NET 8 LTS Official Release Notes](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8)  
> .NET 8 是微软全栈云原生与高性能微服务的长期支持版本（LTS）。它搭载了 C# 12，带来了 **Primary Constructors (主构造函数)**、**Collection Expressions (集合表达式 `[1, 2, 3]`)** 以及 **Native AOT 编译原生增强**。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `mcr.microsoft.com/dotnet/sdk:8.0-alpine` 中执行控制台诊断指令 `dotnet --version`：

<DockerOutput
  image="mcr.microsoft.com/dotnet/sdk:8.0-alpine"
  sourceFile="demos/csharp/env.out"
/>

---

## 1. 🏗️ Primary Constructors & Records (主构造函数与 Record)
允许在普通 Class 和 Struct 上直接声明主构造函数，大幅减少繁琐的成员变量赋值模板代码。

```csharp
// 关联源码: demos/csharp/dotnet8_demo.cs
public record UserProfile(int Id, string Username, string Role);
```

---

## 2. 🧩 Collection Expressions (集合表达式 `[1, 2, 3]`)
C# 12 统一了数组、`List<T>`、`Span<T>` 的初始化语法，全部使用精炼的方括号 `[...]`。

```csharp
int[] numbers = [1, 2, 3, 4, 5];
List<string> roles = ["Admin", "Developer"];
```

<DockerOutput
  image="mcr.microsoft.com/dotnet/sdk:8.0-alpine"
  sourceFile="demos/csharp/dotnet8_demo.cs"
/>

## 版本信息与迁移

- **发布时间 / 标准时间：** 2023 年 11 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** .NET SDK、目标框架 TFM、运行时与 C# 语言版本

**迁移影响：** 迁移时同时更新 SDK、`TargetFramework`、NuGet 依赖和 CI 镜像，先查看兼容性公告与废弃 API，再分别验证 JIT、AOT、序列化和部署产物。

## 版本确认

```bash
dotnet --info
dotnet --list-sdks
```

资料核对日期：2026-08-27。
