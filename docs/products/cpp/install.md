# C / C++ 工具链 安装与切换

C/C++ 没有单一“语言运行时”。需要安装编译器、链接器、标准库、调试器和构建工具；GCC、Clang、MSVC 的平台 ABI 与标准库选择都可能不同。

- [GCC 安装](https://gcc.gnu.org/install/)
- [LLVM 入门](https://llvm.org/docs/GettingStarted.html)
- [MSVC C++ 工具](https://visualstudio.microsoft.com/vs/features/cplusplus/)
- [Xcode 命令行工具](https://developer.apple.com/xcode/resources/)

## 推荐方式

Linux 使用发行版工具链组，macOS 使用 Xcode Command Line Tools，Windows 使用 Visual Studio Build Tools 的“Desktop development with C++”。需要对比编译器时并行安装 GCC 与 Clang。

## Linux

~~~bash
sudo apt install build-essential clang cmake ninja-build
sudo dnf group install "Development Tools"
sudo dnf install clang cmake ninja-build
sudo pacman -S base-devel clang cmake ninja
~~~

## macOS 与 Windows

~~~bash
xcode-select --install
brew install gcc llvm cmake ninja
~~~

Windows 使用 Visual Studio Installer 或 Build Tools 官方安装器；WinGet 可安装 `Microsoft.VisualStudio.2022.BuildTools`，但 C++ workload 仍需在安装参数或安装器中选择。

## 版本切换

~~~bash
CC=clang CXX=clang++ cmake -S . -B build-clang
CC=gcc-14 CXX=g++-14 cmake -S . -B build-gcc
sudo update-alternatives --config gcc   # 仅配置过 alternatives 的 Debian 系统
~~~

项目级环境变量和 CMake toolchain 比修改全局默认更可控。MSVC 通过对应版本的 Developer Command Prompt 选择。

## Docker

~~~bash
docker run --rm gcc:14 gcc --version
~~~

## 安装验证

~~~bash
cc --version
c++ --version
cmake --version
command -v cc c++
~~~

## 升级、卸载与冲突

发行版和 IDE 安装器负责升级卸载。检查 `CC`、`CXX`、CMake cache、PATH、SDK 与标准库头文件来源；切换编译器后应使用新的构建目录，避免复用旧对象文件。

## 官方资料

- [GCC 安装](https://gcc.gnu.org/install/)
- [LLVM 入门](https://llvm.org/docs/GettingStarted.html)
- [MSVC C++ 工具](https://visualstudio.microsoft.com/vs/features/cplusplus/)
- [Xcode 命令行工具](https://developer.apple.com/xcode/resources/)

资料核对日期：2026-08-27。
