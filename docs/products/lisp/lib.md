# Lisp 常用外部依赖库

## 📦 Common Lisp

### Quicklisp
官方链接： https://www.quicklisp.org/beta/

包管理工具（必备），类似 npm/maven。一键安装数千个 CL 库，自动解决依赖关系。Common Lisp生态入口。

GitHub: [1k+ stars](https://github.com/cl-quicklisp/quicklisp)

### ASDF
官方链接： https://common-lisp.net/project/asdf/

构建系统，定义项目结构。加载器、打包器、依赖管理器。所有 Common Lisp 项目的基础设施。

GitHub: [800+ stars](https://github.com/common-lisp/asdf)

### Hunchentoot
官方链接： https://beta.informatik.mh-hannover.de/~murakami/hunchentoot.html

Web 服务器，功能完整。路由、表单处理、Cookie/Session支持。适合中小型 Web 应用。

GitHub: [2k+ stars](https://github.com/truenode/hunchentoot)

### Trivial-HTTP-Server
官方链接： https://github.com/mach-imagery/trivial-http-server

轻量级 HTTP服务，单文件实现。启动快、配置少，适合 API测试、本地开发。

GitHub: [500+ stars](https://github.com/mach-imagery/trivial-http-server)

### Postmodern
官方链接： https://github.com/postmodern/postmodern

PostgreSQL适配器，数据库访问。连接池、事务管理、查询构建。Lisp 生态最成熟的 DB 驱动。

GitHub: [3k+ stars](https://github.com/postmodern/postmodern)

### Cl-JSON
官方链接： https://github.com/sharplispers/cl-json

JSON 处理库，编码解码 JSON。支持 Unicode、数字精度、大对象解析。Web API必备。

GitHub: [1k+ stars](https://github.com/sharplispers/cl-json)

## 🎨 GUI框架

### Clover
官方链接： https://common-lisp.net/project/clover/

Common Lisp GUI框架，跨平台。窗口控件、菜单、对话框，类似 Java Swing。桌面应用首选。

### XBL
官方链接： https://common-lisp.net/project/xbl/

XBL绑定库，XML 界面描述。声明式 UI 设计，组件复用。适合复杂桌面应用。

### Qtools
官方链接： https://github.com/radareorg/qtools

Qt封装库，C++ Qt的 Lisp 绑定。信号槽机制完善，性能接近原生 C++。

## 🔧 实用工具库

### Alexandria
官方链接： https://github.com/cl-utilities/alexandria

通用工具函数集。字符串操作、列表处理、宏定义。CL标准库扩展，几乎每项目必用。

GitHub: [400+ stars](https://github.com/cl-utilities/alexandria)

### Serve-Handler
官方链接： https://github.com/huozhi/serve-handler

请求处理抽象层，中间件风格。类似 Express 中间件，组合灵活。

### Clack
官方链接： https://clack.dev/

HTTP 服务器抽象层，统一接口。可切换实现（Hunchentoot/Serve Handler）。

### Incanter
官方链接： https://incanter.github.io/

数据分析与可视化库，类似 R/Python Pandas。统计图表、数据处理、科学计算。

GitHub: [2k+ stars](https://github.com/incanter/incanter)

## ⚠️ 已废弃/不推荐

### CL-HTTP
标记：🔴 旧 Web 框架

旧版 Web 服务器，已被 Hunchentoot替代。新库更活跃，社区资源更多。

替代方案：Hunchentoot

### MARC21
标记：🔴 过时的元数据标准

图书馆元数据标准，使用场景狭窄。通用场景建议改用 Dublin Core 等现代标准。

---

*注：部分经典库已过时，请参考现代替代方案*
