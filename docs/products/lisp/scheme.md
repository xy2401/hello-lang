# Scheme

Scheme 用极小的核心组合出强大的抽象。词法作用域、一等过程、正确尾调用与卫生宏是它最鲜明的设计。R7RS 是语言报告，本项目用 GNU Guile 3.0.11 执行示例。

## 独特能力

- 正确尾调用保证尾递归不会随迭代次数持续占用调用栈。
- `syntax-rules` 以模式方式定义卫生宏，自动处理引入标识符的作用域。
- 过程和闭包是模块化与状态封装的基础工具。
- SRFI 为列表、记录、线程等常用能力提供跨实现提案，但并非每项都属于 R7RS-small。

<<< ../../../demos/lisp/scheme_demo.scm

<DockerOutput image="hello-lang-guile:3.0.11" sourceFile="demos/lisp/scheme_demo.scm" />

阅读 Scheme 代码时，先确认目标报告、实现和已导入的 SRFI；仅写“Scheme”不足以确定完整运行环境。

