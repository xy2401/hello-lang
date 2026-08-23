# C 语言介绍

C 是一门静态类型、编译执行、以过程式编程为核心的系统编程语言。它提供接近机器模型的指针和内存访问能力，同时用函数、结构体和独立编译单元组织大型程序。

## 核心语言模型

| 维度 | C 的方式 |
| --- | --- |
| 程序组织 | 源文件 `.c`、头文件 `.h`、翻译单元与链接器 |
| 数据建模 | 标量、数组、指针、枚举、`struct`、`union` |
| 抽象方式 | 函数、结构体、函数指针、宏与库接口 |
| 资源管理 | 显式申请和释放；常见接口为 `malloc` / `free` |
| 错误处理 | 返回码、空指针、`errno` 或调用方约定 |
| 跨语言接口 | C ABI 简单稳定，常作为系统库的公共边界 |

## 最小示例

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    const char *name;
    int age;
} Person;

static void print_person(const Person *person) {
    printf("%s (%d)\n", person->name, person->age);
}

int main(void) {
    Person *person = malloc(sizeof *person);
    if (person == NULL) {
        fputs("allocation failed\n", stderr);
        return 1;
    }

    person->name = "Alice";
    person->age = 25;
    print_person(person);

    free(person);
    return 0;
}
```

使用 GCC 或 Clang 编译：

```bash
cc -std=c17 -Wall -Wextra -Wpedantic main.c -o app
./app
```

## 需要掌握的关键点

### 指针与数组

指针保存对象地址，是 C 表达缓冲区、字符串、动态内存和回调接口的核心工具。数组在多数表达式中会退化为指向首元素的指针，但数组和指针本身不是同一种类型。

### 生命周期与所有权约定

C 没有垃圾回收，也没有由语言自动执行的 RAII。接口必须约定谁创建资源、谁释放资源，以及指针可以存活多久。越界访问、释放后使用和重复释放都可能导致未定义行为。

### 头文件与链接

头文件通常声明类型、函数和宏，源文件提供实现。每个 `.c` 文件独立编译为目标文件，最后由链接器组合成程序或库。`static`、`extern` 和声明/定义的区别是理解 C 工程结构的基础。

## C 与 C++ 的主要区别

| C | C++ |
| --- | --- |
| 以函数和结构体组织抽象 | 支持类、模板、重载和命名空间 |
| 资源生命周期主要靠显式约定 | 通常使用 RAII 与智能指针 |
| 泛型能力主要依靠宏和 `void *` | 使用类型安全的模板与 Concepts |
| 错误通常通过返回值传递 | 可使用返回值、异常或 `std::expected` |
| 标准库聚焦底层通用能力 | 标准库还包含容器、算法、并发等高层抽象 |

## 标准版本路线

- [C89 / C90](/products/cpp/c-89)：标准化基线
- [C99](/products/cpp/c-99)：现代 C 的重要扩展
- [C11](/products/cpp/c-11)：原子、线程与编译期检查
- [C17 / C18](/products/cpp/c-17)：缺陷修订与稳定基线
- [C23](/products/cpp/c-23)：当前正式标准

继续阅读：[C++ 基础语法](/products/cpp/basic)与[C++11 现代化起点](/products/cpp/cpp-11)。
