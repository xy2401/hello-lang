# C# 依赖与包管理

C# 项目的主流依赖系统是 NuGet。`.NET SDK`/`global.json` 管工具链版本，MSBuild 负责构建，NuGet 负责包解析和还原，nuget.org 是默认仓库；这些角色不能互相替代。Paket 是独立的依赖管理工具，适合已有 F#/.NET 多项目集中依赖约束的团队，但不是新项目的默认选择。

## 从 DLL 到 PackageReference

早期项目把 DLL 复制进 `lib/` 并手工添加引用，版本、来源和传递依赖都难以追踪。NuGet 最初常用 `packages.config` 和仓库级 `packages/`；现代 SDK-style 项目使用写入 `.csproj` 的 `PackageReference`，通过 `dotnet` CLI 还原。大型仓库可进一步使用 Central Package Management（CPM），在 `Directory.Packages.props` 集中管理版本。

| 方案 | 清单与锁定 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| 手工 DLL | 项目引用 | 可接入无 NuGet 制品 | 来源、ABI 和升级不可追踪 | 仅封闭遗留 SDK |
| `packages.config` | XML + packages 目录 | 兼容旧式项目 | 依赖扁平、仓库膨胀、迁移复杂 | 维护旧 .NET Framework 项目 |
| `PackageReference` | `.csproj`、可选 `packages.lock.json` | 传递依赖、条件引用和 CLI 统一 | 多项目版本易漂移 | 普通现代 .NET 项目 |
| Central Package Management | `Directory.Packages.props` | 集中版本，项目只声明包身份 | 根目录作用域需治理 | 多项目解决方案 |
| Paket | `paket.dependencies`、`paket.lock` | 集中求解与分组能力强 | 额外工具和工作流，生态默认度较低 | 已采用 Paket 的大型遗留仓库 |

## PackageReference 闭环

```bash
dotnet new console -n Hello
cd Hello
dotnet add package Humanizer --version 2.14.1
dotnet list package --include-transitive

# 生成或更新 packages.lock.json
dotnet restore --use-lock-file
# CI / 部署中禁止隐式改锁
dotnet restore --locked-mode

dotnet list package --outdated
dotnet list package --vulnerable --include-transitive
dotnet remove package Humanizer
```

.NET 10 SDK 还支持名词优先的 `dotnet package add/list/remove` 形式；较旧 SDK 使用上面的动词优先形式。团队应以 `global.json` 固定 SDK，并在文档中选定一种语法，避免因开发机 SDK 不同而误判命令不可用。

若项目要求锁文件，在 MSBuild 属性中启用：

```xml
<PropertyGroup>
  <RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>
</PropertyGroup>
```

提交 `packages.lock.json`，升级时明确修改直接依赖版本，再运行普通 `dotnet restore` 更新锁文件并审查差异。`--locked-mode` 只验证，不负责升级。

## Central Package Management

```xml
<!-- Directory.Packages.props -->
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
  </PropertyGroup>
  <ItemGroup>
    <PackageVersion Include="Humanizer" Version="2.14.1" />
  </ItemGroup>
</Project>
```

```xml
<!-- 项目文件只声明身份 -->
<ItemGroup>
  <PackageReference Include="Humanizer" />
</ItemGroup>
```

CPM 的优点是跨项目升级可审查；缺点是目录层级决定配置作用域，条件版本过多时会让解析难懂。新多项目仓库优先 CPM；单个应用不必为了“统一”增加额外层次。

## 来源、缓存与完整性

```bash
dotnet nuget list source
dotnet nuget locals all --list
dotnet nuget locals all --clear
dotnet restore --force-evaluate
```

包源应写入受控的 `NuGet.config`，认证信息使用凭据提供程序或环境，不提交明文。使用多个公共/内部源时配置 package source mapping，减少依赖混淆。NuGet 会校验签名与包哈希，但仍应运行漏洞检查并审查传递依赖。

## 选择建议

- **新项目：** SDK-style + `PackageReference`；需要严格复现时提交锁文件并在 CI 用 `--locked-mode`。
- **多项目解决方案：** 使用 CPM 统一直接依赖版本，保留各项目的真实引用关系。
- **旧 .NET Framework：** 先将 `packages.config` 迁移到 `PackageReference`，再考虑 SDK-style；每一步保持测试可运行。
- **手工 DLL：** 记录来源、版本、许可证和 SHA-256；若供应方提供 NuGet 包，优先迁移。
- **Paket 项目：** 没有实际收益时不要仅为“主流化”改写稳定锁文件；新增普通项目默认 NuGet。

## 官方资料

- [NuGet documentation](https://learn.microsoft.com/nuget/)
- [Package references in project files](https://learn.microsoft.com/nuget/consume-packages/package-references-in-project-files)
- [NuGet lock files](https://learn.microsoft.com/nuget/consume-packages/package-references-in-project-files#locking-dependencies)
- [Central Package Management](https://learn.microsoft.com/nuget/consume-packages/central-package-management)
- [Paket documentation](https://fsprojects.github.io/Paket/)

资料核对日期：2026-08-28。
