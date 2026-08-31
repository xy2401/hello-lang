package main

import "fmt"

type TreeNode[T any] struct {
	Val   T
	Left  *TreeNode[T]
	Right *TreeNode[T]
}

func Insert(root *TreeNode[int], val int) *TreeNode[int] {
	if root == nil {
		return &TreeNode[int]{Val: val}
	}
	if val < root.Val {
		root.Left = Insert(root.Left, val)
	} else if val > root.Val {
		root.Right = Insert(root.Right, val)
	}
	return root
}

func Search(root *TreeNode[int], val int) bool {
	if root == nil {
		return false
	}
	if root.Val == val {
		return true
	}
	if val < root.Val {
		return Search(root.Left, val)
	}
	return Search(root.Right, val)
}

func main() {
	fmt.Println("=== Go Generics Binary Search Tree ===")
	var root *TreeNode[int]
	root = Insert(root, 50)
	root = Insert(root, 30)
	root = Insert(root, 70)

	if !Search(root, 30) || Search(root, 99) {
		panic("BST search assertion failed")
	}

	fmt.Println("Go Generic BST search verified successfully.")
}
