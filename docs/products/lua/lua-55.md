# Lua 5.5

Lua 5.5 系列加入全局变量声明、命名变参 Table、更紧凑的数组表示，并调整增量垃圾回收行为。本项目锁定 5.5.1，不使用滚动的 `latest` 标签。

## 5.5 语法示例

<<< ../../../demos/lua/lua55_demo.lua

<DockerOutput image="hello-lang-lua:5.5.1" sourceFile="demos/lua/lua55_demo.lua" />

`global` 和命名变参语法不能直接交给 5.4 解释器。共享代码若必须跨 5.4/5.5，应避免解析阶段不兼容的语法，或者在构建阶段分别生成入口文件。

