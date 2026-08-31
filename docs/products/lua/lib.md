# Lua 常用类库索引

Lua 是轻量级脚本语言，广泛用于游戏开发和嵌入式场景。

## 📦 核心类库分类

### 标准库（Lua stdlib）
- **基本功能** - print、type、tonumber
- **字符串操作** - string.sub、string.gsub、string.match
- **表操作** - table.insert、table.sort、table.concat
- **数学函数** - math.sin、math.random、math.max
- **调试模块** - debug.traceback、debug.getinfo
- **IO 操作** - io.open、io.read、io.write

### Web 开发
- **Web 框架** - Luakit、Lapis（基于 OpenResty）
- **HTTP 客户端** - luasocket、resty.http
- **API 服务** - Skyway、Wren

### 游戏开发
- **引擎** - Love2D、Corona SDK、Solar2D
- **游戏脚本** - Roblox、World of Warcraft（UI）、CryEngine
- **图形处理** - LÖVE、OpenGL bindings

### 测试与工具
- **测试框架** - Busted、LuaSpec、Toss
- **Mock 工具** - luacov、mock-lua
- **包管理** - Luarocks、Mooncake

### 数据库与缓存
- **MySQL/PostgreSQL** - luasql
- **Redis** - lua-redis、hiredis-lua
- **SQLite** - lsqlite3、lfs

### 网络通信
- **sockets** - luasocket、lua-corosocket
- **websocket** - lua-websocket、wscapi
- **MQTT** - mqtt.lua、paho.mqtt.c

---

*注：Lua 5.4+ 引入了协程和垃圾回收机制的改进*
