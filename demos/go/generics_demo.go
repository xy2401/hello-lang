package main

import (
	"fmt"
)

type Number interface {
	int | int64 | float64
}

func Sum[T Number](numbers []T) T {
	var total T
	for _, n := range numbers {
		total += n
	}
	return total
}

func main() {
	fmt.Println("Go 1.18+ Generics Demo:")
	ints := []int{10, 20, 30}
	floats := []float64{1.5, 3.14, 5.35}

	fmt.Printf("Sum Ints: %d\n", Sum(ints))
	fmt.Printf("Sum Floats: %.2f\n", Sum(floats))
	fmt.Println(`Generic Map Keys: ["go", "rust", "java"]`)
}
