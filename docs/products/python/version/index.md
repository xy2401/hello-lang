# Python 版本演进

Python 每年 10 月发布一个主特性版本。从 3.11 开始的 Faster CPython 项目大幅改善了解释器性能。

## 版本索引

### [Python 3.14](./python-3.14)

- **发布时间：** 2025 年 10 月
- **版本重点：** 自由线程构建进入正式支持。

### [Python 3.13](./python-3.13)

- **发布时间：** 2024 年 10 月
- **版本重点：** 实验性自由线程 CPython（Free-threaded CPython，可禁用 GIL 全局解释器锁，实现真正多核并行计算）。

### [Python 3.12](./py-312)

- **发布时间：** 2023 年 10 月
- **版本重点：** 隔离的子解释器（Sub-interpreters，每个子解释器拥有独立的 GIL）。

### [Python 3.11](./python-3.11)

- **发布时间：** 2022 年 10 月
- **版本重点：** Faster CPython 计划落地：自适应特化解释器（Specializing Adaptive Interpreter），执行性能提升 10%~60%。

### [Python 3.10](./py-310)

- **发布时间：** 2021 年 10 月
- **版本重点：** 结构化模式匹配（Structural Pattern Matching，match / case 语法）。

### [Python 3.8](./py-38)

- **发布时间：** 2019 年 10 月
- **版本重点：** 海象赋值表达式（Walrus Operator :=，在表达式内部赋值并返回）。

## 兼容性核对
- 升级至 Python 3.12+ 时需注意，历史长期弃用的 `distutils` 模块已被彻底移除，老旧三方库需升级至使用 `setuptools`。
