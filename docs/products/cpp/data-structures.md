# C 与 C++ 数据结构

C 与 C++ 都能精确控制内存布局，但抽象层次不同：C 通过结构体、指针和所有权约定组织结构；C++ 通常优先使用 RAII 容器与智能指针。

## 结构对照

| 需求 | C | C++ | 典型复杂度 |
| --- | --- | --- | --- |
| 连续序列 | 数组 / 动态分配缓冲区 | `std::vector` | 索引 O(1) |
| 链式节点 | `struct` + 指针 | `std::list` 或智能指针节点 | 已知节点插删 O(1) |
| 有序映射 | 手写树或第三方库 | `std::map` | O(log n) |
| 优先队列 | 手写堆 | `std::priority_queue` | O(log n) |

## C：显式所有权

C 示例手写单链表，创建失败、释放顺序和空指针都由调用方负责。

<<< ../../../demos/cpp/c_data_structures_demo.c

<DockerOutput image="gcc:13" sourceFile="demos/cpp/c_data_structures_demo.c" />

## C++：RAII 与泛型容器

C++ 示例组合 `vector`、`map`、优先队列与 `unique_ptr` 树；容器析构会自动释放拥有的资源。

<<< ../../../demos/cpp/data_structures_demo.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/data_structures_demo.cpp" />
