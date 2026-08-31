package main

import (
	"fmt"
	"slices"
)

func QuickSort[T ~int | ~string | ~float64](arr []T) {
	if len(arr) <= 1 {
		return
	}
	pivot := arr[len(arr)-1]
	i := 0
	for j := 0; j < len(arr)-1; j++ {
		if arr[j] <= pivot {
			arr[i], arr[j] = arr[j], arr[i]
			i++
		}
	}
	arr[i], arr[len(arr)-1] = arr[len(arr)-1], arr[i]
	QuickSort(arr[:i])
	QuickSort(arr[i+1:])
}

func main() {
	fmt.Println("=== Go Generic QuickSort & slices.Sort ===")
	data := []int{64, 25, 12, 22, 11}
	QuickSort(data)

	if !slices.IsSorted(data) {
		panic("Not sorted")
	}
	fmt.Printf("Sorted: %v\n", data)
	fmt.Println("Go QuickSort tests passed successfully.")
}
