# C# / .NET 版本演进

C# 每年 11 月随 .NET 统一发布主版本，深度融合模式匹配、高性能内存切片（`Span<T>`）与极简现代语法。

## 版本索引

### [C# 14 / .NET 10 LTS](./csharp-14-dotnet-10)

- **发布时间：** 2025 年 11 月
- **版本重点：** C 14 加入扩展成员、field 支持字段属性和空条件赋值。

### [C# 13 (.NET 9)](./csharp-13)

- **发布时间：** 2024 年 11 月
- **版本重点：** 增强的 params 集合形参：不仅支持数组，还原生支持 ReadOnlySpan 与 List，消除额外堆分配。

### [C# 12 (.NET 8 LTS)](./dotnet-8)

- **发布时间：** 2023 年 11 月
- **版本重点：** 主构造函数（Primary Constructors）：支持直接在普通 class / struct 类声明头部定义主构造参数。

### [C# 10 (.NET 6 LTS)](./csharp-10)

- **发布时间：** 2021 年 11 月
- **版本重点：** 文件范围命名空间（File-scoped Namespaces namespace Foo;，减少一层整体大括号缩进）。

### [C# 8.0 (.NET Core 3.0)](./csharp-8.0)

- **发布时间：** 2019 年 9 月
- **版本重点：** 可为空引用类型（Nullable Reference Types nullable enable），在编译期拦截 NullReferenceException。

## 升级提示
- 推荐使用 .NET 8 LTS 并在 `.csproj` 中开启 `<Nullable>enable</Nullable>`。
