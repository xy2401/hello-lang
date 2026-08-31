# C# 常用外部依赖库（NuGet）

## 📦 Web 框架（ASP.NET Core）

### ASP.NET Core
官方链接： https://learn.microsoft.com/en-us/aspnet/core/

微软官方全功能 Web 框架，跨平台（Windows/Linux/macOS）。支持 MVC、Web API、SignalR、Blazor。性能优秀，生态完善。

GitHub: [10k+ stars](https://github.com/dotnet/aspnetcore)

### Minimal APIs
官方链接： https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/

ASP.NET Core 轻量级 API，无需 Controller。适合微服务、快速原型开发。语法简洁，启动速度快。

### SignalR
官方链接： https://learn.microsoft.com/en-us/aspnet/core/signalr/

实时 WebSocket 通信库，支持推送通知、聊天室、实时数据更新。自动重连、多客户端广播。

## 🗄️ 数据库与 ORM

### Entity Framework Core
官方链接： https://learn.microsoft.com/en-us/ef/

微软官方 ORM，支持 Code First/Data First 模式。LINQ查询、迁移管理、关系映射。配合 DbContext使用，开发效率高。

GitHub: [3k+ stars](https://github.com/dotnet/efcore)

### Dapper
官方链接： https://dapper-lib.github.io/

微软出品的微 ORM，极简高性能。执行原生 SQL或 Stored Procedure，映射到对象。性能接近 ADO.NET，适合追求极致效率的场景。

GitHub: [26k+ stars](https://github.com/DapperLib/Dapper)

### Npgsql
官方链接： https://www.npgsql.org/

PostgreSQL 官方驱动，完全支持 PG特性。异步操作、连接池、CIText扩展。EF Core 底层也用它。

GitHub: [8k+ stars](https://github.com/npgsql/npgsql)

### MySql.Data
官方链接： https://dev.mysql.com/doc/connector-net/

MySQL 官方驱动，支持 Connection Pooling、Stored Procedures。EF Core Provider 可用。

## 🧪 测试工具

### xUnit
官方链接： https://xunit.net/

现代单元测试框架，结构扁平化。支持 Data Tests、Theory、Fixture。推荐用于新项目。

GitHub: [13k+ stars](https://github.com/xunit/xunit)

### NUnit
官方链接： https://nunit.org/

传统测试框架，历史久、插件多。语法类似 JUnit，支持并行执行。老项目常见。

GitHub: [15k+ stars](https://github.com/nunit/nunit)

### MSTest
官方链接： https://learn.microsoft.com/en-us/dotnet/core/testing/mstest-runner-overview

微软官方测试框架，Visual Studio 集成好。适合企业级项目，逐步现代化改进中。

GitHub: [5k+ stars](https://github.com/microsoft/testfx)

### Moq
官方链接： https://docs.moq.org/

Mock 对象库，最流行的 C# Mock 框架。语法流畅，支持 Lambda 验证。配合 xUnit/NUnit 使用。

GitHub: [7k+ stars](https://github.com/devlooped/moq)

## 🔧 实用工具库

### Newtonsoft.Json
官方链接： https://www.newtonsoft.com/json

JSON 序列化最流行库，功能全面。支持自定义转换器、格式化选项。ASP.NET Core 默认 JSON 库之一。

GitHub: [4k+ stars](https://github.com/JamesNK/Newtonsoft.Json)

### Serilog
官方链接： https://serilog.net/

结构化日志框架，支持 File/Console/Databse输出。上下文信息丰富，可对接 ELK/Sentry等监控系统。

GitHub: [23k+ stars](https://github.com/serilog/serilog)

### AutoMapper
官方链接： https://automapper.org/

对象映射工具，DTO ↔ Entity自动转换。配置灵活，性能优。大量减少样板代码。

GitHub: [13k+ stars](https://github.com/AutoMapper/AutoMapper)

### FluentValidation
官方链接： https://fluentvalidation.net/

验证器链式 API，规则清晰。支持异步验证、自定义规则。Entity Validation首选。

GitHub: [15k+ stars](https://github.com/FluentValidation/FluentValidation)

### Hangfire
官方链接： https://www.hangfire.io/

后台任务处理，支持定时任务、延迟任务。持久化到 SQL Server/Redis，失败重试、可视化仪表盘。

GitHub: [16k+ stars](https://github.com/HangFireIO/Hangfire)

### MediatR
官方链接： https://github.com/jbogard/MediatR

中介者模式实现，命令/查询分离。配合 CQRS模式使用，解耦业务逻辑。

GitHub: [10k+ stars](https://github.com/jbogard/MediatR)

## 🎨 跨平台 UI

### MAUI
官方链接： https://learn.microsoft.com/en-us/dotnet/maui/

.NET 跨平台 UI，Xamarin.Forms 继任者。支持 iOS/Android/Windows/macOS，单代码库多端部署。

### Avalonia UI
官方链接： https://avaloniaui.net/

开源跨平台 GUI，独立于 WPF。支持桌面应用、WebView 混合。WPF 开发者友好迁移。

GitHub: [19k+ stars](https://github.com/AvaloniaUI/Avalonia)

### Blazor
官方链接： https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor

WebAssembly前端框架，用C#写前端。服务器端渲染 + 客户端交互，.NET Core生态完美集成。

## ⚠️ 已废弃/不推荐

### .NET Framework 4.x
标记：🔴 已过时

仅限 Windows，不再有新功能。微软主推 .NET 6+（跨平台），新功能优先支持新版。

替代方案：.NET 6/7/8+

### WCF
标记：🔴 逐渐被替代

遗留服务框架，主要用于 Windows 内网。现代场景建议改用 gRPC或RESTful API。

替代方案：gRPC-Net、ASP.NET Core WebAPI

### jQuery
标记：🔴 已过时

ASP.NET MVC3时代技术，通过 @Html.RenderAction注入页面。现代 Blazor/RazorPages已完全取代。

---

*注：部分经典库已过时，请参考现代替代方案*
