package main

import (
	"container/heap"
	"container/list"
	"fmt"
	"sort"
)

type Stack[T any] []T

func (s *Stack[T]) Push(value T) { *s = append(*s, value) }
func (s *Stack[T]) Pop() T {
	last := len(*s) - 1
	value := (*s)[last]
	*s = (*s)[:last]
	return value
}

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)         { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() any {
	old := *h
	value := old[len(old)-1]
	*h = old[:len(old)-1]
	return value
}

func main() {
	stack := Stack[string]{"parse", "validate"}
	stack.Push("render")
	scores := map[string]int{"Ada": 95, "Lin": 91}
	keys := []string{"Ada", "Lin"}
	sort.Strings(keys)
	queue := list.New()
	queue.PushBack("first")
	tasks := &IntHeap{2, 1, 3}
	heap.Init(tasks)

	fmt.Printf("stack-pop=%s\n", stack.Pop())
	fmt.Printf("scores=%s:%d,%s:%d\n", keys[0], scores[keys[0]], keys[1], scores[keys[1]])
	fmt.Printf("queue-first=%s\n", queue.Front().Value)
	fmt.Printf("heap-min=%d\n", heap.Pop(tasks))
}
