# Python 版本演进

Python 每年 10 月发布一个主特性版本。从 3.11 开始的 Faster CPython 项目大幅改善了解释器性能。

## 核心版本演进与关键里程碑

### Python 3.13（2024 年 10 月）

**主要功能与架构演进：**

- 实验性自由线程 CPython（Free-threaded CPython，可禁用 GIL 全局解释器锁，实现真正多核并行计算）
- 实验性即时编译器（JIT Compiler，基于 Copy-and-Patch 技术）
- 全新的交互式 REPL 终端：支持彩色多行编辑、自动缩进与直接查看函数签名文档

**工程影响与选型建议：**

> 开启 Python 真正多核并行与 JIT 时代的历史性转折点。

### Python 3.12（2023 年 10 月）

**主要功能与架构演进：**

- 隔离的子解释器（Sub-interpreters，每个子解释器拥有独立的 GIL）
- 全新的类型参数语法（PEP 695，如 `type Point = tuple[float, float]` 与泛型函数 `def func[T](a: T) -> T:`）
- 进一步优化 f-string 语法限制（支持在表达式内嵌套引号与反斜杠）

**工程影响与选型建议：**

> 类型提示与并发架构的大幅现代化。

### Python 3.11（2022 年 10 月）

**主要功能与架构演进：**

- Faster CPython 计划落地：自适应特化解释器（Specializing Adaptive Interpreter），执行性能提升 10%~60%
- 细粒度错误追溯定位（Enhanced Error Tracebacks），报错精确定位到行内具体子表达式

**工程影响与选型建议：**

> 解释器运行效率的巨大跨越。

### Python 3.10（2021 年 10 月）

**主要功能与架构演进：**

- 结构化模式匹配（Structural Pattern Matching，`match / case` 语法）
- 联合类型简写语法（`int | str` 替代 `Union[int, str]`）

**工程影响与选型建议：**

> 复杂数据解构与类型系统的重大语法糖。

### Python 3.8（2019 年 10 月）

**主要功能与架构演进：**

- 海象赋值表达式（Walrus Operator `:=`，在表达式内部赋值并返回）
- 仅限位置形参修饰符（Positional-only parameters `/`）

**工程影响与选型建议：**

> 日常代码表达力的重要提升。

## 兼容性核对
- 升级至 Python 3.12+ 时需注意，历史长期弃用的 `distutils` 模块已被彻底移除，老旧三方库需升级至使用 `setuptools`。
