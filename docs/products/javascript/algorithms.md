# JavaScript 算法

现代 JavaScript 提供稳定排序和非破坏性数组方法；生成器则适合把遍历过程表达为可暂停的数据流。

## 常用模式

| 操作 | API/实现 | 复杂度 |
| --- | --- | --- |
| 非破坏排序 | `toSorted(compareFn)` | O(n log n) |
| 二分查找 | 手写边界循环 | O(log n) |
| BFS | Array 游标队列 + Set | O(V + E) |
| 惰性遍历 | Generator | 与实际消费数量相关 |

## 语言特性

默认排序会把元素转为字符串，数值排序必须提供比较器。生成器把控制权交给调用方，适合搜索、分页和大型树遍历。

## 综合示例

<<< ../../../demos/javascript/algorithms_demo.js

<DockerOutput image="node:22-alpine" sourceFile="demos/javascript/algorithms_demo.js" />
