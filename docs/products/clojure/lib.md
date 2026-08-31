# Clojure 常用类库索引

Clojure 是 Lisp 家族在 JVM 上的现代方言，强调函数式编程。

## 📦 核心类库分类

### 标准库（clojure.core）
- **集合操作** - map, filter, reduce, concat
- **并发原语** - Atom, Ref, Agent, Future
- **函数式工具** - partial, comp, memoize
- **数据结构** - persistent-trees, vectors
- **宏系统** - Macro definitions

### Web 开发框架
- **Web 框架** - Ring, Compojure, Pedestal
- **全栈框架** - Re-frame（前端 + 后端）
- **HTTP 客户端** - curl、clj-http
- **服务器端** - Jetty、Undertow

### 数据与持久化
- **数据库** - Datomic、PostgreSQL（java.jdbc）
- **JSON 处理** - Cheshire、jsonista
- **日志系统** - Slingshot、Clojure.tools.logging
- **配置管理** - Enlive、Hiccup

### 测试与工具
- **测试框架** - clojure.test、core.match
- **Mock 工具** - Midje、Mockery
- **代码覆盖** - gen-coverage
- **REPL 工具** - cider、nrepl-server

### 函数式编程库
- **spec.alpha** - 数据规格验证
- **core.async** - 异步编程通道
- **manifold** - 流处理工具集

---

*注：REPL 驱动的交互式开发是 Clojure 的核心优势*
