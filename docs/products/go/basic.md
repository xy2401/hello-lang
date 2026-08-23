# Go 基础语法

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> 本页面按照统一标准拆解 Go 基础语法结构：变量声明、数据类型、条件分支、集合循环、函数定义与 Struct。

---

## 🐹 Go 基础语法示例源码 (`basic_demo.go`)

```go
package main

import (
	"fmt"
	"strings"
)

// 4.1 结构化数据定义 (Struct)
type Person struct {
	Name string
	Age  int
}

func (p Person) GetInfo() string {
	return fmt.Sprintf("%s (%d years old)", p.Name, p.Age)
}

// 3.1 函数定义与参数 (Function)
func calculateBonus(base float64, ratio float64) float64 {
	return base * ratio
}

func main() {
	// 1.1 变量声明与常量
	const lang = "Go"
	// 1.2 基本数据类型
	age := 25
	salary := 8500.50
	isActive := true

	fmt.Printf("Language: %s\n", lang)

	// 2.1 条件分支
	if isActive {
		fmt.Println("Status: Active Worker")
	} else {
		fmt.Println("Status: Inactive Worker")
	}

	// 2.2 集合与循环遍历
	skills := []string{"Goroutines", "Channels", "Interfaces"}
	fmt.Printf("Skills: %s\n", strings.Join(skills, " "))

	// 3.1 函数调用
	bonus := calculateBonus(salary, 0.1)
	fmt.Printf("Calculated Bonus: $%.2f\n", bonus)

	// 4.1 实例化结构体
	p := Person{Name: "Alice", Age: age}
	fmt.Printf("Person Info: %s\n", p.GetInfo())
}
```

<DockerOutput
  image="golang:1.22-alpine"
  sourceFile="demos/go/basic_demo.go"
/>
