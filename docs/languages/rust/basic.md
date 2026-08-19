# Rust 基础语法

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> 本页面按照统一标准拆解 Rust 基础语法结构：变量声明、数据类型、条件分支、集合循环、函数定义与结构体。

---

## 🦀 Rust 基础语法示例源码 (`basic_demo.rs`)

```rust
// 4.1 结构化数据定义 (Struct)
struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: &str, age: u32) -> Self {
        Person { name: name.to_string(), age }
    }

    fn get_info(&self) -> String {
        format!("{} ({} years old)", self.name, self.age)
    }
}

// 3.1 函数定义与参数 (Function)
fn calculate_bonus(base: f64, ratio: f64) -> f64 {
    base * ratio
}

fn main() {
    // 1.1 变量声明与常量
    let lang: &str = "Rust";
    // 1.2 基本数据类型
    let age: u32 = 25;
    let salary: f64 = 8500.50;
    let is_active: bool = true;

    println!("Language: {}", lang);

    // 2.1 条件分支
    if is_active {
        println!("Status: Active Worker");
    } else {
        println!("Status: Inactive Worker");
    }

    // 2.2 集合与循环遍历
    let skills: Vec<&str> = vec!["Ownership", "Borrow Checker", "Cargo"];
    println!("Skills: {}", skills.join(" "));

    // 3.1 函数调用
    let bonus = calculate_bonus(salary, 0.1);
    println!("Calculated Bonus: ${:.2}", bonus);

    // 4.1 实例化结构体
    let p = Person::new("Alice", age);
    println!("Person Info: {}", p.get_info());
}
```

<DockerOutput
  image="rust:1.75-alpine"
  sourceFile="demos/rust/basic_demo.rs"
/>
