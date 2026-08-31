import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const demosDir = path.join(root, 'demos');

console.log('🚀 Generating Full-Spectrum DSA Multi-Language Implementations...');

function writeFile(relPath, content) {
  const fullPath = path.join(demosDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
}

// -------------------------------------------------------------
// 1. C & C++ (demos/cpp/dsa/)
// -------------------------------------------------------------

// Linear
writeFile('cpp/dsa/linear/dynamic_array.c', `#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynamicArray;

DynamicArray* da_create(size_t initial_cap) {
    DynamicArray *arr = (DynamicArray*)malloc(sizeof(DynamicArray));
    arr->capacity = initial_cap > 0 ? initial_cap : 4;
    arr->size = 0;
    arr->data = (int*)malloc(arr->capacity * sizeof(int));
    return arr;
}

void da_push(DynamicArray *arr, int val) {
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        arr->data = (int*)realloc(arr->data, arr->capacity * sizeof(int));
    }
    arr->data[arr->size++] = val;
}

int da_get(const DynamicArray *arr, size_t idx) {
    assert(idx < arr->size);
    return arr->data[idx];
}

void da_free(DynamicArray *arr) {
    if (arr) {
        free(arr->data);
        free(arr);
    }
}

int main(void) {
    printf("=== C Dynamic Array ===\\n");
    DynamicArray *arr = da_create(2);
    da_push(arr, 10);
    da_push(arr, 20);
    da_push(arr, 30);
    assert(arr->size == 3);
    assert(arr->capacity == 4);
    assert(da_get(arr, 0) == 10);
    assert(da_get(arr, 1) == 20);
    assert(da_get(arr, 2) == 30);
    printf("DynamicArray size=%zu, cap=%zu, elements=[%d, %d, %d]\\n", 
           arr->size, arr->capacity, da_get(arr, 0), da_get(arr, 1), da_get(arr, 2));
    printf("C Dynamic Array tests passed successfully.\\n");
    da_free(arr);
    return 0;
}`);

writeFile('cpp/dsa/linear/dynamic_array.cpp', `#include <iostream>
#include <vector>
#include <cassert>
#include <algorithm>

template <typename T>
class CustomVector {
private:
    T* data_;
    size_t size_;
    size_t capacity_;

    void reallocate(size_t new_cap) {
        T* new_data = new T[new_cap];
        for (size_t i = 0; i < size_; ++i) {
            new_data[i] = std::move(data_[i]);
        }
        delete[] data_;
        data_ = new_data;
        capacity_ = new_cap;
    }

public:
    CustomVector(size_t init_cap = 4) : size_(0), capacity_(init_cap) {
        data_ = new T[capacity_];
    }
    ~CustomVector() { delete[] data_; }

    void push_back(const T& value) {
        if (size_ >= capacity_) reallocate(capacity_ * 2);
        data_[size_++] = value;
    }
    const T& operator[](size_t index) const { return data_[index]; }
    size_t size() const { return size_; }
    size_t capacity() const { return capacity_; }
};

int main() {
    std::cout << "=== C++ std::vector & Custom Vector ===" << std::endl;
    std::vector<int> std_vec = {10, 20, 30};
    std_vec.push_back(40);
    assert(std_vec.size() == 4);

    CustomVector<std::string> str_vec(2);
    str_vec.push_back("Hello");
    str_vec.push_back("DataStructures");
    str_vec.push_back("C++20");
    assert(str_vec.size() == 3);
    assert(str_vec.capacity() == 4);
    assert(str_vec[0] == "Hello");

    std::cout << "CustomVector elements: " << str_vec[0] << ", " << str_vec[1] << ", " << str_vec[2] << std::endl;
    std::cout << "C++ Dynamic Array tests passed successfully." << std::endl;
    return 0;
}`);

writeFile('cpp/dsa/linear/linked_list.c', `#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node* list_prepend(Node *head, int val) {
    Node *node = (Node*)malloc(sizeof(Node));
    node->value = val;
    node->next = head;
    return node;
}

void list_free(Node *head) {
    while (head) {
        Node *temp = head;
        head = head->next;
        free(temp);
    }
}

int main(void) {
    printf("=== C Singly Linked List ===\\n");
    Node *head = NULL;
    head = list_prepend(head, 30);
    head = list_prepend(head, 20);
    head = list_prepend(head, 10);

    assert(head->value == 10);
    assert(head->next->value == 20);
    assert(head->next->next->value == 30);

    printf("List traversal: %d -> %d -> %d -> NULL\\n", head->value, head->next->value, head->next->next->value);
    printf("C Linked List tests passed successfully.\\n");
    list_free(head);
    return 0;
}`);

writeFile('cpp/dsa/linear/linked_list.cpp', `#include <iostream>
#include <memory>
#include <forward_list>
#include <cassert>

template <typename T>
class LinkedList {
    struct Node {
        T data;
        std::unique_ptr<Node> next;
        Node(T val) : data(std::move(val)), next(nullptr) {}
    };
    std::unique_ptr<Node> head_;

public:
    void push_front(T val) {
        auto node = std::make_unique<Node>(std::move(val));
        node->next = std::move(head_);
        head_ = std::move(node);
    }
    const T& front() const { return head_->data; }
    bool empty() const { return head_ == nullptr; }
};

int main() {
    std::cout << "=== C++ std::forward_list & RAII UniquePtr List ===" << std::endl;
    std::forward_list<int> flist = {10, 20, 30};
    flist.push_front(5);
    assert(flist.front() == 5);

    LinkedList<std::string> custom_list;
    custom_list.push_front("World");
    custom_list.push_front("Hello");
    assert(custom_list.front() == "Hello");

    std::cout << "C++ Linked List tests passed successfully." << std::endl;
    return 0;
}`);

// Trees
writeFile('cpp/dsa/trees/binary_tree.cpp', `#include <iostream>
#include <memory>
#include <vector>
#include <cassert>

struct TreeNode {
    int val;
    std::unique_ptr<TreeNode> left;
    std::unique_ptr<TreeNode> right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(const TreeNode* node, std::vector<int>& out) {
    if (!node) return;
    inorder(node->left.get(), out);
    out.push_back(node->val);
    inorder(node->right.get(), out);
}

int main() {
    std::cout << "=== C++ Binary Tree with Smart Pointers ===" << std::endl;
    auto root = std::make_unique<TreeNode>(2);
    root->left = std::make_unique<TreeNode>(1);
    root->right = std::make_unique<TreeNode>(3);

    std::vector<int> traversed;
    inorder(root.get(), traversed);

    assert((traversed == std::vector<int>{1, 2, 3}));
    std::cout << "Inorder traversal: " << traversed[0] << ", " << traversed[1] << ", " << traversed[2] << std::endl;
    std::cout << "C++ Binary Tree tests passed successfully." << std::endl;
    return 0;
}`);

writeFile('cpp/dsa/trees/bst.c', `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <assert.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* bst_insert(BSTNode *root, int key) {
    if (!root) {
        BSTNode *n = (BSTNode*)malloc(sizeof(BSTNode));
        n->key = key;
        n->left = n->right = NULL;
        return n;
    }
    if (key < root->key) root->left = bst_insert(root->left, key);
    else if (key > root->key) root->right = bst_insert(root->right, key);
    return root;
}

bool bst_search(const BSTNode *root, int key) {
    if (!root) return false;
    if (root->key == key) return true;
    return key < root->key ? bst_search(root->left, key) : bst_search(root->right, key);
}

void bst_free(BSTNode *root) {
    if (!root) return;
    bst_free(root->left);
    bst_free(root->right);
    free(root);
}

int main(void) {
    printf("=== C Binary Search Tree (BST) ===\\n");
    BSTNode *root = NULL;
    root = bst_insert(root, 50);
    root = bst_insert(root, 30);
    root = bst_insert(root, 70);
    root = bst_insert(root, 20);

    assert(bst_search(root, 30) == true);
    assert(bst_search(root, 99) == false);
    printf("C BST search verified successfully.\\n");
    bst_free(root);
    return 0;
}`);

writeFile('cpp/dsa/trees/heap.cpp', `#include <iostream>
#include <queue>
#include <vector>
#include <cassert>

int main() {
    std::cout << "=== C++ std::priority_queue (Binary Heap) ===" << std::endl;
    std::priority_queue<int> max_heap;
    max_heap.push(15);
    max_heap.push(50);
    max_heap.push(30);

    assert(max_heap.top() == 50);
    max_heap.pop();
    assert(max_heap.top() == 30);

    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;
    min_heap.push(15);
    min_heap.push(50);
    min_heap.push(10);
    assert(min_heap.top() == 10);

    std::cout << "C++ Priority Queue tests passed successfully." << std::endl;
    return 0;
}`);

// Graphs
writeFile('cpp/dsa/graphs/bfs_dfs.cpp', `#include <iostream>
#include <vector>
#include <queue>
#include <cassert>

class Graph {
    int V;
    std::vector<std::vector<int>> adj;
public:
    Graph(int v) : V(v), adj(v) {}
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    std::vector<int> bfs(int start) {
        std::vector<int> order;
        std::vector<bool> visited(V, false);
        std::queue<int> q;

        visited[start] = true;
        q.push(start);

        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.push(v);
                }
            }
        }
        return order;
    }
};

int main() {
    std::cout << "=== C++ Graph BFS Traversal ===" << std::endl;
    Graph g(5);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);

    auto order = g.bfs(0);
    assert(order.size() == 5);
    assert(order[0] == 0);
    std::cout << "C++ Graph BFS traversal verified." << std::endl;
    return 0;
}`);

writeFile('cpp/dsa/graphs/dijkstra.cpp', `#include <iostream>
#include <vector>
#include <queue>
#include <cassert>

using Edge = std::pair<int, int>;

std::vector<int> dijkstra(int n, int start, const std::vector<std::vector<Edge>>& graph) {
    const int INF = 1e9;
    std::vector<int> dist(n, INF);
    std::priority_queue<Edge, std::vector<Edge>, std::greater<Edge>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto [w, v] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    std::cout << "=== C++ Dijkstra Shortest Path ===" << std::endl;
    int n = 4;
    std::vector<std::vector<Edge>> graph(n);
    graph[0].push_back({1, 1});
    graph[0].push_back({4, 2});
    graph[1].push_back({2, 2});
    graph[2].push_back({1, 3});
    graph[1].push_back({5, 3});

    auto dist = dijkstra(n, 0, graph);
    assert(dist[3] == 4);
    std::cout << "Shortest path to node 3: " << dist[3] << std::endl;
    std::cout << "C++ Dijkstra tests passed successfully." << std::endl;
    return 0;
}`);

// Sorting
writeFile('cpp/dsa/sorting/quick_sort.cpp', `#include <iostream>
#include <vector>
#include <algorithm>
#include <cassert>

int main() {
    std::cout << "=== C++ std::sort (Introsort) & QuickSort ===" << std::endl;
    std::vector<int> vec = {64, 25, 12, 22, 11};
    std::sort(vec.begin(), vec.end());

    assert(std::is_sorted(vec.begin(), vec.end()));
    assert((vec[0] == 11 && vec[4] == 64));

    std::cout << "Sorted result: ";
    for (int v : vec) std::cout << v << " ";
    std::cout << "\\nC++ Sort tests passed successfully." << std::endl;
    return 0;
}`);

// Search
writeFile('cpp/dsa/search/binary_search.cpp', `#include <iostream>
#include <vector>
#include <algorithm>
#include <cassert>

int main() {
    std::cout << "=== C++ Binary Search & Bounds ===" << std::endl;
    std::vector<int> arr = {10, 20, 20, 20, 30, 40, 50};

    bool exists = std::binary_search(arr.begin(), arr.end(), 30);
    assert(exists);

    auto lower = std::lower_bound(arr.begin(), arr.end(), 20);
    auto upper = std::upper_bound(arr.begin(), arr.end(), 20);

    assert(std::distance(arr.begin(), lower) == 1);
    assert(std::distance(arr.begin(), upper) == 4);

    std::cout << "Target 20 range count: " << (upper - lower) << std::endl;
    std::cout << "C++ Binary Search tests passed successfully." << std::endl;
    return 0;
}`);

// DP
writeFile('cpp/dsa/dp/knapsack.cpp', `#include <iostream>
#include <vector>
#include <algorithm>
#include <cassert>

int knapsack01(int W, const std::vector<int>& weights, const std::vector<int>& values) {
    int n = weights.size();
    std::vector<int> dp(W + 1, 0);

    for (int i = 0; i < n; ++i) {
        for (int w = W; w >= weights[i]; --w) {
            dp[w] = std::max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[W];
}

int main() {
    std::cout << "=== C++ 0/1 Knapsack Dynamic Programming ===" << std::endl;
    std::vector<int> weights = {2, 3, 4, 5};
    std::vector<int> values = {3, 4, 5, 6};
    int W = 5;

    int max_val = knapsack01(W, weights, values);
    assert(max_val == 7);

    std::cout << "Max knapsack value for W=5: " << max_val << std::endl;
    std::cout << "C++ Knapsack DP tests passed successfully." << std::endl;
    return 0;
}`);

// -------------------------------------------------------------
// 2. Rust (demos/rust/dsa/)
// -------------------------------------------------------------
writeFile('rust/dsa/linear/dynamic_array.rs', `fn main() {
    println!("=== Rust Vec & VecDeque ===");
    let mut vec: Vec<i32> = Vec::with_capacity(2);
    vec.push(10);
    vec.push(20);
    vec.push(30);

    assert_eq!(vec.len(), 3);
    assert!(vec.capacity() >= 4);
    assert_eq!(vec[0], 10);
    assert_eq!(vec.pop(), Some(30));

    let sum: i32 = vec.iter().sum();
    assert_eq!(sum, 30);
    println!("Rust Vec len={}, sum={}", vec.len(), sum);
    println!("Rust Dynamic Array tests passed successfully.");
}`);

writeFile('rust/dsa/trees/heap.rs', `use std::collections::BinaryHeap;

fn main() {
    println!("=== Rust BinaryHeap (Priority Queue) ===");
    let mut heap = BinaryHeap::new();
    heap.push(15);
    heap.push(50);
    heap.push(30);

    assert_eq!(heap.peek(), Some(&50));
    assert_eq!(heap.pop(), Some(50));
    assert_eq!(heap.pop(), Some(30));
    assert_eq!(heap.pop(), Some(15));
    assert_eq!(heap.pop(), None);

    println!("Rust BinaryHeap tests passed successfully.");
}`);

writeFile('rust/dsa/sorting/quick_sort.rs', `fn quick_sort<T: Ord>(slice: &mut [T]) {
    if slice.len() <= 1 {
        return;
    }
    let pivot_idx = partition(slice);
    let (left, right) = slice.split_at_mut(pivot_idx);
    quick_sort(left);
    quick_sort(&mut right[1..]);
}

fn partition<T: Ord>(slice: &mut [T]) -> usize {
    let len = slice.len();
    let mut i = 0;
    for j in 0..len - 1 {
        if slice[j] <= slice[len - 1] {
            slice.swap(i, j);
            i += 1;
        }
    }
    slice.swap(i, len - 1);
    i
}

fn main() {
    println!("=== Rust Idiomatic In-Place QuickSort ===");
    let mut data = vec![64, 25, 12, 22, 11];
    quick_sort(&mut data);
    assert_eq!(data, vec![11, 12, 22, 25, 64]);
    println!("Sorted: {:?}", data);
    println!("Rust QuickSort tests passed successfully.");
}`);

writeFile('rust/dsa/dp/knapsack.rs', `fn knapsack_01(capacity: usize, weights: &[usize], values: &[usize]) -> usize {
    let mut dp = vec![0; capacity + 1];
    for (&w, &v) in weights.iter().zip(values.iter()) {
        for j in (w..=capacity).rev() {
            dp[j] = dp[j].max(dp[j - w] + v);
        }
    }
    dp[capacity]
}

fn main() {
    println!("=== Rust 0/1 Knapsack Dynamic Programming ===");
    let weights = [2, 3, 4, 5];
    let values = [3, 4, 5, 6];
    let max_val = knapsack_01(5, &weights, &values);
    assert_eq!(max_val, 7);
    println!("Knapsack result: {}", max_val);
    println!("Rust DP Knapsack tests passed successfully.");
}`);

// -------------------------------------------------------------
// 3. Go (demos/go/dsa/)
// -------------------------------------------------------------
writeFile('go/dsa/linear/dynamic_array.go', `package main

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

	fmt.Printf("Slice len=%d, cap=%d, elements=%v\\n", len(slice), cap(slice), slice)
	fmt.Println("Go Dynamic Array tests passed successfully.")
}`);

writeFile('go/dsa/trees/bst.go', `package main

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
}`);

writeFile('go/dsa/sorting/quick_sort.go', `package main

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
	fmt.Printf("Sorted: %v\\n", data)
	fmt.Println("Go QuickSort tests passed successfully.")
}`);

// -------------------------------------------------------------
// 4. Java (demos/java/dsa/)
// -------------------------------------------------------------
writeFile('java/dsa/linear/DynamicArrayDemo.java', `public class DynamicArrayDemo {
    public static void main(String[] args) {
        System.out.println("=== Java ArrayList & Vector Demo ===");
        java.util.List<Integer> list = new java.util.ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);

        if (list.size() != 3 || list.get(1) != 20) {
            throw new RuntimeException("Assertion failed");
        }

        int sum = list.stream().mapToInt(Integer::intValue).sum();
        if (sum != 60) {
            throw new RuntimeException("Sum assertion failed");
        }

        System.out.println("Java ArrayList size=" + list.size() + ", sum=" + sum);
        System.out.println("Java Dynamic Array tests passed successfully.");
    }
}`);

writeFile('java/dsa/trees/HeapDemo.java', `public class HeapDemo {
    public static void main(String[] args) {
        System.out.println("=== Java PriorityQueue (Min/Max Heap) ===");
        java.util.PriorityQueue<Integer> minHeap = new java.util.PriorityQueue<>();
        minHeap.offer(50);
        minHeap.offer(15);
        minHeap.offer(30);

        if (minHeap.peek() != 15) throw new RuntimeException("Heap peek failed");
        if (minHeap.poll() != 15) throw new RuntimeException("Heap poll failed");
        if (minHeap.poll() != 30) throw new RuntimeException("Heap poll failed");
        if (minHeap.poll() != 50) throw new RuntimeException("Heap poll failed");

        System.out.println("Java PriorityQueue tests passed successfully.");
    }
}`);

writeFile('java/dsa/dp/KnapsackDemo.java', `public class KnapsackDemo {
    public static int knapsack(int W, int[] weights, int[] values) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < weights.length; i++) {
            for (int w = W; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        return dp[W];
    }

    public static void main(String[] args) {
        System.out.println("=== Java 0/1 Knapsack DP ===");
        int[] weights = {2, 3, 4, 5};
        int[] values = {3, 4, 5, 6};
        int maxVal = knapsack(5, weights, values);

        if (maxVal != 7) throw new RuntimeException("Knapsack assertion failed");
        System.out.println("Max Knapsack Value: " + maxVal);
        System.out.println("Java Knapsack DP tests passed successfully.");
    }
}`);

// -------------------------------------------------------------
// 5. Python (demos/python/dsa/)
// -------------------------------------------------------------
writeFile('python/dsa/linear/dynamic_array.py', `from collections import deque

def main():
    print("=== Python list & collections.deque ===")
    arr: list[int] = [10, 20]
    arr.append(30)
    assert len(arr) == 3
    assert arr[1] == 20
    assert arr.pop() == 30

    dq: deque[str] = deque(["middle"])
    dq.appendleft("front")
    dq.append("back")
    assert list(dq) == ["front", "middle", "back"]

    print(f"Python list: {arr}, deque: {list(dq)}")
    print("Python Dynamic Array tests passed successfully.")

if __name__ == "__main__":
    main()
`);

writeFile('python/dsa/trees/heap.py', `import heapq

def main():
    print("=== Python heapq Priority Queue ===")
    heap: list[int] = []
    heapq.heappush(heap, 50)
    heapq.heappush(heap, 15)
    heapq.heappush(heap, 30)

    assert heap[0] == 15
    assert heapq.heappop(heap) == 15
    assert heapq.heappop(heap) == 30
    assert heapq.heappop(heap) == 50

    print("Python heapq tests passed successfully.")

if __name__ == "__main__":
    main()
`);

writeFile('python/dsa/sorting/quick_sort.py', `def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

def main():
    print("=== Python Functional QuickSort & TimSort ===")
    data = [64, 25, 12, 22, 11]
    sorted_data = quick_sort(data)
    assert sorted_data == [11, 12, 22, 25, 64]
    assert sorted(data) == sorted_data

    print(f"Sorted data: {sorted_data}")
    print("Python QuickSort tests passed successfully.")

if __name__ == "__main__":
    main()
`);

// -------------------------------------------------------------
// 6. TypeScript (demos/typescript/dsa/)
// -------------------------------------------------------------
writeFile('typescript/dsa/linear/dynamic_array.ts', `export class DynamicArray<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  get size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }
}

function main() {
  console.log("=== TypeScript Generic Dynamic Array ===");
  const arr = new DynamicArray<number>();
  arr.push(10);
  arr.push(20);
  arr.push(30);

  if (arr.size !== 3 || arr.get(1) !== 20) {
    throw new Error("Assertion failed");
  }

  console.log("TypeScript Array elements:", arr.toArray());
  console.log("TypeScript Dynamic Array tests passed successfully.");
}

main();
`);

writeFile('typescript/dsa/sorting/quick_sort.ts', `export function quickSort<T>(arr: T[], compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)): T[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((x) => compare(x, pivot) < 0);
  const middle = arr.filter((x) => compare(x, pivot) === 0);
  const right = arr.filter((x) => compare(x, pivot) > 0);
  return [...quickSort(left, compare), ...middle, ...quickSort(right, compare)];
}

function main() {
  console.log("=== TypeScript Generic QuickSort ===");
  const numbers = [64, 25, 12, 22, 11];
  const sorted = quickSort(numbers);

  if (JSON.stringify(sorted) !== JSON.stringify([11, 12, 22, 25, 64])) {
    throw new Error("Sort failed");
  }

  console.log("Sorted result:", sorted);
  console.log("TypeScript QuickSort tests passed successfully.");
}

main();
`);

console.log('✅ Full Spectrum DSA Multi-Language Files Successfully Generated!');

