# C++20：Concepts、Modules、Coroutines 与 Ranges

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
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
