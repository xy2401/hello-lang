# Common Lisp

Common Lisp 是大型、多范式的 ANSI 标准语言。它不仅有列表处理，还包含泛型函数与 CLOS 对象系统、可恢复的 Condition/Restart、Package、编译器宏和丰富的序列协议。SBCL 是本项目的执行实现。

## 独特能力

- CLOS 以泛型函数为中心，可按多个参数的类型分派。
- Condition 描述异常情况，Restart 描述可由调用者选择的恢复策略。
- Package 管理符号身份；它不是文件系统模块的简单同义词。
- 声明、类型信息与 `compile` 让交互式开发和原生编译共存。

<<< ../../../demos/lisp/common_lisp_demo.lisp

<DockerOutput image="clfoundation/sbcl:2.6.8" sourceFile="demos/lisp/common_lisp_demo.lisp" />

标准定义语言语义，实现提供编译器、GC、调试器与扩展。生产代码应明确哪些部分属于 ANSI Common Lisp，哪些依赖 SBCL。

