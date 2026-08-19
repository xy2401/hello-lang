# 📦 包管理与构建

> 各语言使用不同的包管理器、依赖文件和构建工具。HTML 与 CSS 没有语言专属包管理器，通常使用 npm 生态中的验证、转换和打包工具。

---

## 包管理工具

| 语言 | 主流包管理器 | 依赖清单文件 (Manifest) | 依赖锁定文件 (Lockfile) | 官方中央包仓库 | 典型安装/添加依赖命令 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Java** | Maven / Gradle | `pom.xml` / `build.gradle.kts` | `gradle.lockfile` | Maven Central | `mvn dependency:copy` / `./gradlew build` |
| **JavaScript** | npm / pnpm / yarn / Bun | `package.json` | `pnpm-lock.yaml` / `package-lock.json` | npmjs.com | `pnpm add <package>` |
| **Python** | pip / Poetry / uv | `pyproject.toml` / `requirements.txt` | `poetry.lock` / `uv.lock` | PyPI (pypi.org) | `uv add <package>` / `pip install -r` |
| **Rust** | **Cargo** (语言标准内建) | `Cargo.toml` | `Cargo.lock` | crates.io | `cargo add <crate>` |
| **Go** | **Go Modules** (标准内建) | `go.mod` | `go.sum` (哈希校验) | proxy.golang.org | `go get <module>` |
| **PHP** | Composer | `composer.json` | `composer.lock` | Packagist (packagist.org) | `composer require <vendor/package>` |
| **C#** | NuGet / dotnet CLI | `.csproj` / `Directory.Packages.props` | `packages.lock.json` | nuget.org | `dotnet add package <PackageName>` |
| **Ruby** | Bundler | `Gemfile` | `Gemfile.lock` | RubyGems (rubygems.org) | `bundle add <gem>` |
| **Kotlin** | Gradle (Kotlin DSL) | `build.gradle.kts` | `gradle.lockfile` | Maven Central | `./gradlew build` |
| **C++** | CMake + vcpkg / Conan | `CMakeLists.txt` / `vcpkg.json` | `vcpkg-configuration.json` | vcpkg / Conan Center | `vcpkg install <package>` |
| **HTML** | npm / pnpm（工程工具） | `package.json` | `package-lock.json` / `pnpm-lock.yaml` | npmjs.com | `npx html-validate index.html` |
| **CSS** | npm / pnpm（工程工具） | `package.json` / Stylelint 配置 | `package-lock.json` / `pnpm-lock.yaml` | npmjs.com | `npx stylelint "**/*.css"` |

---

## 依赖声明文件

### 🦀 Rust (`Cargo.toml`)
```toml
[package]
name = "hello_world"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1.35", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
```

### 🟨 JavaScript (`package.json`)
```json
{
  "name": "hello-world",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

### 🐍 Python (`pyproject.toml` - PEP 621 Standard)
```toml
[project]
name = "hello-world"
version = "0.1.0"
dependencies = [
    "requests>=2.31.0",
    "pydantic>=2.7.0"
]
```

### 🐹 Go (`go.mod`)
```go
module example.com/hello

go 1.22

require (
    github.com/gin-gonic/gin v1.9.1
    golang.org/x/crypto v0.21.0
)
```

### 🐘 PHP (`composer.json`)
```json
{
    "name": "vendor/hello-world",
    "require": {
        "php": ">=8.2",
        "guzzlehttp/guzzle": "^7.8"
    }
}
```

### 🔷 C# (`.csproj`)
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
  </ItemGroup>
</Project>
```

---

## Monorepo 与 Workspaces

| 语言 | Monorepo 工作区原生支持 | 配置文件 | 跨包本地符号链接支持 |
| :--- | :--- | :--- | :--- |
| **Rust** | 原生 `[workspace]` 支持 | `Cargo.toml` (`members = ["crates/*"]`) | 零成本编译链接 |
| **JS / TS** | pnpm / npm / yarn workspaces | `pnpm-workspace.yaml` | 符号链接 (Symlink) |
| **Go** | Go Workspaces (`go work`) | `go.work` | 替换模块 (`replace`) |
| **Java / Kotlin** | Gradle Composite Builds / Multi-project | `settings.gradle.kts` | 统一构建树 |
| **Python** | uv workspaces / Poetry monorepo | `pyproject.toml` | Editable installs (`-e`) |
