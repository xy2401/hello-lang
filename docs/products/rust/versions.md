# Rust 版本演进

Rust 每 6 周发布一个稳定小版本，每 3 年发布一个全新的 **Edition（版本纪元）**，在保持向前兼容的同时引入语法演进。

## 核心版本演进与关键里程碑

### Rust Edition 2024（2025 年 2 月）

**主要功能与架构演进：**

- 原生异步闭包（Async Closures `async || {}`）进入稳定版
- RPITIT（Return Position `impl Trait` in Trait）与 AFIT（Async fn in Trait）全面成熟
- 临时值生存期（Temporary Lifetime Extension）规则进一步精准收紧，降低隐式悬垂风险

**工程影响与选型建议：**

> 现代异步编程与 Trait 表达力的重要里程碑。

### Rust Edition 2021（2021 年 10 月）

**主要功能与架构演进：**

- 闭包不相交字段捕获（Disjoint Capture in Closures）：闭包仅捕获所访问的具体结构体字段而非整个结构体
- 支持针对数组的 `IntoIterator` 遍历（`for x in [1, 2, 3]` 无需 `.iter()`）
- Panic 宏语法与格式化字符串统一

**工程影响与选型建议：**

> 闭包借用检查摩擦大幅减轻的经典纪元。

### Rust Edition 2018（2018 年 12 月）

**主要功能与架构演进：**

- 原生引入 `async` / `.await` 异步关键字
- 非词法作用域生命周期（Non-Lexical Lifetimes, NLL）：根据变量实际最后一次使用的位置精确释放借用
- 模块路径语法简化，消除历史冗余的 `extern crate`

**工程影响与选型建议：**

> 使 Rust 真正走向主流工业界应用的关键转折点。

### Rust 1.0（2015 年 5 月）

**主要功能与架构演进：**

- Rust 正式确立稳定性承诺（Stability Guarantee）
- 确立基于所有权（Ownership）、借用（Borrowing）与生命周期（Lifetimes）的无 GC 内存安全模型

**工程影响与选型建议：**

> 系统级编程语言历史的里程碑。

## Edition 升级实战
```bash
# 使用 cargo 自动化升级项目版本纪元
cargo fix --edition
cargo clippy
```
