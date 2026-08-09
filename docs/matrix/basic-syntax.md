# 📌 10 大语言基础语法跨语言对照大屏

> 本页面提取了 **Java, JS, Python, C++, Rust, Go, PHP, C#, Ruby, Kotlin** 十大语言在标准代码骨架下的核心语法形态，方便开发者按小节横向比对不同语言的语法差异。

---

## 1.1 变量声明与常量 (Variables & Constants)

### ☕ Java
```java
// Java: final 关键字声明不可变常量
final String lang = "Java";
```

### 🟨 JavaScript
```javascript
// JavaScript: const 声明不可变常量，let 声明可变变量
const lang = "JavaScript";
```

### 🐍 Python
```python
# Python: 大写约定表示常量，使用类型注解
LANG: str = "Python"
```

### ⚡ C++
```cpp
// C++: const 关键字声明常量
const std::string lang = "C++";
```

### 🦀 Rust
```rust
// Rust: let 默认不可变，常量使用 const
let lang: &str = "Rust";
```

### 🐹 Go
```go
// Go: const 关键字声明常量，:= 自动推导变量
const lang = "Go"
```

### 🐘 PHP
```php
// PHP: define() 或 const 声明常量
define("LANG", "PHP");
```

### 🔷 C#
```csharp
// C#: const 关键字声明编译期常量
const string lang = "C#";
```

### 💎 Ruby
```ruby
# Ruby: 首字母大写标识常量
LANG = "Ruby"
```

### 🟣 Kotlin
```kotlin
// Kotlin: val 声明不可变变量，var 声明可变变量
val lang: String = "Kotlin"
```

---

## 1.2 基本数据类型 (Basic Data Types)

### ☕ Java
```java
int age = 25;
double salary = 8500.50;
boolean isActive = true;
String name = "Java";
```

### 🟨 JavaScript
```javascript
let age = 25;
const salary = 8500.50;
const isActive = true;
const name = "JavaScript";
```

### 🐍 Python
```python
age: int = 25
salary: float = 8500.50
is_active: bool = True
name: str = "Python"
```

### ⚡ C++
```cpp
int age = 25;
double salary = 8500.50;
bool isActive = true;
std::string name = "C++";
```

### 🦀 Rust
```rust
let age: u32 = 25;
let salary: f64 = 8500.50;
let is_active: bool = true;
let name: &str = "Rust";
```

### 🐹 Go
```go
age := 25
salary := 8500.50
isActive := true
name := "Go"
```

### 🐘 PHP
```php
$age = 25;
$salary = 8500.50;
$isActive = true;
$name = "PHP";
```

### 🔷 C#
```csharp
int age = 25;
double salary = 8500.50;
bool isActive = true;
string name = "C#";
```

### 💎 Ruby
```ruby
age = 25
salary = 8500.50
is_active = true
name = "Ruby"
```

### 🟣 Kotlin
```kotlin
val age: Int = 25
val salary: Double = 8500.50
val isActive: Boolean = true
val name: String = "Kotlin"
```

---

## 2.1 条件分支与控制流 (Control Flow `if/else`)

### ☕ Java
```java
if (isActive) {
    System.out.println("Status: Active Worker");
} else {
    System.out.println("Status: Inactive Worker");
}
```

### 🟨 JavaScript
```javascript
if (isActive) {
    console.log("Status: Active Worker");
} else {
    console.log("Status: Inactive Worker");
}
```

### 🐍 Python
```python
if is_active:
    print("Status: Active Worker")
else:
    print("Status: Inactive Worker")
```

### ⚡ C++
```cpp
if (isActive) {
    std::cout << "Status: Active Worker" << std::endl;
} else {
    std::cout << "Status: Inactive Worker" << std::endl;
}
```

### 🦀 Rust
```rust
if is_active {
    println!("Status: Active Worker");
} else {
    println!("Status: Inactive Worker");
}
```

### 🐹 Go
```go
if isActive {
    fmt.Println("Status: Active Worker")
} else {
    fmt.Println("Status: Inactive Worker")
}
```

### 🐘 PHP
```php
if ($isActive) {
    echo "Status: Active Worker\n";
} else {
    echo "Status: Inactive Worker\n";
}
```

### 🔷 C#
```csharp
if (isActive) {
    Console.WriteLine("Status: Active Worker");
} else {
    Console.WriteLine("Status: Inactive Worker");
}
```

### 💎 Ruby
```ruby
if is_active
  puts "Status: Active Worker"
else
  puts "Status: Inactive Worker"
end
```

### 🟣 Kotlin
```kotlin
if (isActive) {
    println("Status: Active Worker")
} else {
    println("Status: Inactive Worker")
}
```

---

## 2.2 集合与循环遍历 (Collections & Loops)

### ☕ Java
```java
List<String> skills = Arrays.asList("OOP", "Concurrency", "JVM");
for (String skill : skills) {
    System.out.print(skill + " ");
}
```

### 🟨 JavaScript
```javascript
const skills = ["V8 Engine", "Async/Await", "ES6+"];
console.log("Skills:", skills.join(" "));
```

### 🐍 Python
```python
skills: list[str] = ["Dynamic Typing", "List Comprehension", "GIL"]
print("Skills:", " ".join(skills))
```

### ⚡ C++
```cpp
std::vector<std::string> skills = {"RAII", "Pointers", "Templates"};
for (const auto& skill : skills) {
    std::cout << skill << " ";
}
```

### 🦀 Rust
```rust
let skills: Vec<&str> = vec!["Ownership", "Borrow Checker", "Cargo"];
println!("Skills: {}", skills.join(" "));
```

### 🐹 Go
```go
skills := []string{"Goroutines", "Channels", "Interfaces"}
fmt.Printf("Skills: %s\n", strings.Join(skills, " "))
```

### 🐘 PHP
```php
$skills = ["Composer", "Laravel", "OpCache"];
echo "Skills: " . implode(" ", $skills) . "\n";
```

### 🔷 C#
```csharp
var skills = new List<string> { "LINQ", "ASP.NET Core", "Entity Framework" };
Console.WriteLine("Skills: " + string.Join(" ", skills));
```

### 💎 Ruby
```ruby
skills = ["Rails", "Blocks", "Metaprogramming"]
puts "Skills: #{skills.join(' ')}"
```

### 🟣 Kotlin
```kotlin
val skills = listOf("Coroutines", "Null Safety", "Extension Functions")
println("Skills: ${skills.joinToString(" ")}")
```

---

## 3.1 函数定义与默认参数 (Functions)

### ☕ Java
```java
public static double calculateBonus(double base, double ratio) {
    return base * ratio;
}
```

### 🟨 JavaScript
```javascript
function calculateBonus(base, ratio = 0.1) {
    return base * ratio;
}
```

### 🐍 Python
```python
def calculate_bonus(base: float, ratio: float = 0.1) -> float:
    return base * ratio
```

### ⚡ C++
```cpp
double calculateBonus(double base, double ratio = 0.1) {
    return base * ratio;
}
```

### 🦀 Rust
```rust
fn calculate_bonus(base: f64, ratio: f64) -> f64 {
    base * ratio
}
```

### 🐹 Go
```go
func calculateBonus(base float64, ratio float64) float64 {
    return base * ratio
}
```

### 🐘 PHP
```php
function calculateBonus(float $base, float $ratio = 0.1): float {
    return $base * $ratio;
}
```

### 🔷 C#
```csharp
public static double CalculateBonus(double baseVal, double ratio = 0.1) {
    return baseVal * ratio;
}
```

### 💎 Ruby
```ruby
def calculate_bonus(base, ratio = 0.1)
  base * ratio
end
```

### 🟣 Kotlin
```kotlin
fun calculateBonus(base: Double, ratio: Double = 0.1): Double = base * ratio
```

---

## 4.1 结构化数据/类与构造器 (Class / Struct)

### ☕ Java
```java
class Person {
    private String name; private int age;
    public Person(String name, int age) { this.name = name; this.age = age; }
    public String getInfo() { return name + " (" + age + " years old)"; }
}
```

### 🟨 JavaScript
```javascript
class Person {
    constructor(name, age) { this.name = name; this.age = age; }
    getInfo() { return `${this.name} (${this.age} years old)`; }
}
```

### 🐍 Python
```python
class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age
    def get_info(self) -> str:
        return f"{self.name} ({self.age} years old)"
```

### ⚡ C++
```cpp
class Person {
private:
    std::string name; int age;
public:
    Person(std::string n, int a) : name(n), age(a) {}
    std::string getInfo() const { return name + " (" + std::to_string(age) + " years old)"; }
};
```

### 🦀 Rust
```rust
struct Person { name: String, age: u32 }
impl Person {
    fn new(name: &str, age: u32) -> Self { Person { name: name.to_string(), age } }
    fn get_info(&self) -> String { format!("{} ({} years old)", self.name, self.age) }
}
```

### 🐹 Go
```go
type Person struct { Name string; Age int }
func (p Person) GetInfo() string {
    return fmt.Sprintf("%s (%d years old)", p.Name, p.Age)
}
```

### 🐘 PHP
```php
class Person {
    public function __construct(public string $name, public int $age) {}
    public function getInfo(): string { return "{$this->name} ({$this->age} years old)"; }
}
```

### 🔷 C#
```csharp
public class Person
{
    public string Name { get; } public int Age { get; }
    public Person(string name, int age) { Name = name; Age = age; }
    public string GetInfo() => $"{Name} ({Age} years old)";
}
```

### 💎 Ruby
```ruby
class Person
  attr_reader :name, :age
  def initialize(name, age)
    @name = name; @age = age
  end
  def get_info
    "#{@name} (#{@age} years old)"
  end
end
```

### 🟣 Kotlin
```kotlin
class Person(val name: String, val age: Int) {
    fun getInfo(): String = "$name ($age years old)"
}
```
