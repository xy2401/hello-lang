# C 与 C++ 算法

C 标准算法通过裸指针、元素大小和函数指针实现通用性；C++ 算法则依赖迭代器、Ranges、模板和可调用对象保留类型信息。

## 能力对照

| 操作 | C | C++ | 复杂度 |
| --- | --- | --- | --- |
| 排序 | `qsort` | `std::ranges::sort` | O(n log n) |
| 二分查找 | `bsearch` | `lower_bound` | O(log n) |
| 图遍历 | 手写数组队列 | 标准容器组合 | O(V + E) |

## C：函数指针与内存跨度

比较函数必须把 `void *` 安全转换回元素类型；数组长度需要与指针分开传递。

<<< ../../../demos/cpp/c_algorithms_demo.c

<DockerOutput image="gcc:13" sourceFile="demos/cpp/c_algorithms_demo.c" />

## C++：Ranges 与迭代器

Ranges 算法直接接受范围，并保留静态类型。示例排序后使用 `lower_bound`，再组合 Map、Queue 和 Vector 完成 BFS。

<<< ../../../demos/cpp/algorithms_demo.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/algorithms_demo.cpp" />
