# Lua 基础语法

Lua 默认变量是全局绑定，生产代码通常优先使用 `local`。函数是一等值并形成闭包；冒号调用把接收者作为隐式 `self`；模块就是返回 Table 的普通文件。

## Table、Metatable 与 Closure

<<< ../../../demos/lua/basic_demo.lua

<DockerOutput image="hello-lang-lua:5.5.1" sourceFile="demos/lua/basic_demo.lua" />

## Coroutine 与嵌入

`coroutine.create` 创建可恢复执行体，`yield` 把控制权和结果交回调用者，`resume` 继续执行。它不是并行线程：同一时刻仍只有当前协程运行。

C API 的基本流程是 `luaL_newstate`、打开所需库、注册宿主函数、加载并执行 chunk、读取栈上结果，最后 `lua_close`。Lua 栈索引和错误返回值必须在宿主边界严格检查。

