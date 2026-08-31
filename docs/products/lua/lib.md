# Lua 常用外部依赖库（Luarocks）

## 📦 Web 框架

### Luakit
官方链接： https://www.luakit.org/

Web 浏览器框架，基于 WebKitGTK。可扩展、可嵌入，类似 Node.js Electron。适合桌面应用。

GitHub: [2k+ stars](https://github.com/luakit/luakit)

### Lapis
官方链接： https://lapis.readthedocs.io/

OpenResty Web 框架，Lua版 Express.js。语法简洁，中间件丰富。配合 Nginx使用，性能优秀。

### Wren
官方链接： https://wren.io/

Web 应用框架，类 PHP/Laravel。路由、模板引擎、ORM支持。适合快速开发。

## 🔧 实用工具库

### luasocket
官方链接： https://waf.io/release/luasocket/

TCP/UDP网络通信库（必备），网络编程基础。Socket操作、HTTP客户端、SSL支持。

GitHub: [3k+ stars](https://github.com/lunarmodules/luasocket)

### lualib
官方链接： https://github.com/keplerproject/luafilesystem

标准库扩展，文件处理。目录遍历、路径拼接、文件读写。Lua文件系统标配。

### Penlight
官方链接： https://penlight.github.io/

函数式编程库，列表/表格/字符串操作。纯 Lua实现，跨平台，语法优雅。

GitHub: [1k+ stars](https://github.com/lunarmodules/penlight)

### Fennel
官方链接： https://fennel-lang.org/

Lisp 语法变体，运行在 Lua VM上。Clojure风格的宏系统，代码更简洁。

GitHub: [6k+ stars](https://github.com/bakpakin/Fennel)

### LuaSQL
官方链接： https://laserjuice.github.io/sql.lua/

数据库访问库，支持 SQLite/MySQL/PostgreSQL。统一 API 设计，连接池管理。

## 🎮 游戏开发

### Love2D (LÖVE)
官方链接： https://love2d.org/

2D游戏引擎，纯 Lua脚本。物理引擎、碰撞检测、音频播放。简单易用，独立游戏首选。

GitHub: [14k+ stars](https://github.com/love2d/love)

### Corona SDK
官方链接： https://coronalabs.com/

移动游戏开发框架，Cross-platform。可视化编辑器、云调试、商店发布。商业项目适用。

### Solar2D
官方链接： https://solar2d.org/

Corona开源替代版，免费使用。社区活跃，插件丰富。个人项目强烈推荐。

## 🗄️ 数据库与缓存

### LuaSQL
官方链接： https://laserjuice.github.io/sql.lua/

多数据库支持库，SQLite/MySQL/PostgreSQL/Odbc。统一接口，连接池管理。

GitHub: [1k+ stars](https://github.com/laserjuice/sql.lua)

### lua-redis
官方链接： https://github.com/liangjiandeng/lua-redis

Redis 客户端，支持命令调用、Pub/Sub。配合 OpenResty使用，高性能缓存方案。

GitHub: [1k+ stars](https://github.com/liangjiandeng/lua-redis)

### lfs
官方链接： https://antifork.com/lfs/

文件系统操作库，路径操作、目录遍历、文件 IO。Lua 5.3内置或可选安装。

## 🧪 测试工具

### Busted
官方链接： https://olivinelabs.com/busted/

Lua测试框架，BDD风格语法。describe/it结构清晰，异步测试支持好。

GitHub: [900+ stars](https://github.com/Olivine-Labs/busted)

### LuaSpec
官方链接： https://lua-spec.github.io/

BDD测试框架，spec-like 语法。期望式断言，代码可读性强。

### Toss
官方链接： https://github.com/kikito/toss

轻量级测试框架，简单直接。assertions 丰富，无复杂配置。

GitHub: [500+ stars](https://github.com/kikito/toss)

## ⚠️ 已废弃/不推荐

### LuaRocks 1.x
标记：🔴 旧版本包管理器

旧版包管理工具，建议升级到最新版。新版本支持更多仓库、依赖解决更好。

替代方案：LuaRocks v3+

### ZeroMQ-lua
标记：🔴 使用减少

ZeroMQ绑定库，但维护频率下降。可使用 luazmq等其他库替代。

替代方案：luazmq

---

*注：部分经典库已过时，请参考现代替代方案*
