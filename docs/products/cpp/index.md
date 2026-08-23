# C & C++

<DockerTooling product="cpp" />

C 与 C++ 共享大量基础语法和系统编程传统，但它们由不同的标准维护，也是两门独立演进的语言。这个分卷使用同一个 `/products/cpp/` 入口介绍二者，同时保留 C++11～C++23 的版本路线。

## 从哪里开始

| 方向 | 核心关注点 | 入口 |
| --- | --- | --- |
| C | 过程式编程、指针、数组、结构体、手动资源管理与 C ABI | [C 语言介绍](/products/cpp/c) |
| C++ | RAII、类、模板、标准库、零成本抽象与现代标准演进 | [C++ 基础语法](/products/cpp/basic) |

## C 与 C++ 的关系

- C 提供简洁、稳定的系统级抽象，常用于操作系统、嵌入式、驱动、运行时和跨语言接口。
- C++ 从 C 的语法传统出发，增加类、模板、RAII、异常、泛型算法等能力，但并非“带类的 C”。
- 很多 C 代码能被 C++ 编译器理解，但两者在类型规则、隐式转换、关键字和标准库等方面存在差异，不能把 C++ 当作完全兼容的 C 超集。

## C 标准演进

| 标准 | 定位 | 代表变化 |
| --- | --- | --- |
| [C89 / C90](/products/cpp/c-89) | ANSI C 与首个 ISO C 基线 | 函数原型、标准库、`void`、`const` / `volatile` |
| [C99](/products/cpp/c-99) | 现代 C 的重要扩展 | 混合声明、指定初始化、复合字面量、`inline`、`stdint.h` |
| [C11](/products/cpp/c-11) | 并发与编译期检查 | 原子、线程、`_Generic`、`_Static_assert`、对齐控制 |
| [C17 / C18](/products/cpp/c-17) | 缺陷修订与稳定基线 | 集中修正 C11，没有加入大型语言功能 |
| [C23](/products/cpp/c-23) | 当前正式 C 标准 | `nullptr`、`typeof`、`constexpr` 对象、`#embed`、二进制字面量 |

WG14 的正式版本记录将 C89、C90、C95、C99、C11、C17 和 C23 分别列出；本站将 C95 归入 C89/C90 页，将 C17/C18 作为同一版标准说明。

## C++ 标准演进

ISO C++ 委员会通常以约 3 年为周期推进标准更新：

- [**C++11：现代 C++ 奠基标准**](/products/cpp/cpp-11)（`auto`、Lambda、移动语义、智能指针）
- [**C++20**](/products/cpp/cpp-20)（Concepts、Modules、Coroutines、Ranges）
- [**C++23：标准库与语言能力补充**](/products/cpp/cpp-23)（`std::expected`、`std::print`、Deducing `this`）
