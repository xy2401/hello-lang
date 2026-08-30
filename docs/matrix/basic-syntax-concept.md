# 统一语法骨架

> 本页面精选 **Java, JavaScript, TypeScript, Python, C++, Rust, Go, PHP, C#, Ruby, Kotlin** 做核心语法对比，并将 **HTML/CSS** 作为声明式 Web 技术独立说明。Groovy、Scala、Clojure 在各自产品分卷中展开，避免在深度矩阵中重复同一 JVM 基础。

## 1. 变量声明与常量

### Java
```java
// final 关键字声明不可变常量
final String LANG = "Java";
String name = "Java"; // var 默认可变
```

### JavaScript
```javascript
// const 声明不可变常量，let 声明可变变量
const LANG = "JavaScript";
let name = "JavaScript";
```

### TypeScript
```typescript
// const + 类型注解
const LANG: string = "TypeScript";
let name: string = "TypeScript";
```

### Python
```python
# 大写约定表示常量，使用类型注解
LANG: str = "Python"
name: str = "Python"
```

### C++
```cpp
// const 关键字声明常量
const std::string LANG = "C++";
std::string name = "C++";
```

### Rust
```rust
// let 默认不可变，mut 显式声明可变
const LANG: &str = "Rust";
let name: &str = "Rust";
let mut mutable_name: &str = "Rust";
```

### Go
```go
// const 声明编译期常量，var 声明变量
const LANG = "Go"
var name = "Go"
```

### PHP
```php
// define() 或 const 声明常量
define("LANG", "PHP");
$name = "PHP";
```

### C#
```csharp
// const 声明编译期常量
const string LANG = "C#";
string name = "C#";
```

### Ruby
```ruby
# 首字母大写标识常量（约定）
LANG = "Ruby"
name = "Ruby"
```

### Kotlin
```kotlin
// val 声明不可变变量，var 声明可变变量
const val LANG = "Kotlin"
val name = "Kotlin"
var mutableName = "Kotlin"
```

---

## 2. 基本数据类型

### Java
```java
int age = 25;
double salary = 8500.50;
boolean isActive = true;
String name = "Java";
char grade = 'A';
```

### JavaScript
```javascript
let age = 25;          // number
const salary = 8500.50; // number
const isActive = true;  // boolean
const name = "JavaScript"; // string
```

### Python
```python
age: int = 25
salary: float = 8500.50
is_active: bool = True
name: str = "Python"
```

### Rust
```rust
let age: i32 = 25;
let salary: f64 = 8500.50;
let is_active: bool = true;
let name: &str = "Rust";
```

### Go
```go
var age int = 25
var salary float64 = 8500.50
var isActive bool = true
var name string = "Go"
```

---

## 3. 函数定义

### Java
```java
public static int add(int a, int b) {
    return a + b;
}
```

### JavaScript
```javascript
function add(a, b) {
    return a + b;
}

// 或使用箭头函数
const add = (a, b) => a + b;
```

### Python
```python
def add(a: int, b: int) -> int:
    return a + b
```

### Rust
```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

### Go
```go
func add(a int, b int) int {
    return a + b
}
```

### Shell (Bash)
```bash
add() {
    echo $(( $1 + $2 ))
}
```

---

## 4. 控制流

### 条件语句
```java
// Java - if/else
if (age > 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}
```

```javascript
// JavaScript
if (age > 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

```python
# Python
if age > 18:
    print("Adult")
else:
    print("Minor")
```

```bash
# Bash
if [ $age -gt 18 ]; then
    echo "Adult"
else
    echo "Minor"
fi
```

---

## 5. 面向对象

### Java
```java
class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public void sayHello() {
        System.out.println("Hello, " + name);
    }
}
```

### Python
```python
class Person:
    def __init__(self, name: str):
        self.name = name
    
    def say_hello(self):
        print(f"Hello, {self.name}")
```

### Rust
```rust
struct Person {
    name: String,
}

impl Person {
    fn new(name: String) -> Self {
        Person { name }
    }
    
    fn say_hello(&self) {
        println!("Hello, {}", self.name);
    }
}
```

### Go
```go
type Person struct {
    Name string
}

func NewPerson(name string) Person {
    return Person{Name: name}
}

func (p Person) SayHello() {
    fmt.Println("Hello,", p.Name)
}
```

---

## 📌 HTML/CSS 声明式模型

> HTML 和 CSS 是声明式 Web 语言，不具备命令式编程的特征（如变量、循环、类），应单独理解其结构/语义、层叠/布局模型。

### HTML（结构化语义）
```html
<!DOCTYPE html>
<html>
<head><title>Hello</title></head>
<body>
  <h1>Hello World</h1>
  <p>This is a paragraph.</p>
</body>
</html>
```

### CSS（样式化布局）
```css
h1 {
  color: blue;
  font-size: 24px;
}

p {
  line-height: 1.6;
}
```

---

## 总结

| 特性 | 静态强类型 | 动态弱类型 | 声明式 |
|------|-----------|-----------|--------|
| **代表语言** | Java, Rust, Go, C# | JavaScript, Python, PHP | HTML, CSS |
| **变量声明** | 需要类型/推断 | 不需要类型 | N/A |
| **类型检查** | 编译期 | 运行时 | N/A |
| **适合场景** | 大型项目、安全性要求高 | 快速开发、灵活性 | 界面描述 |

选择语言时，根据项目需求权衡这些因素。
