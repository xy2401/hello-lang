# Clojure 常用外部依赖库（Clojars/Maven）

## 📦 Web 框架

### Ring
官方链接： https://github.com/ring-clojure/ring

HTTP抽象层，类似 WSGI。中间件机制、统一请求/响应格式。所有 Clojure Web 框架的底层依赖。

GitHub: [1k+ stars](https://github.com/ring-clojure/ring)

### Compojure
官方链接： https://github.com/compojure/compojure

HTTP路由库，基于 Ring。路径匹配、参数提取、路由分组。类似 Express.js，语法简洁。

GitHub: [2k+ stars](https://github.com/compojure/compojure)

### Pedestal
官方链接： https://pedestal.io/

全功能 Web 栈，支持 HTTP/WebSockets。状态机驱动，可扩展性强。适合复杂交互式应用。

GitHub: [3k+ stars](https://github.com/pedestal/pedestal)

### Re-frame
官方链接： https://re-frame.io/

前端 + 后端全栈框架，函数式编程范式。Reagent(前端)+ Re-derp(后端)，状态管理清晰。

GitHub: [6k+ stars](https://github.com/re-framere/re-frame)

## 🗄️ 数据库与持久化

### Datomic
官方链接： https://www.datomic.com/

不可变数据库，原子时间旅行查询。数据模型独特，事务处理优秀。商业产品，有免费试用版。

### HikariCP
官方链接： https://github.com/brettwooldridge/HikariCP

JDBC 连接池，性能最佳。几乎所有 Java/Clojure JDBC 项目都用它作为连接池实现。

GitHub: [18k+ stars](https://github.com/brettwooldridge/HikariCP)

### Java-JDBC
官方链接： https://docs.oracle.com/javase/tutorial/jdbc/

Java生态 JDBC 库，Clojure可无缝调用。适合需要 Java 丰富生态系统支持的场景。

## 🧪 测试工具

### clojure.test
官方链接： https://clojuredocs.org/clojure.test

标准测试库，轻量简单。is-test/assert-test等宏定义测试用例，集成在 stdlib 中。

### Midje
官方链接： https://github.com/midje/midje

BDD 风格测试，事实驱动。描述行为而非实现细节，适合 TDD/BDD。

GitHub: [1k+ stars](https://github.com/midje/midje)

### Speccy
官方链接： https://github.com/noprompt/speccy

数据规格验证库，类似 JSON Schema。验证数据结构、字段约束、类型检查。

## 🔧 实用工具库

### Cheshire
官方链接： https://github.com/dakrone/cheshire

JSON 处理库，编码解码高效。配合 Jackson 使用，支持流式处理。

GitHub: [500+ stars](https://github.com/dakrone/cheshire)

### Core.async
官方链接： https://clojure.github.io/core.async/

异步编程通道库，Go Channel灵感。管道操作符、超时控制、选择操作。并发编程利器。

GitHub: [4k+ stars](https://github.com/clojure/core.async)

### Spec.alpha
官方链接： https://spec.alpha-specs.netlify.app/

数据规格验证库，schema 定义规范。结合 data.reader 使用，类型安全校验。

### Enlive
官方链接： https://en-live.github.io/

HTML模板引擎，基于 CSS 选择器。选择节点替换、组合变换，类似 jQuery 的服务器端版本。

### Hiccup
官方链接： https://github.com/weavejester/hiccup

HTML 构建器，用 Vector 表示 HTML 树。语法简洁，与 Clojure 数据完美结合。

GitHub: [2k+ stars](https://github.com/weavejester/hiccup)

## ⚠️ 已废弃/不推荐

### Incani
标记：🔴 旧 HTTP客户端

旧 HTTP客户端库，建议使用 Ring/HTTPer。新库维护更积极，生态更好。

替代方案：Httper/Clj-http

### Carmen
标记：🔴 CSS 生成器较少维护

CSS 生成器库，但社区活跃度低。建议直接使用 CSS 预处理工具或 Tailwind CSS。

---

*注：部分经典库已过时，请参考现代替代方案*
