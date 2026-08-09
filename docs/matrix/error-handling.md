# 🛡️ 跨语言错误处理与控制流哲学

> 错误处理是设计语言时最具争议的领域。本文对比 **Java/Python/C# 异常机制 (Exceptions)** vs **Rust `Result<T, E>`** vs **Go 显式返回值 `err`** vs **C++23 `std::expected`**。

---

## 1. 📊 八大语言错误处理机制对照表

| 语言 | 核心错误处理机制 | 是否强制要求调用方处理 | 性能开销 | 典型范式与代码 |
| :--- | :--- | :--- | :--- | :--- |
| **Rust** | **`Result<T, E>` + `?` 运算符** | **编译期强约束 (弃用报警)** | **0 额外开销** | `let res = fetch_data()?;` |
| **Go** | **双返回值 `(T, error)`** | 依靠 Lint / 习惯约束 | **0 额外开销** | `val, err := doSomething()` |
| **Java** | Checked Exception & Unchecked Exception | Checked 强要求 try-catch | 发生异常时产生 StackTrace 开销 | `try { ... } catch (IOException e)` |
| **C++23** | Exception / `std::expected<T, E>` | `std::expected` 可显式校验 | 异常路线有 Stack Unwind 开销 | `auto res = parse_num("42");` |
| **Python** | Exception / EAFP 哲学 | 运行时捕获 | 抛异常开销较大 | `try: ... except ValueError:` |
| **C#** | Exception 体系 | 不强制 Checked | 产生 StackTrace | `try { ... } catch (Exception ex)` |

---

## 2. 🛡️ 错误处理哲学三大流派

### 流派 A: 显式值返回与代数数据类型 (Rust & C++23)
错误不是破坏控制流的异常，而是函数返回类型的一部分。通过 `Result<T, E>` 强制要求调用者显式处理。

### 流派 B: 多返回值与显式校验 (Go)
显式返回 `(result, err)`，代码直观透明，杜绝隐式异常穿透。

### 流派 C: 异常捕获与 Stack Trace 展开 (Java, Python, C#)
使用 `try-catch` / `try-except` 捕获运行期冒泡的 Exception，适合快速开发。
