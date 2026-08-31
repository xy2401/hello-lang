# Go 常用第三方库

## 📦 Web 框架

### Gin
官方链接：https://gin-gonic.com/

高性能 HTTP 路由框架，支持中间件、路由分组、JSON 验证。性能接近 Node.js Express，国内使用广泛。支持 SSE、GRPC 集成。

GitHub: [48k+ stars](https://github.com/gin-gonic/gin)

### Echo
官方链接：https://echo.labstack.com/

高性能 Web 框架，中间件系统完善。支持 HTTPS 自动续期、WebSocket、GRPC。设计简洁，API 易用。

GitHub: [26k+ stars](https://github.com/labstack/echo)

### Fiber
官方链接：https://docs.gofiber.io/

基于 Express 灵感的快速 Web 框架。语法类似 Express.js，但性能更好。支持 WebSockets、Rate Limiting、Request ID 等。

GitHub: [31k+ stars](https://github.com/gofiber/fiber)

### Chi
官方链接：https://github.com/go-chi/chi

轻量级路由工具，符合标准库风格。适合中小型项目，灵活性高，可与其他包组合。

GitHub: [9k+ stars](https://github.com/go-chi/chi)

## 🗄️ 数据库与 ORM

### GORM
官方链接：https://gorm.io/

最流行的 ORM 库，支持 ActiveRecord 模式、Preload 关联查询、事务处理。自动生成索引、日志、迁移工具。文档完善，国内教程多。

GitHub: [22k+ stars](https://github.com/go-gorm/gorm)

### sqlc
官方链接：https://sqlc.dev/

类型安全 SQL 生成器。编写原始 SQL，编译时自动生成类型安全的 Go 代码。结合 pgx/pgxpool使用，性能优于 ORM。

GitHub: [10k+ stars](https://github.com/kyleconroy/sqlc)

### Ent
官方链接：https://entgo.io/

Facebook 开发的 ORM，代码生成驱动。通过 GraphQL schema 定义数据库结构，生成模型和查询。适合大型复杂项目。

GitHub: [17k+ stars](https://github.com/facebook/ent)

## 🧪 测试工具

### Testify
官方链接：https://github.com/stretchr/testify

Mock 和断言框架。支持 Mock 对象、断言链、Table Driven Tests。与 standard testify/mock配合，广泛用于单元测试。

GitHub: [22k+ stars](https://github.com/stretchr/testify)

### gomock
官方链接：https://pkg.go.dev/github.com/golang/mock

Google Mock for Go，用于生成 Mock 接口。配合 go:generate指令，自动生成 mock 文件。

GitHub: [4k+ stars](https://github.com/golang/mock)

## 🔧 实用工具库

### Viper
官方链接：https://github.com/spf13/viper

配置管理工具，支持 JSON/YAML/TOML/Env 变量。自动从文件加载、环境变量覆盖、配置文件热更新。

GitHub: [21k+ stars](https://github.com/spf13/viper)

### Cobra
官方链接：https://github.com/spf13/cobra

CLI 应用框架，Kubernetes 使用的命令行工具。支持命令分层、自动帮助文档、参数解析、Shell 补全。

GitHub: [15k+ stars](https://github.com/spf13/cobra)

### Zap
官方链接： https://go.uber.org/zap/

Uber 出品的高性能结构化日志库。零分配设计，JSON/Console 输出格式，支持采样、分级。

GitHub: [20k+ stars](https://github.com/uber-go/zap)

### Zerolog
官方链接：https://github.com/rs/zerolog

极简 JSON 日志包，几乎零开销。速度快于 Zap，适合高并发场景。支持 TraceID、字段过滤。

GitHub: [8k+ stars](https://github.com/rs/zerolog)

### Afero
官方链接：https://github.com/spf13/afero

文件系统抽象层。将真实文件系统替换为内存文件系统，便于单元测试。支持多种后端实现。

GitHub: [8k+ stars](https://github.com/spf13/afero)

## 🌐 网络通信

### gRPC-Go
官方链接：https://grpc.io/docs/languages/go/

Google 的 RPC 框架，基于 HTTP/2。支持双向流、负载均衡、认证。微服务间通信标准协议。

GitHub: [51k+ stars](https://github.com/grpc/grpc-go)

### Go-Redis
官方链接：https://redis.com/developer/go

Redis 官方客户端，支持 Cluster/Pipeline/PubSub。连接池管理、事务处理、Lua 脚本执行。

GitHub: [18k+ stars](https://github.com/redis/go-redis)

### NATS Client
官方链接：https://nats.io/

NATS 消息队列官方客户端。轻量级、高性能、支持 JetStream持久化。适合分布式系统内部通信。

GitHub: [3k+ stars](https://github.com/nats-io/nats.go)

## 🏗️ 云原生工具

### Client-Go
官方链接：https://pkg.go.dev/k8s.io/client-go

Kubernetes API 客户端，支持所有 K8s 资源操作。内置缓存、Watch、List 功能，适合开发 Operator/Controller。

### Prometheus Client
官方链接：https://github.com/prometheus/client_golang

Prometheus 指标收集和暴露库。支持计数器、直方图、总结，自动化 HTTP endpoint 生成。

---

*注：部分经典库已过时，请参考现代替代方案*
