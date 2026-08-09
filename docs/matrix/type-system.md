# 🔀 跨语言类型系统、泛型与模式匹配大比拼

> 类型系统定义了代码在编译期与运行期的安全边界。本文对比 **Java 类型擦除** vs **C++/Rust 编译期单态化** vs **C# 具象化泛型**，以及 **Rust/Java/Python 模式匹配 (Pattern Matching)** 演进。

---

## 1. 📊 八大语言泛型底层机制对比

| 语言 | 泛型底层实现机制 | 运行时类型信息 | 编译后二进制体积 | 原始基本类型泛型支持 |
| :--- | :--- | :--- | :--- | :--- |
| **Java** | **编译期类型擦除 (Type Erasure)** | 退化为 `Object` / 上界 | 无膨胀 (共享字节码) | 自动装箱/拆箱 (`List<Integer>`) |
| **C++** | **模板实例化 (Template Instantiation)** | 保留静态类型 | 代码膨胀 (Monomorphization) | 原生支持 (`std::vector<int>`) |
| **Rust** | **单态化 (Monomorphization)** | 零成本抽象 | 代码特化编译 | 原生支持 (`Vec<i32>`) |
| **C#** | **运行时具象化 (Reified Generics)** | **完整保留类型 `typeof(T)`** | 智能化特化共享 | 原生支持 (`List<int>`) |
| **TypeScript** | **编译期纯类型检查** | 运行时完全擦除 | 0 膨胀 | N/A (运行期全为 JS) |
| **Go** | 编译期 GC Shape / GCShape 共享 | 运行时参数化 | 适度膨胀 | 原生支持 (`[]T`) |

---

## 2. 🧩 模式匹配 (Pattern Matching) 语法演进

### Rust `match` 强解构模式
```rust
match val {
    Point { x, y: 0 } => println!("On X-axis at {}", x),
    Point { x: 0, y } => println!("On Y-axis at {}", y),
    _ => println!("Other point"),
}
```

### Java 21+ Record Pattern & switch 模式匹配
```java
String result = switch (obj) {
    case Point(int x, int y) when x == 0 -> "On Y-axis";
    case Rectangle(Point(int x1, _), _) -> "Deconstructed Rectangle";
    default -> "Unknown";
};
```

### Python 3.10+ Structural Pattern Matching
```python
match command.split():
    case ["move", x, y]:
        print(f"Move to {x}, {y}")
    case ["quit"]:
        print("Quit")
```
