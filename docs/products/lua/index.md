# Lua

Lua 是小型、可嵌入、动态类型语言。它用一种核心复合类型 Table 同时表达数组、字典、对象与模块；Metatable 改写运算语义，Closure 保留 Upvalue，Coroutine 提供协作式挂起与恢复。宿主程序可通过 C API 创建状态、注册函数并执行脚本。

本分卷以 Lua 5.5.1 为教学和运行基线。建议依次阅读[基础语法](./basic)、[数据结构](./data-structures)、[算法](./algorithms)与 [Lua 5.5](./lua-55)，最后通过[版本路线](./version/)确认兼容边界。

## 适用场景

- 游戏、网络服务和桌面程序的嵌入式脚本层。
- 配置、插件和轻量 DSL。
- 需要可控运行时、低集成成本与清晰 C ABI 的系统。
- 以 Coroutine 构建协作式任务或迭代器。

