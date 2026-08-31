# Racket

Racket 把语言本身当作可组合的库。文件首行 `#lang` 选择 Reader、宏、绑定与工具链，模块可以定义新的 `#lang`。这使它特别适合教学语言、DSL、静态检查和语言导向编程。

## 独特能力

- `#lang` 决定整个模块的语言，而不仅是导入一组函数。
- Contract 在模块边界检查值与行为，并把错误责任定位到提供方或调用方。
- 透明 Struct 提供可模式匹配、可打印的结构化数据。
- Syntax Object 同时携带代码、词法上下文和源位置信息，是可靠宏扩展的基础。

<<< ../../../demos/lisp/racket_demo.rkt

<DockerOutput image="hello-lang-racket:9.3" sourceFile="demos/lisp/racket_demo.rkt" />

