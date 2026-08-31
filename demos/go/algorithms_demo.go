package main

import (
	"fmt"
	"sort"
)

type Score struct {
	Name  string
	Value int
}

func bfs(graph map[string][]string, start string) []string {
	order := []string{}
	seen := map[string]bool{}
	queue := []string{start}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		if seen[node] { continue }
		seen[node] = true
		order = append(order, node)
		queue = append(queue, graph[node]...)
	}
	return order
}

func main() {
	scores := []Score{{"Lin", 91}, {"Ada", 95}, {"Kai", 91}}
	sort.SliceStable(scores, func(i, j int) bool {
		if scores[i].Value != scores[j].Value { return scores[i].Value > scores[j].Value }
		return scores[i].Name < scores[j].Name
	})
	numbers := []int{2, 5, 8, 13, 21}
	index := sort.SearchInts(numbers, 13)
	graph := map[string][]string{"A": {"B", "C"}, "B": {"D"}, "C": {"D"}}

	fmt.Printf("sorted=%v\n", scores)
	fmt.Printf("binary-search-13=%d\n", index)
	fmt.Printf("bfs=%v\n", bfs(graph, "A"))
}
