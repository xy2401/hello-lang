# Go 数据结构

Go 以 Slice 和 Map 覆盖常见需求，链表与堆放在 `container` 包中。泛型适合为项目封装少量类型安全容器，但不应遮蔽语言原生结构。

## 核心容器

| 结构 | Go 类型 | 典型复杂度 |
| --- | --- | --- |
| 动态序列 | `[]T` | 索引 O(1)，`append` 摊销 O(1) |
| 哈希映射 | `map[K]V` | 查询平均 O(1) |
| 双向链表 | `container/list` | 已知节点插删 O(1) |
| 堆 | `container/heap.Interface` | 插入、弹出 O(log n) |

## Go 的独特之处

- Slice 是数组片段描述符；多个 Slice 可能共享同一个底层数组。
- Map 的遍历顺序未定义，需要稳定输出时应先收集并排序键。
- `container/heap` 通过接口把堆算法应用到调用方定义的切片类型。

## 综合示例

<<< ../../../demos/go/data_structures_demo.go

<DockerOutput image="golang:1.22-alpine" sourceFile="demos/go/data_structures_demo.go" />
