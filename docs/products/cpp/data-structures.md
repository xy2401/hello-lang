# C 与 C++ 数据结构深度解析

C 与 C++ 都能精确控制内存布局与生命周期，但二者的抽象哲学截然不同：
* **C 语言**：采用命令式内存管理，通过 `malloc`/`free`、指针算术与显式结构体布局构建数据结构，由开发者全权负责资源销毁与所有权。
* **C++ (C++20)**：采用 RAII（资源获取即初始化）、泛型模板与现代智能指针（`std::unique_ptr`/`std::shared_ptr`），标准库（STL）提供了兼具零成本抽象与工业级强度的容器体系。

---

## 📊 核心结构对照矩阵

| 数据结构分类 | C 语言底层模式 | C++20 现代实现 | 核心时间复杂度 | 内存特征 |
| :--- | :--- | :--- | :--- | :--- |
| **动态数组** | `struct` + `malloc`/`realloc` | `std::vector<T>` / 自定义模板 Vector | 随机访问 $O(1)$，尾部均摊 $O(1)$ | 连续内存，自动倍增扩容 |
| **单/双向链表** | 裸指针节点 + 手动遍历释放 | `std::forward_list` / `std::list` / 智能指针链表 | 头部/已知节点插删 $O(1)$，随机访问 $O(n)$ | 非连续节点分散存储 |
| **栈 (LIFO)** | 固定数组或链表栈 | `std::stack<T>` (底层默认 `std::deque`) | Push / Pop $O(1)$ | 适配器模式，保护栈语义 |
| **双端队列** | 循环数组模运算 | `std::deque<T>` / `std::queue<T>` | 首尾插删 $O(1)$ | 分段连续中控缓冲区 |
| **二叉搜索树** | 递归指针节点 | `std::set<T>` / `std::map<T>` (红黑树底座) | 增删查 $O(\log n)$ | 严格自平衡，节点开销 |
| **二叉堆 / 优先队列** | 数组扁平化上浮下沉 | `std::priority_queue<T>` (`std::make_heap`) | 堆顶 $O(1)$，入堆出堆 $O(\log n)$ | 隐式完全二叉树，无指针开销 |

---

## 1. 线性结构：动态数组 (Vector)

### C 语言实现：手动 realloc 扩容与显式内存管理
<<< ../../../demos/cpp/dsa/linear/dynamic_array.c

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/linear/dynamic_array.c" />

### C++ 实现：RAII 泛型动态数组与 std::vector 对照
<<< ../../../demos/cpp/dsa/linear/dynamic_array.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/linear/dynamic_array.cpp" />

---

## 2. 链式结构：单向链表 (Linked List)

### C 语言实现：显式所有权与递归/迭代析构
<<< ../../../demos/cpp/dsa/linear/linked_list.c

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/linear/linked_list.c" />

### C++ 实现：std::forward_list 与 std::unique_ptr 现代节点
<<< ../../../demos/cpp/dsa/linear/linked_list.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/linear/linked_list.cpp" />

---

## 3. 受限线性结构：栈与队列 (Stack & Queue)

### C 语言顺序栈实现 (Stack)
<<< ../../../demos/cpp/dsa/linear/stack.c

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/linear/stack.c" />

### C++ std::queue 与 std::deque 容器适配器
<<< ../../../demos/cpp/dsa/linear/queue.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/linear/queue.cpp" />

---

## 4. 树与堆：BST、智能指针树与优先队列

### C 语言二叉搜索树 (BST)
<<< ../../../demos/cpp/dsa/trees/bst.c

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/trees/bst.c" />

### C++ 现代智能指针二叉树遍历
<<< ../../../demos/cpp/dsa/trees/binary_tree.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/trees/binary_tree.cpp" />

### C++ 优先队列 (Priority Queue / Heap)
<<< ../../../demos/cpp/dsa/trees/heap.cpp

<DockerOutput image="gcc:13" sourceFile="demos/cpp/dsa/trees/heap.cpp" />
