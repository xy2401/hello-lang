package main

import (
	"fmt"
)

func main() {
	fmt.Println("Go 1.22 Loop Var Scope Fix & Range Over Int:")
	values := []string{"a", "b", "c"}
	for _, v := range values {
		fmt.Printf("Goroutine item: %s\n", v)
	}
	fmt.Print("Range over int 5: ")
	for i := range 5 {
		fmt.Printf("%d ", i)
	}
	fmt.Println()
}
