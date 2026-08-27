# C 与 C++ 编译与运行

C/C++ 源码先经过预处理、编译和链接生成平台相关可执行文件。GCC、Clang 与 MSVC 的参数体系不同，本页分别给出单文件最小命令，不展开 CMake 等项目构建系统。

- [GCC 使用手册](https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html)
- [Clang 命令行参考](https://clang.llvm.org/docs/ClangCommandLineReference.html)
- [MSVC 编译器选项](https://learn.microsoft.com/cpp/build/reference/compiler-options)

## 确认编译器

```bash
gcc --version
g++ --version
clang --version
clang++ --version
```

Visual Studio Developer PowerShell 中使用：

```powershell
cl
where.exe cl
```

## 编译 C

`hello.c`：

```c
#include <stdio.h>

int main(int argc, char **argv) {
    const char *name = argc > 1 ? argv[1] : "world";
    printf("Hello, %s\n", name);
    return 0;
}
```

```bash
gcc -std=c17 -Wall -Wextra -Wpedantic hello.c -o hello-c
./hello-c Alice

clang -std=c17 -Wall -Wextra -Wpedantic hello.c -o hello-c
```

## 编译 C++

```cpp
#include <iostream>
#include <string_view>

int main(int argc, char **argv) {
    std::string_view name = argc > 1 ? argv[1] : "world";
    std::cout << "Hello, " << name << '\n';
}
```

```bash
g++ -std=c++23 -Wall -Wextra -Wpedantic hello.cpp -o hello-cpp
./hello-cpp Alice

clang++ -std=c++23 -Wall -Wextra -Wpedantic hello.cpp -o hello-cpp
```

MSVC：

```powershell
cl /std:c++latest /EHsc /W4 hello.cpp /Fe:hello-cpp.exe
.\hello-cpp.exe Alice
```

## 分步编译与退出码

```bash
g++ -std=c++23 -c hello.cpp -o hello.o
g++ hello.o -o hello-cpp
```

编译警告不会默认导致失败，可在受控代码库酌情使用 `-Werror`，不要对未知第三方头文件盲目开启。程序从 `main` 返回的整数成为进程退出码；崩溃、链接失败和缺少动态库需要分别排查。

`undefined reference` 属于链接阶段，`No such file or directory` 可能是头文件、源码或运行时动态库路径问题。生成物只适用于匹配的操作系统、架构和 ABI。

资料核对日期：2026-08-28。
