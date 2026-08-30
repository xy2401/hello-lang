# 🧩 面向对象

> “有对象”、“支持面向对象”和“基于类”不是同一件事。本页对比类式对象模型、原型委托，以及没有传统类继承的 Struct + Interface/Trait 设计。

> [!NOTE]
> HTML 的 `class` 是元素分类属性，CSS 的 `.class` 是选择器；它们都不是面向对象意义上的类。

---

## 1. 代表语言对象模型总览

| 语言 | 底层模型 | 状态与行为载体 | 复用 / 扩展机制 | 多态方式 |
| :--- | :--- | :--- | :--- | :--- |
| **Java** | 基于类、名义类型 | Class / Record | 单类继承、多接口、组合 | 方法重写、Interface |
| **JavaScript** | **对象 + 原型委托** | 普通对象；`class` 产生构造器和原型 | 原型链、`extends`、对象组合 | 鸭子类型、动态方法查找 |
| **Python** | 动态的基于类模型 | Class / Dataclass | 多继承、Mixin、组合 | 鸭子类型、Protocol、MRO |
| **C++** | 基于类的多范式模型 | Class / Struct | 多继承、组合、模板 | 虚函数动态多态、模板静态多态 |
| **Rust** | 无类继承 | Struct / Enum + `impl` | Trait、组合、泛型 | Trait Bound 静态分发、`dyn Trait` 动态分发 |
| **Go** | 无类继承 | Struct + 方法 | 嵌入与组合、隐式 Interface | 接口的结构化满足 |
| **PHP** | 动态运行时上的基于类模型 | Class | 单继承、Interface、Trait、组合 | 方法重写、Interface |
| **C#** | 基于类、名义类型 | Class / Struct / Record | 单类继承、多接口、组合 | `virtual` / `override`、Interface |
| **Ruby** | 动态的基于类模型 | Class；类本身也是对象 | 单继承、Module/Mixin、开放类 | 鸭子类型、动态消息分发 |
| **Kotlin** | 基于类、名义类型 | Class / Data Class / Object | 默认 `final`、Interface、委托、组合 | `open` / `override`、Interface |
| **HTML** | 不适用 | DOM 元素由浏览器建模 | 元素组合与模板 | 不适用 |
| **CSS** | 不适用 | 规则、选择器与属性 | 层叠、继承、自定义属性 | 不适用 |

> [!TIP]
> C++、Python、JavaScript 等都是多范式语言。支持面向对象不代表所有代码都应使用类层次。

---

## 2. 三种核心建模思路

### 2.1 基于类：先定义类，再创建实例

Java、C# 和 Kotlin 的典型思路是：类定义字段、方法与可见性，实例再按该类型运行。

```java
interface Greeter {
    String greet();
}

final class User implements Greeter {
    private final String name;

    User(String name) { this.name = name; }
    public String greet() { return "Hello " + name; }
}
```

这里的 `User` 既是代码组织单元，也是类型系统中的名义身份。

### 2.2 基于原型：对象把查找委托给另一个对象

JavaScript 对象有一个内部 `[[Prototype]]` 链接。访问自身不存在的属性时，引擎会沿原型链向上查找。

```js
const greeter = {
  greet() {
    return `Hello ${this.name}`
  }
}

const user = Object.create(greeter)
user.name = 'Ada'

user.greet() // "Hello Ada"
Object.getPrototypeOf(user) === greeter // true
```

这是“对象委托给对象”，不要求先存在一个传统类。

### 2.3 结构 + 能力：不建立类继承树

Go 和 Rust 将数据、方法与能力约束分开，鼓励通过组合而非基类复用实现。

::: code-group

```go [Go]
type User struct { Name string }

func (u User) Greet() string { return "Hello " + u.Name }

type Greeter interface {
    Greet() string
}

// User 无需显式声明 implements Greeter。
```

```rust [Rust]
struct User { name: String }

trait Greeter {
    fn greet(&self) -> String;
}

impl Greeter for User {
    fn greet(&self) -> String {
        format!("Hello {}", self.name)
    }
}
```

:::

Go 通过“方法集是否满足接口”实现结构化多态；Rust 通过显式 `impl Trait for Type` 赋予类型能力。

---

## 3. JavaScript `class` 究竟是什么？

ES6 `class` 是建立在 JavaScript 原型机制之上的专门语法层。它让构造、方法共享和继承更集中，但没有把语言的底层对象模型替换成 Java 式类模型。

```js
class User {
  constructor(name) {
    this.name = name
  }

  greet() {
    return `Hello ${this.name}`
  }
}

const user = new User('Ada')

Object.getPrototypeOf(user) === User.prototype        // true
user.greet === User.prototype.greet                   // true
Object.getPrototypeOf(User.prototype) === Object.prototype // true
```

- `name` 是每个实例自有的属性。
- `greet` 位于 `User.prototype` 上，由实例通过原型链共享。
- `User` 在运行时是一个特殊的构造函数对象。

### `extends` 同时建立两条原型关系

```js
class Admin extends User {}

Object.getPrototypeOf(Admin.prototype) === User.prototype // 实例方法链
Object.getPrototypeOf(Admin) === User                     // 构造器/静态成员链
```

`super` 与 `extends` 把这套关系规范化，但属性查找仍由原型链完成。

### 为什么不能只说“简单语法糖”？

| 维度 | 传统构造函数 | `class` |
| :--- | :--- | :--- |
| 不使用 `new` 调用 | 普通函数可以被直接调用 | 直接报错 |
| 方法枚举性 | 手动赋值到 `prototype` 时默认可枚举 | 类方法默认不可枚举 |
| 运行模式 | 函数体可为非严格模式 | 类体始终是严格模式 |
| 继承语法 | 手动连接原型 | `extends` / `super` 标准化 |
| 现代成员 | 需自行建模 | 字段、静态成员、`#private` 私有成员等 |

因此，更准确的表述是：

> **`class` 保留了原型对象模型，同时增加了一组有自身语义约束的类式语法。**

---

## 4. 继承、子类型、委托和组合不是同一件事

| 概念 | 回答的问题 | 典型机制 |
| :--- | :--- | :--- |
| **类继承** | 子类如何复用或改写基类实现？ | Java `extends`、C++ 基类 |
| **子类型 / 能力约束** | 哪些值可以在某个接口位置使用？ | Java Interface、Rust Trait、Go Interface |
| **原型委托** | 对象自身没有属性时去哪里查找？ | JavaScript `[[Prototype]]` |
| **组合** | 一个对象如何使用另一个对象的能力？ | 成员字段、Go 嵌入、委托 |
| **Mixin / Trait 复用** | 如何横向复用一组行为？ | Ruby Module、PHP Trait |

“继承”既可能表示类型关系，也可能被用来复用实现；将两个目标拆开，通常更容易选择接口、Trait 或组合。

---

## 5. 实践选择

1. **需要稳定的名义类型和封装边界**：使用 Java/C#/Kotlin 类与接口。
2. **需要动态对象和灵活委托**：理解 JavaScript 原型；可用 `class` 组织领域对象。
3. **需要小型能力接口与低耦合组合**：参考 Go Interface 或 Rust Trait。
4. **仅为复用几行实现**：不要立即创建深继承树，先评估函数、组合、委托或 Trait/Mixin。
5. **评估语言的 OOP 能力**：分别检查封装、多态、复用和动态扩展，不要只检查是否有 `class` 关键字。
