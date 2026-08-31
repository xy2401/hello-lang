import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const demosDir = path.join(root, 'demos');
const docsDir = path.join(root, 'docs');

console.log('🚀 Building 100% Comprehensive DSA Code & Documentation Matrix...');

function writeFile(relPath, content) {
  const fullPath = path.join(demosDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
}

// ---------------------------------------------------------------------
// 1. C & C++ (demos/cpp/dsa/) - Complete Set
// ---------------------------------------------------------------------
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

writeFile('cpp/dsa/linear/stack.c', `#include <stdio.h>
#include <stdbool.h>
#include <assert.h>

#define STACK_CAP 100

typedef struct {
    int data[STACK_CAP];
    int top;
} Stack;

void stack_init(Stack *s) { s->top = -1; }
bool stack_is_empty(const Stack *s) { return s->top == -1; }
void stack_push(Stack *s, int val) {
    assert(s->top < STACK_CAP - 1);
    s->data[++s->top] = val;
}
int stack_pop(Stack *s) {
    assert(!stack_is_empty(s));
    return s->data[s->top--];
}
int stack_peek(const Stack *s) {
    assert(!stack_is_empty(s));
    return s->data[s->top];
}

int main(void) {
    printf("=== C LIFO Stack ===\\n");
    Stack s;
    stack_init(&s);
    stack_push(&s, 100);
    stack_push(&s, 200);
    assert(stack_peek(&s) == 200);
    assert(stack_pop(&s) == 200);
    assert(stack_pop(&s) == 100);
    assert(stack_is_empty(&s));
    printf("C Stack tests passed successfully.\\n");
    return 0;
}`);

writeFile('cpp/dsa/linear/queue.cpp', `#include <iostream>
#include <queue>
#include <deque>
#include <cassert>

int main() {
    std::cout << "=== C++ std::queue & std::deque ===" << std::endl;
    std::queue<std::string> q;
    q.push("first");
    q.push("second");
    q.push("third");

    assert(q.front() == "first");
    q.pop();
    assert(q.front() == "second");
    assert(q.size() == 2);

    std::deque<int> dq = {1, 2, 3};
    dq.push_front(0);
    dq.push_back(4);
    assert(dq.front() == 0 && dq.back() == 4);

    std::cout << "C++ Queue tests passed successfully." << std::endl;
    return 0;
}`);

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

writeFile('cpp/dsa/graphs/union_find.cpp', `#include <iostream>
#include <vector>
#include <numeric>
#include <cassert>

class UnionFind {
    std::vector<int> parent, rank;
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        std::iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX == rootY) return false;
        if (rank[rootX] < rank[rootY]) parent[rootX] = rootY;
        else if (rank[rootX] > rank[rootY]) parent[rootY] = rootX;
        else { parent[rootY] = rootX; rank[rootX]++; }
        return true;
    }
    bool connected(int x, int y) { return find(x) == find(y); }
};

int main() {
    std::cout << "=== C++ Disjoint Set Union (Union-Find) ===" << std::endl;
    UnionFind uf(5);
    uf.unite(0, 1);
    uf.unite(1, 2);
    assert(uf.connected(0, 2));
    assert(!uf.connected(0, 3));
    std::cout << "C++ Union-Find tests passed successfully." << std::endl;
    return 0;
}`);

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

// ---------------------------------------------------------------------
// 2. Java (demos/java/dsa/) - Complete Set
// ---------------------------------------------------------------------
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

writeFile('java/dsa/linear/LinkedListDemo.java', `public class LinkedListDemo {
    public static void main(String[] args) {
        System.out.println("=== Java LinkedList & Deque Demo ===");
        java.util.LinkedList<String> list = new java.util.LinkedList<>();
        list.addFirst("first");
        list.addLast("last");

        if (!list.getFirst().equals("first") || !list.getLast().equals("last")) {
            throw new RuntimeException("LinkedList assertion failed");
        }

        System.out.println("Java LinkedList elements: " + list);
        System.out.println("Java LinkedList tests passed successfully.");
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

writeFile('java/dsa/trees/BstDemo.java', `public class BstDemo {
    static class Node {
        int val;
        Node left, right;
        Node(int v) { val = v; }
    }

    static Node insert(Node root, int val) {
        if (root == null) return new Node(val);
        if (val < root.val) root.left = insert(root.left, val);
        else if (val > root.val) root.right = insert(root.right, val);
        return root;
    }

    static boolean search(Node root, int val) {
        if (root == null) return false;
        if (root.val == val) return true;
        return val < root.val ? search(root.left, val) : search(root.right, val);
    }

    public static void main(String[] args) {
        System.out.println("=== Java Binary Search Tree ===");
        Node root = null;
        root = insert(root, 50);
        root = insert(root, 30);
        root = insert(root, 70);

        if (!search(root, 30) || search(root, 99)) {
            throw new RuntimeException("BST search assertion failed");
        }
        System.out.println("Java BST search tests passed successfully.");
    }
}`);

writeFile('java/dsa/sorting/QuickSortDemo.java', `public class QuickSortDemo {
    static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivot = arr[high];
            int i = low - 1;
            for (int j = low; j < high; j++) {
                if (arr[j] <= pivot) {
                    i++;
                    int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
                }
            }
            int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
            int pi = i + 1;
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Java Dual-Pivot QuickSort & In-Place Sort ===");
        int[] data = {64, 25, 12, 22, 11};
        quickSort(data, 0, data.length - 1);

        for (int i = 0; i < data.length - 1; i++) {
            if (data[i] > data[i + 1]) throw new RuntimeException("Not sorted");
        }
        System.out.println("Java QuickSort tests passed successfully.");
    }
}`);

writeFile('java/dsa/search/BinarySearchDemo.java', `public class BinarySearchDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Arrays.binarySearch ===");
        int[] arr = {10, 20, 30, 40, 50};
        int idx = java.util.Arrays.binarySearch(arr, 30);
        if (idx != 2) throw new RuntimeException("Search failed");

        System.out.println("Binary search index for 30: " + idx);
        System.out.println("Java Binary Search tests passed successfully.");
    }
}`);

writeFile('java/dsa/graphs/BfsDemo.java', `public class BfsDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Graph BFS Traversal ===");
        java.util.Map<Integer, java.util.List<Integer>> graph = new java.util.HashMap<>();
        graph.put(0, java.util.List.of(1, 2));
        graph.put(1, java.util.List.of(3));
        graph.put(2, java.util.List.of(4));
        graph.put(3, java.util.List.of());
        graph.put(4, java.util.List.of());

        java.util.List<Integer> order = new java.util.ArrayList<>();
        java.util.Queue<Integer> q = new java.util.LinkedList<>();
        java.util.Set<Integer> visited = new java.util.HashSet<>();

        q.offer(0);
        visited.add(0);

        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int v : graph.getOrDefault(u, java.util.List.of())) {
                if (!visited.contains(v)) {
                    visited.add(v);
                    q.offer(v);
                }
            }
        }

        if (order.size() != 5) throw new RuntimeException("BFS traversal count failed");
        System.out.println("BFS Traversal Order: " + order);
        System.out.println("Java Graph BFS tests passed successfully.");
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

console.log('✅ Base DSA Suite Generated.');
