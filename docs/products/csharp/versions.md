# C# / .NET 版本演进

C# 每年 11 月随 .NET 统一发布主版本，深度融合模式匹配、高性能内存切片（`Span<T>`）与极简现代语法。

## 核心版本演进与关键里程碑

### C# 13 (.NET 9)（2024 年 11 月）

**主要功能与架构演进：**

- 增强的 `params` 集合形参：不仅支持数组，还原生支持 `ReadOnlySpan<T>` 与 `List<T>`，消除额外堆分配
- 全新的轻量互斥锁对象 `System.Threading.Lock`，性能优于传统 `Monitor` 锁

**工程影响与选型建议：**

> 超高性能微服务与低分配场景的关键优化。

### C# 12 (.NET 8 LTS)（2023 年 11 月）

**主要功能与架构演进：**

- 主构造函数（Primary Constructors）：支持直接在普通 class / struct 类声明头部定义主构造参数
- 集合表达式（Collection Expressions `int[] a = [1, 2, 3];`）与展开操作符（`..`）

**工程影响与选型建议：**

> 极大削减了样板代码，现代化开发效率飙升。

### C# 10 (.NET 6 LTS)（2021 年 11 月）

**主要功能与架构演进：**

- 文件范围命名空间（File-scoped Namespaces `namespace Foo;`，减少一层整体大括号缩进）
- 全局 using 指令（`global using System;`）与 Record Structs

**工程影响与选型建议：**

> 极简代码风格与极速 API 构建标准。

### C# 8.0 (.NET Core 3.0)（2019 年 9 月）

**主要功能与架构演进：**

- 可为空引用类型（Nullable Reference Types `#nullable enable`），在编译期拦截 NullReferenceException
- 异步流（Async Streams `IAsyncEnumerable<T>` 与 `await foreach`）

**工程影响与选型建议：**

> 消除空指针异常的最强类型防线。

## 升级提示
- 推荐使用 .NET 8 LTS 并在 `.csproj` 中开启 `<Nullable>enable</Nullable>`。
