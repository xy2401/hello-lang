# C++ 常用第三方库

## 📦 功能扩展库

### Boost
官方链接：https://www.boost.org/

C++ 功能扩展大全，包含 100+ 独立库。智能指针、多线程、文件系统、正则表达式、日期时间等。现代 C++ 必备工具集。

GitHub: [3k+ stars](https://github.com/boostorg)

### fmt
官方链接： https://fmt.dev/latest/

类型安全的格式化库，现代 printf 替代。支持字符串插值、自定义格式器、跨平台。C++20 string_view集成。

GitHub: [20k+ stars](https://github.com/fmt/fmt)

### Abseil
官方链接：https://abseil.io/

Google 开源库，ABSL（Abseil Base Library）提供通用工具函数。Time、Random、String 处理、并发原语。大规模分布式系统首选。

GitHub: [14k+ stars](https://github.com/abseil/abseil-cpp)

## 🎨 GUI 与图形

### Qt
官方链接：https://www.qt.io/

跨平台 GUI 框架，最成熟稳定。支持桌面/嵌入式/移动设备。C++/Python绑定，信号槽机制。商业许可证 + 开源版本。

GitHub: [5k+ stars](https://code.qt.io/cgit/qt/qt.git/)

### SDL2
官方链接： https://libsdl.org/

简单游戏和多媒体开发库。音视频输入输出、键盘鼠标、图形渲染。跨平台，轻量级。

GitHub: [8k+ stars](https://github.com/libsdl-org/SDL)

### Dear ImGui
官方链接：https://github.com/ocornut/imgui

Immediate Mode GUI，即时模式界面设计。代码即 UI，适合游戏调试、内部工具。单次提交即可使用，无依赖。

GitHub: [69k+ stars](https://github.com/ocornut/imgui)

## 🔬 专业领域库

### OpenCV
官方链接： https://opencv.org/

计算机视觉，图像处理，机器学习和深度学习。支持人脸检测、目标跟踪、图像识别。工业级应用广泛。

GitHub: [70k+ stars](https://github.com/opencv/opencv)

### Eigen
官方链接： https://eigen.tuxfamily.org/

线性代数运算库，矩阵向量数学。支持稠密矩阵、稀疏矩阵、QR 分解、特征值计算。科学计算基础库。

GitHub: [5k+ stars](https://github.com/eigenteam/Eigen-git-mirror)

### Bullet Physics
官方链接： https://bulletphysics.org/

物理引擎，刚体碰撞检测、约束求解。游戏物理模拟首选，支持车辆动力学、布料模拟。

GitHub: [4k+ stars](https://github.com/bulletphysics/bullet3)

### Assimp
官方链接：http://www.assimp.sourceforge.net/

3D 模型导入导出库，支持 40+ 格式（OBJ/DAE/FBX/STL 等）。游戏引擎必备，资源加载利器。

GitHub: [1k+ stars](https://github.com/assimp/assimp)

## 🌐 网络与序列化

### Boost.Asio
官方链接： https://asio.boost.com/

Boost 的异步 I/O 库，网络编程标准实现。socket、TCP/UDP、SSL、DNS 解析，统一 API 封装。

### gRPC-Cpp
官方链接： https://grpc.io/docs/languages/cpp/

Google RPC 框架的 C++ 实现，基于 HTTP/2。支持双向流、负载均衡、认证。微服务通信首选。

GitHub: [4k+ stars](https://github.com/grpc/grpc/tree/master/src/cpp)

### Protocol Buffers
官方链接： https://developers.google.com/protocol-buffers

Google 序列化协议，数据交换格式。比 JSON/XML更紧凑高效，支持多语言绑定。gRPC 默认序列化方式。

GitHub: [30k+ stars](https://github.com/protocolbuffers/protobuf)

### CURL
官方链接： https://curl.se/

HTTP/FTP 客户端库，功能全面。支持 HTTPS、SSL、代理、Cookie 管理。Unix 系统内置或可选安装。

GitHub: [14k+ stars](https://github.com/curl/curl)

## 🧪 测试工具

### Catch2
官方链接： https://catch2.org/

现代 C++ 测试框架，单头文件。简单易用，支持 BDD 风格测试、性能基准、并行执行。

GitHub: [13k+ stars](https://github.com/catchorg/Catch2)

### GoogleTest
官方链接： https://google.github.io/googletest/

Google 单元测试框架，功能完善。支持 Mock、Parameterized Tests、Fixture。配合 googlemock 使用。

GitHub: [12k+ stars](https://github.com/google/googletest)

### Benchmark
官方链接： https://github.com/google/benchmark

Google 性能基准测试库。支持多个测试轮次、统计报告、图表生成。性能优化必备工具。

GitHub: [6k+ stars](https://github.com/google/benchmark)

## ⚠️ 已废弃/不推荐

### Tr1
标记：🔴 已过时

C++03 Technical Report 1，是 C++11 标准的前身。已被 C++11 原生标准库完全覆盖，无需额外依赖。

替代方案：直接使用 C++11/14/17/20标准库

### Xtreme
标记：🔴 已过时

非标准扩展库，社区逐渐弃用。功能已被 Boost 或其他标准库替代，不建议在新项目使用。

---

*注：部分经典库已过时，请参考现代替代方案*
