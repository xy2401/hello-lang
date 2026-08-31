# Lisp 基础语法

Lisp 源码主要由原子与列表组成。`quote` 阻止求值，函数调用把操作符放在首位，`lambda` 创建闭包，宏在求值前改写形式。具体函数名会随方言变化，但“读取—扩展—求值”的心智模型可以迁移。

## Common Lisp 家族基础示例

示例用一个小宏同时展示 S-expression、Reader/Evaluator 和代码生成。

<<< ../../../demos/lisp/basic_demo.lisp

<DockerOutput image="clfoundation/sbcl:2.6.8" sourceFile="demos/lisp/basic_demo.lisp" />

## REPL 使用原则

- 在 REPL 中先构造最小表达式，再把稳定定义移入源码文件。
- 区分“数据列表”和“调用形式”：`'(add 1 2)` 是数据，`(add 1 2)` 才会求值。
- 宏用于扩展语法；普通数据变换优先写函数，以保留运行时组合能力。
- 包、命名空间或模块是大型程序的边界，不要依赖 REPL 的隐式全局状态。

