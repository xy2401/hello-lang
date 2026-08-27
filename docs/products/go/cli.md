# Go 编译与运行

Go 工具链以统一的 `go` 命令完成源码运行、编译、环境检查和格式化。以下内容只覆盖单文件基础流程，不展开 module 依赖和完整项目构建。

- [go 命令](https://go.dev/cmd/go/)
- [go run](https://pkg.go.dev/cmd/go#hdr-Compile_and_run_Go_program)
- [gofmt](https://pkg.go.dev/cmd/gofmt)

## 确认工具链

```bash
go version
go env GOROOT GOOS GOARCH
```

`GOOS` 与 `GOARCH` 决定目标平台。排查多个安装来源时，可同时检查 Shell 解析到的 `go` 路径。

## 直接运行源码

`hello.go`：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	name := "world"
	if len(os.Args) > 1 {
		name = os.Args[1]
	}
	fmt.Printf("Hello, %s\n", name)
}
```

```bash
go run hello.go Alice
```

`go run` 会在临时位置编译并启动程序，适合试验；它不会在当前目录留下可分发二进制。

## 编译并运行产物

```bash
go build -o hello hello.go
./hello Alice
```

Windows 可将输出名设为 `hello.exe`。交叉编译通过环境变量选择目标，例如在 POSIX Shell 中：

```bash
GOOS=linux GOARCH=amd64 go build -o hello-linux-amd64 hello.go
```

生成的目标程序不能在不匹配的平台上直接运行；使用 CGO 时交叉编译还需要对应 C 工具链。

## 格式、输入与退出码

```bash
gofmt -d hello.go
gofmt -w hello.go
go vet hello.go
```

`-w` 会改写文件，审阅前可先用 `-d` 查看差异。程序参数来自 `os.Args`，标准输入使用 `os.Stdin`；明确失败状态可调用 `os.Exit(2)`，但 deferred 函数不会在 `os.Exit` 后执行。

编译错误会返回非零状态。出现 “package is not in std” 或 module 相关错误时，先确认工作目录、`go env GOMOD` 和源码的 package 声明，不要随意关闭 module 模式。

资料核对日期：2026-08-28。
