# C++23：expected、print 与标准库改进

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方标准**: [ISO/IEC 14882:2023 C++23 Standard](https://en.cppreference.com/w/cpp/23)  
> C++23 引入了 **`std::expected` 错误处理容器**、**`std::print` 格式化输出** 和 **`deducing this` 显式对象参数**。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `gcc:14` 中执行控制台诊断指令 `g++ --version`：

<DockerOutput
  image="gcc:14"
  sourceFile="demos/cpp/gcc14_env.out"
/>

---

## 1. 🛡️ `std::expected` 函数式错误处理
类似于 Rust 的 `Result<T, E>`，优雅替代传统异常机制与错误码。

```cpp
// 关联源码: demos/cpp/cpp23_demo.cpp
std::expected<double, std::string> parse_number(const std::string& str) {
    if (str == "42") return 42.0;
    return std::unexpected("Invalid number format");
}
```

<DockerOutput
  image="gcc:13"
  sourceFile="demos/cpp/cpp23_demo.cpp"
/>
