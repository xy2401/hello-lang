# C++11：类型推导、移动语义与 Lambda

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方标准**: [ISO/IEC 14882:2011 C++11 Standard](https://en.cppreference.com/w/cpp/11)  
> C++11 是现代 C++ (Modern C++) 的奠基之作，引入了 **`auto` 自动类型推导**、**Lambda 表达式**、**移动语义与右值引用 (`std::move`)** 以及 **智能指针 (`std::unique_ptr`, `std::shared_ptr`)**。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `gcc:13` 中执行控制台诊断指令 `g++ --version`：

<DockerOutput
  image="gcc:13"
  sourceFile="demos/cpp/gcc13_env.out"
/>

---

## 1. ⚡ 自动类型推导与移动语义 (`auto` & `std::move`)
通过 `auto` 让编译器推导变量类型，借助 `std::move` 实现资源的所有权转移而非深拷贝。

```cpp
// 关联源码: demos/cpp/cpp11_demo.cpp
auto factorial = [](int n) {
    int res = 1;
    for (int i = 1; i <= n; ++i) res *= i;
    return res;
};
```

<DockerOutput
  image="gcc:13"
  sourceFile="demos/cpp/cpp11_demo.cpp"
/>
