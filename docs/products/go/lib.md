# Go 常用类库索引

Go 标准库丰富，第三方生态也在快速增长。

## 📦 核心类库分类

### 标准库精选（std）
- **context** - 取消传播、超时控制
- **sync** - Mutex, RWMutex, WaitGroup, Pool
- **sync/atomic** - 原子操作
- **io/ioutil** - IO 基础操作
- **encoding/json/xml** - 序列化/反序列化
- **time** - 时间处理与定时器
- **net/http** - HTTP 服务器与客户端
- **strings/slices** - 字符串与切片操作

### Web 开发栈
- **Web 框架** - Gin, Echo, Beego, Fiber, Chi
- **ORM** - GORM, Ent, sqlc, SQLBoiler
- **数据库驱动** - database/sql 内置支持
- **gRPC** - golang.org/x/net/grpc（官方）、grpc-go
- **消息队列** - NATS, Kafka (sarama)

### 工具与基础设施
- **日志** - logrus, zap, zerolog, go-kit/log
- **配置管理** - viper, flag, cobra
- **命令行** - cobra, urfave/cli
- **错误处理** - errors（Go 1.13+）, pkg/errors

### 测试与质量
- **测试框架** - testing（内置），testify, gomock
- **模糊测试** - go-fuzz
- **代码分析** - go vet, staticcheck
- **性能分析** - pprof（内置）, trace

### 云原生与 DevOps
- **容器化** - Docker SDK for Go
- **K8s** - client-go, controller-runtime
- **Prometheus** - prometheus/client_golang
- **OpenTelemetry** - opentelemetry-go

---

*注：Go 的"简单实用"理念体现在其标准库的设计中*
