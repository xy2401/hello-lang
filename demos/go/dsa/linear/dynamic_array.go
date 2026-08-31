package main

import (
	"fmt"
)

func main() {
	fmt.Println("=== Go Slices & Generic Vector ===")
	slice := make([]int, 0, 2)
	slice = append(slice, 10, 20, 30)

	if len(slice) != 3 || cap(slice) < 3 {
		panic("invalid slice state")
	}
	if slice[0] != 10 || slice[1] != 20 || slice[2] != 30 {
		panic("invalid values")
	}

	fmt.Printf("Slice len=%d, cap=%d, elements=%v\n", len(slice), cap(slice), slice)
	fmt.Println("Go Dynamic Array tests passed successfully.")
}
