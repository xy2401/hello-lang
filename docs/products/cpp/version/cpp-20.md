# C++20：Concepts、Modules、Coroutines 与 Ranges

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方标准**: [ISO/IEC 14882:2020 C++20 Standard](https://en.cppreference.com/w/cpp/20)  
> C++20 引入了 **Concepts（概念）**、**Ranges（范围库）**、**Coroutines（协程）** 与 **Modules（模块）**。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `gcc:13` 中执行控制台诊断指令 `g++ --version`：

<DockerOutput
  image="gcc:13"
  sourceFile="demos/cpp/gcc13_env.out"
/>

---

## 1. 🧩 Concepts (概念与约束)
在编译期对模板参数实施强约束校验，大幅改善了复杂的模板编译报错信息。

```cpp
// 关联源码: demos/cpp/cpp20_demo.cpp
template <typename T>
concept Integral = std::is_integral_v<T>;

template <Integral T>
T Add(T a, T b) { return a + b; }
```

<DockerOutput
  image="gcc:13"
  sourceFile="demos/cpp/cpp20_demo.cpp"
/>

## 版本信息与迁移

- **发布时间 / 标准时间：** 2020 年
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** 编译器对目标 ISO C/C++ 标准及所用标准库的实现支持

**迁移影响：** 升级构建标准前，必须在全部目标编译器上开启对应 `-std=` 选项，处理被收紧或删除的语法、标准库差异和 ABI 边界，并保留旧工具链回归构建。

## 版本确认

```bash
gcc --version
clang --version
```

资料核对日期：2026-08-27。
