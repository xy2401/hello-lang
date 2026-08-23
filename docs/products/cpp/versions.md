# C & C++ 版本演进

C++ 遵循三年一个国际标准的迭代周期（C++11/14/17/20/23），C 语言亦持续演进出 C99/C11/C23。

## 核心版本演进与关键里程碑

### C++23（2023 年 10 月）

**主要功能与架构演进：**

- `std::print` / `std::println`：原生内置基于 `std::format` 的类型安全且性能远超 `printf` / `std::cout` 的输出机制
- `std::expected`：用于表达预期值或错误的优雅 Monad 错误处理体系
- 显式对象形参（Deducing this），极大简化 CRTP（奇异递归模板模式）

**工程影响与选型建议：**

> 进一步大幅改善 C++ 日常开发者体验。

### C++20（2020 年 12 月）

**主要功能与架构演进：**

- **Concepts（概念约束）**：为模板元编程提供清晰的编译期接口契约与友好的报错信息
- **Ranges（范围库）**：支持基于管道符（`|`）的链式惰性流式计算
- **Coroutines（协程）**：无栈协程（`co_await` / `co_yield` / `co_return`）
- **Modules（模块系统）**：彻底取代低效的 `#include` 文本展开，大幅缩短大型项目编译时间

**工程影响与选型建议：**

> 现代 C++ 自 C++11 以来最大维度的语法与架构革命。

### C++17（2017 年 12 月）

**主要功能与架构演进：**

- 结构化绑定（Structured Bindings `auto [x, y] = pair;`）
- 标准库引入 `std::optional`, `std::variant`, `std::any`, `std::filesystem`
- 编译期条件分支（`if constexpr`）

**工程影响与选型建议：**

> 工业界主流代码库广泛推崇的成熟基准。

### C++11（2011 年 8 月）

**主要功能与架构演进：**

- 右值引用与移动语义（Rvalue references & `std::move`），消除不必要的高代价对象深拷贝
- `auto` 自动类型推导、Lambda 匿名函数表达式、智能指针（`std::unique_ptr` / `std::shared_ptr`）
- 强类型枚举（`enum class`）、并发内存模型与标准线程库（`std::thread`）

**工程影响与选型建议：**

> 现代 C++（Modern C++）的真正起点与分水岭。

### C23 (ISO C Standard)（2024 年 10 月）

**主要功能与架构演进：**

- 原生引入 `bool`、`true`、`false` 关键字（无需 `#include <stdbool.h>`）
- 原生支持 `nullptr` 明确区分空指针常量、引入 `constexpr` 常量表达式与 `typeof`

**工程影响与选型建议：**

> 经典 C 语言数十年来最大程度的现代化语法清洗。

## 编译参数配置
- GCC / Clang 启用现代标准：`-std=c++20` 或 `-std=c++23`；C 语言使用 `-std=c23`。
