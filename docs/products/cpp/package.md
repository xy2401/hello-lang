# C & C++ 依赖与包管理

C/C++ 没有由语言标准统一的包管理器。依赖可能来自操作系统、预编译 SDK、源码子模块、CMake 下载步骤或 Conan/vcpkg；编译器 ABI、运行库、构建类型和平台三元组都会影响能否复用二进制包。CMake 是构建系统与项目生成器，不是包管理器；`pkg-config` 只帮助发现已经安装的库，也不负责解析和安装。

## 演进与角色

早期项目手工复制头文件和静态库，并在 Makefile 中写 `-I`、`-L`、`-l`。发行版包管理器随后提供系统级开发包，`pkg-config` 统一部分发现信息。现代 CMake 的 `find_package` 与 FetchContent 改善构建集成，而 Conan 2 和 vcpkg 则提供项目级清单、版本解析与二进制缓存。

| 方案 | 清单与锁定 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| 系统包 + `pkg-config` | 发行版数据库 | 与系统安全更新、ABI 集成好 | 版本受发行版约束，跨平台不一致 | Linux 系统组件、发行版打包 |
| CMake FetchContent | `CMakeLists.txt` 中固定来源 | 无额外包管理器，源码集成直接 | 无完整全局求解与标准锁文件，配置时可能联网 | 少量源码依赖、示例项目 |
| vcpkg manifest | `vcpkg.json`、baseline/版本覆盖 | Windows 与 CMake 集成顺畅，多平台 ports 丰富 | port 版本与 triplet 模型需要学习 | 跨平台应用、MSVC 团队 |
| Conan 2 | `conanfile.py/txt`、lockfile/profile | 二进制包、编译设置和私有场景表达力强 | profile、remote 与构建策略较复杂 | 大型跨平台、定制 ABI、企业缓存 |

## vcpkg 闭环

```bash
mkdir hello && cd hello
vcpkg new --application
vcpkg add port fmt
vcpkg install
vcpkg depend-info fmt

# 受控更新 registry baseline 后必须审查清单并重建
vcpkg x-update-baseline
cmake -S . -B build \
  -DCMAKE_TOOLCHAIN_FILE="$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake"
cmake --build build
vcpkg remove fmt
```

manifest 模式应提交 `vcpkg.json` 和 builtin baseline。baseline 把 ports 解析固定在某个 registry 提交；它比依赖工作站当前 checkout 更可复现。`vcpkg_installed/` 通常是可再生构件，不提交仓库。自定义 triplet 必须记录运行库、架构和链接方式，否则同名包不代表 ABI 相同。

## Conan 2 闭环

```bash
conan profile detect --force
conan new cmake_exe -d name=hello -d version=0.1
conan install . --output-folder=build --build=missing
conan graph info .
conan list "*"

conan lock create . --lockfile-out=conan.lock
conan install . --lockfile=conan.lock --build=missing
conan cache clean "*" --source --build --download
```

新增或移除依赖应修改 `conanfile.py`/`conanfile.txt`，重新生成 lockfile，并在相同 profile 下验证。Conan package ID 会结合 settings、options 和依赖关系计算；只固定版本号而不固定编译器、运行库与架构，仍不能保证二进制兼容。

remote 是二进制与 recipe 来源。团队应显式列出、排序并审查 remote，凭据留在用户配置或密钥系统中。`conan graph info` 可查看传递依赖，官方审计能力之外还需要组织自己的漏洞数据库与制品扫描；不要把“能从缓存安装”视为安全证明。

## FetchContent 与系统依赖

```cmake
include(FetchContent)
FetchContent_Declare(
  fmt
  GIT_REPOSITORY https://github.com/fmtlib/fmt.git
  GIT_TAG        1234567890abcdef1234567890abcdef12345678
)
FetchContent_MakeAvailable(fmt)
```

固定不可变提交比浮动分支或可重写 tag 更可靠，但 FetchContent 仍没有统一锁文件、漏洞审计和二进制缓存语义。依赖较多时应转向 Conan/vcpkg。

系统库可通过 `find_package` 或 `pkg-config` 发现：

```bash
pkg-config --modversion openssl
pkg-config --cflags --libs openssl
cmake --build build --target clean
```

发行版软件包名称、版本与拆包方式不同，应在构建说明中记录 OS 基线，而不是把 `apt` 命令假装成跨平台依赖清单。

## 选择建议

- **新跨平台应用：** 已深度采用 Visual Studio/CMake 时优先 vcpkg；需要精细 ABI、私有二进制或复杂 profile 时优先 Conan 2。
- **少量头文件/源码依赖：** FetchContent 可保持简单，但固定 commit，并提供离线替代来源。
- **Linux 系统组件：** 优先发行版开发包与 `pkg-config`，让系统统一处理安全更新。
- **遗留项目：** 先记录编译器、ABI、库文件来源和校验和，再逐项迁移；不要一次同时更换构建系统和全部依赖来源。
- **库作者：** 导出标准 CMake package config 和稳定 target；避免把消费者绑定到内部下载流程。

## 官方资料

- [CMake FetchContent](https://cmake.org/cmake/help/latest/module/FetchContent.html)
- [vcpkg manifest mode](https://learn.microsoft.com/vcpkg/concepts/manifest-mode)
- [vcpkg versioning](https://learn.microsoft.com/vcpkg/users/versioning)
- [Conan 2 documentation](https://docs.conan.io/2/)
- [pkg-config guide](https://www.freedesktop.org/wiki/Software/pkg-config/)

资料核对日期：2026-08-28。
