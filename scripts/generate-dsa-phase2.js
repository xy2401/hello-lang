import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const demosDir = path.join(root, 'demos');

console.log('🚀 Generating Phase 2 DSA Multi-Language Implementations (JS, C#, Kotlin, PHP, Ruby, Lua, Lisp)...');

function writeFile(relPath, content) {
  const fullPath = path.join(demosDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
}

// -------------------------------------------------------------
// 1. JavaScript (demos/javascript/dsa/)
// -------------------------------------------------------------
writeFile('javascript/dsa/linear/dynamic_array.js', `console.log("=== JavaScript Array & Deque Demo ===");
const arr = [10, 20];
arr.push(30);
console.assert(arr.length === 3, "Length assertion failed");
console.assert(arr[1] === 20, "Index assertion failed");
console.assert(arr.pop() === 30, "Pop assertion failed");

const deque = ["center"];
deque.unshift("front");
deque.push("back");
console.assert(deque[0] === "front" && deque[2] === "back", "Deque assertion failed");

console.log("JS Array:", arr, "Deque:", deque);
console.log("JavaScript Dynamic Array tests passed successfully.");
`);

writeFile('javascript/dsa/trees/bst.js', `class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const node = new BSTNode(val);
    if (!this.root) {
      this.root = node;
      return;
    }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = node; break; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = node; break; }
        curr = curr.right;
      }
    }
  }

  search(val) {
    let curr = this.root;
    while (curr) {
      if (curr.val === val) return true;
      curr = val < curr.val ? curr.left : curr.right;
    }
    return false;
  }
}

console.log("=== JavaScript Binary Search Tree ===");
const bst = new BST();
bst.insert(50);
bst.insert(30);
bst.insert(70);

console.assert(bst.search(30) === true, "Search 30 failed");
console.assert(bst.search(99) === false, "Search 99 failed");
console.log("JavaScript BST tests passed successfully.");
`);

writeFile('javascript/dsa/sorting/quick_sort.js', `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

console.log("=== JavaScript QuickSort & V8 TimSort ===");
const data = [64, 25, 12, 22, 11];
const sorted = quickSort(data);
console.assert(JSON.stringify(sorted) === JSON.stringify([11, 12, 22, 25, 64]), "Sort failed");
console.log("Sorted:", sorted);
console.log("JavaScript QuickSort tests passed successfully.");
`);

writeFile('javascript/dsa/dp/knapsack.js', `function knapsack01(W, weights, values) {
  const n = weights.length;
  const dp = new Int32Array(W + 1);

  for (let i = 0; i < n; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[W];
}

console.log("=== JavaScript 0/1 Knapsack DP ===");
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const maxVal = knapsack01(5, weights, values);
console.assert(maxVal === 7, "Knapsack assertion failed");
console.log("Max Knapsack Value for W=5:", maxVal);
console.log("JavaScript Knapsack DP tests passed successfully.");
`);

// -------------------------------------------------------------
// 2. C# (demos/csharp/dsa/)
// -------------------------------------------------------------
writeFile('csharp/dsa/linear/DynamicArrayDemo.cs', `using System;
using System.Collections.Generic;

public class DynamicArrayDemo
{
    public static void Main()
    {
        Console.WriteLine("=== C# List<T> & Span<T> Demo ===");
        var list = new List<int> { 10, 20 };
        list.Add(30);

        if (list.Count != 3 || list[1] != 20)
            throw new Exception("List assertion failed");

        list.RemoveAt(list.Count - 1);
        if (list.Count != 2)
            throw new Exception("Remove assertion failed");

        ReadOnlySpan<int> span = list.ToArray().AsSpan();
        int sum = 0;
        foreach (var val in span) sum += val;
        if (sum != 30) throw new Exception("Span sum failed");

        Console.WriteLine($"C# List size={list.Count}, sum={sum}");
        Console.WriteLine("C# Dynamic Array tests passed successfully.");
    }
}
`);

writeFile('csharp/dsa/trees/HeapDemo.cs', `using System;
using System.Collections.Generic;

public class HeapDemo
{
    public static void Main()
    {
        Console.WriteLine("=== C# PriorityQueue<TElement, TPriority> ===");
        var pq = new PriorityQueue<string, int>();
        pq.Enqueue("Low Priority", 30);
        pq.Enqueue("High Priority", 10);
        pq.Enqueue("Medium Priority", 20);

        string first = pq.Dequeue();
        if (first != "High Priority") throw new Exception("PriorityQueue failed");

        Console.WriteLine($"Dequeued highest priority element: {first}");
        Console.WriteLine("C# PriorityQueue tests passed successfully.");
    }
}
`);

writeFile('csharp/dsa/sorting/QuickSortDemo.cs', `using System;

public class QuickSortDemo
{
    public static void QuickSort(Span<int> arr)
    {
        if (arr.Length <= 1) return;
        int pivot = arr[arr.Length - 1];
        int i = 0;
        for (int j = 0; j < arr.Length - 1; j++)
        {
            if (arr[j] <= pivot)
            {
                (arr[i], arr[j]) = (arr[j], arr[i]);
                i++;
            }
        }
        (arr[i], arr[arr.Length - 1]) = (arr[arr.Length - 1], arr[i]);
        QuickSort(arr.Slice(0, i));
        QuickSort(arr.Slice(i + 1));
    }

    public static void Main()
    {
        Console.WriteLine("=== C# Span<T> In-Place QuickSort ===");
        int[] data = { 64, 25, 12, 22, 11 };
        QuickSort(data.AsSpan());

        for (int i = 0; i < data.Length - 1; i++)
        {
            if (data[i] > data[i + 1]) throw new Exception("Not sorted");
        }

        Console.WriteLine("Sorted: " + string.Join(", ", data));
        Console.WriteLine("C# QuickSort tests passed successfully.");
    }
}
`);

writeFile('csharp/dsa/dp/KnapsackDemo.cs', `using System;

public class KnapsackDemo
{
    public static int Knapsack(int W, int[] weights, int[] values)
    {
        int[] dp = new int[W + 1];
        for (int i = 0; i < weights.Length; i++)
        {
            for (int w = W; w >= weights[i]; w--)
            {
                dp[w] = Math.Max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        return dp[W];
    }

    public static void Main()
    {
        Console.WriteLine("=== C# 0/1 Knapsack DP ===");
        int[] weights = { 2, 3, 4, 5 };
        int[] values = { 3, 4, 5, 6 };
        int maxVal = Knapsack(5, weights, values);

        if (maxVal != 7) throw new Exception("Knapsack failed");
        Console.WriteLine("Max Value: " + maxVal);
        Console.WriteLine("C# Knapsack DP tests passed successfully.");
    }
}
`);

// -------------------------------------------------------------
// 3. Kotlin (demos/kotlin/dsa/)
// -------------------------------------------------------------
writeFile('kotlin/dsa/linear/DynamicArrayDemo.kt', `fun main() {
    println("=== Kotlin ArrayList & ArrayDeque ===")
    val list = mutableListOf(10, 20)
    list.add(30)
    check(list.size == 3) { "Size assertion failed" }
    check(list[1] == 20) { "Index assertion failed" }

    val deque = ArrayDeque<String>()
    deque.addFirst("first")
    deque.addLast("last")
    check(deque.first() == "first" && deque.last() == "last")

    println("Kotlin List: $list, Deque: $deque")
    println("Kotlin Dynamic Array tests passed successfully.")
}
`);

writeFile('kotlin/dsa/sorting/QuickSortDemo.kt', `fun <T : Comparable<T>> List<T>.quickSorted(): List<T> {
    if (size <= 1) return this
    val pivot = this[size / 2]
    val left = filter { it < pivot }
    val equal = filter { it == pivot }
    val right = filter { it > pivot }
    return left.quickSorted() + equal + right.quickSorted()
}

fun main() {
    println("=== Kotlin Functional QuickSort ===")
    val data = listOf(64, 25, 12, 22, 11)
    val sorted = data.quickSorted()
    check(sorted == listOf(11, 12, 22, 25, 64)) { "Sort failed" }

    println("Sorted: $sorted")
    println("Kotlin QuickSort tests passed successfully.")
}
`);

writeFile('kotlin/dsa/dp/KnapsackDemo.kt', `import kotlin.math.max

fun knapsack(capacity: Int, weights: IntArray, values: IntArray): Int {
    val dp = IntArray(capacity + 1)
    for (i in weights.indices) {
        for (w in capacity downTo weights[i]) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
        }
    }
    return dp[capacity]
}

fun main() {
    println("=== Kotlin 0/1 Knapsack DP ===")
    val weights = intArrayOf(2, 3, 4, 5)
    val values = intArrayOf(3, 4, 5, 6)
    val maxVal = knapsack(5, weights, values)
    check(maxVal == 7) { "Knapsack failed" }

    println("Max Knapsack Value: $maxVal")
    println("Kotlin Knapsack DP tests passed successfully.")
}
`);

// -------------------------------------------------------------
// 4. PHP (demos/php/dsa/)
// -------------------------------------------------------------
writeFile('php/dsa/linear/dynamic_array.php', `<?php
echo "=== PHP Dynamic Arrays & SplDoublyLinkedList ===\\n";
$arr = [10, 20];
$arr[] = 30;
assert(count($arr) === 3);
assert($arr[1] === 20);

$dll = new SplDoublyLinkedList();
$dll->push("tail");
$dll->unshift("head");
assert($dll->bottom() === "head");
assert($dll->top() === "tail");

echo "PHP Array count: " . count($arr) . ", DLL count: " . $dll->count() . "\\n";
echo "PHP Dynamic Array tests passed successfully.\\n";
`);

writeFile('php/dsa/trees/heap.php', `<?php
echo "=== PHP SplPriorityQueue (Max Heap) ===\\n";
$pq = new SplPriorityQueue();
$pq->insert("Task Low", 10);
$pq->insert("Task High", 50);
$pq->insert("Task Mid", 30);

assert($pq->top() === "Task High");
assert($pq->extract() === "Task High");
assert($pq->extract() === "Task Mid");
assert($pq->extract() === "Task Low");

echo "PHP SplPriorityQueue tests passed successfully.\\n";
`);

writeFile('php/dsa/sorting/quick_sort.php', `<?php
function quickSort(array $arr): array {
    if (count($arr) <= 1) return $arr;
    $pivot = $arr[intdiv(count($arr), 2)];
    $left = [];
    $equal = [];
    $right = [];
    foreach ($arr as $v) {
        if ($v < $pivot) $left[] = $v;
        elseif ($v > $pivot) $right[] = $v;
        else $equal[] = $v;
    }
    return array_merge(quickSort($left), $equal, quickSort($right));
}

echo "=== PHP Functional QuickSort ===\\n";
$data = [64, 25, 12, 22, 11];
$sorted = quickSort($data);
assert($sorted === [11, 12, 22, 25, 64]);
echo "Sorted: " . implode(", ", $sorted) . "\\n";
echo "PHP QuickSort tests passed successfully.\\n";
`);

writeFile('php/dsa/dp/knapsack.php', `<?php
function knapsack(int $W, array $weights, array $values): int {
    $dp = array_fill(0, $W + 1, 0);
    $n = count($weights);
    for ($i = 0; $i < $n; $i++) {
        for ($w = $W; $w >= $weights[$i]; $w--) {
            $dp[$w] = max($dp[$w], $dp[$w - $weights[$i]] + $values[$i]);
        }
    }
    return $dp[$W];
}

echo "=== PHP 0/1 Knapsack DP ===\\n";
$weights = [2, 3, 4, 5];
$values = [3, 4, 5, 6];
$maxVal = knapsack(5, $weights, $values);
assert($maxVal === 7);
echo "Max Knapsack Value: $maxVal\\n";
echo "PHP Knapsack DP tests passed successfully.\\n";
`);

// -------------------------------------------------------------
// 5. Ruby (demos/ruby/dsa/)
// -------------------------------------------------------------
writeFile('ruby/dsa/linear/dynamic_array.rb', `puts "=== Ruby Array & Deque Demo ==="
arr = [10, 20]
arr.push(30)
raise "Size error" unless arr.length == 3
raise "Index error" unless arr[1] == 20
raise "Pop error" unless arr.pop == 30

deque = ["center"]
deque.unshift("front")
deque.push("back")
raise "Deque error" unless deque.first == "front" && deque.last == "back"

puts "Ruby Array: #{arr}, Deque: #{deque}"
puts "Ruby Dynamic Array tests passed successfully."
`);

writeFile('ruby/dsa/sorting/quick_sort.rb', `def quick_sort(arr)
  return arr if arr.length <= 1
  pivot = arr[arr.length / 2]
  left = arr.select { |x| x < pivot }
  equal = arr.select { |x| x == pivot }
  right = arr.select { |x| x > pivot }
  quick_sort(left) + equal + quick_sort(right)
end

puts "=== Ruby Functional QuickSort ==="
data = [64, 25, 12, 22, 11]
sorted = quick_sort(data)
raise "Sort error" unless sorted == [11, 12, 22, 25, 64]

puts "Sorted: #{sorted}"
puts "Ruby QuickSort tests passed successfully."
`);

writeFile('ruby/dsa/dp/knapsack.rb', `def knapsack(capacity, weights, values)
  dp = Array.new(capacity + 1, 0)
  weights.each_with_index do |w, i|
    capacity.downto(w) do |j|
      dp[j] = [dp[j], dp[j - w] + values[i]].max
    end
  end
  dp[capacity]
end

puts "=== Ruby 0/1 Knapsack DP ==="
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
max_val = knapsack(5, weights, values)
raise "Knapsack error" unless max_val == 7

puts "Max Knapsack Value: #{max_val}"
puts "Ruby Knapsack DP tests passed successfully."
`);

// -------------------------------------------------------------
// 6. Lua (demos/lua/dsa/)
// -------------------------------------------------------------
writeFile('lua/dsa/linear/dynamic_array.lua', `print("=== Lua Table as Dynamic Array ===")
local arr = {10, 20}
table.insert(arr, 30)

assert(#arr == 3, "Length assertion failed")
assert(arr[2] == 20, "Index assertion failed")
local popped = table.remove(arr)
assert(popped == 30, "Remove assertion failed")

print(string.format("Lua Table len=%d, elements=[%d, %d]", #arr, arr[1], arr[2]))
print("Lua Dynamic Array tests passed successfully.")
`);

writeFile('lua/dsa/sorting/quick_sort.lua', `local function quick_sort(arr, low, high)
    if low >= high then return end
    local pivot = arr[high]
    local i = low - 1
    for j = low, high - 1 do
        if arr[j] <= pivot then
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]
        end
    end
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    local pi = i + 1
    quick_sort(arr, low, pi - 1)
    quick_sort(arr, pi + 1, high)
end

print("=== Lua In-Place QuickSort ===")
local data = {64, 25, 12, 22, 11}
quick_sort(data, 1, #data)

assert(data[1] == 11 and data[5] == 64, "Sort assertion failed")
print(string.format("Sorted: %d, %d, %d, %d, %d", data[1], data[2], data[3], data[4], data[5]))
print("Lua QuickSort tests passed successfully.")
`);

writeFile('lua/dsa/dp/knapsack.lua', `local function knapsack(W, weights, values)
    local dp = {}
    for i = 0, W do dp[i] = 0 end

    for i = 1, #weights do
        local w = weights[i]
        local v = values[i]
        for j = W, w, -1 do
            local candidate = dp[j - w] + v
            if candidate > dp[j] then
                dp[j] = candidate
            end
        end
    end
    return dp[W]
end

print("=== Lua 0/1 Knapsack DP ===")
local weights = {2, 3, 4, 5}
local values = {3, 4, 5, 6}
local max_val = knapsack(5, weights, values)
assert(max_val == 7, "Knapsack assertion failed")

print("Max Knapsack Value for W=5: " .. max_val)
print("Lua Knapsack DP tests passed successfully.")
`);

// -------------------------------------------------------------
// 7. Lisp (demos/lisp/dsa/)
// -------------------------------------------------------------
writeFile('lisp/dsa/linear/dynamic_array.lisp', `(format t "=== Common Lisp Adjustable Vector ===~%")
(let ((vec (make-array 2 :adjustable t :fill-pointer 0)))
  (vector-push-extend 10 vec)
  (vector-push-extend 20 vec)
  (vector-push-extend 30 vec)
  (assert (= (length vec) 3))
  (assert (= (aref vec 1) 20))
  (format t "Vector length: ~a, elements: ~a ~a ~a~%" (length vec) (aref vec 0) (aref vec 1) (aref vec 2))
  (format t "Common Lisp Dynamic Array tests passed successfully.~%"))
`);

writeFile('lisp/dsa/sorting/quick_sort.lisp', `(defun quick-sort (list)
  (if (null list)
      nil
      (let* ((pivot (car list))
             (rest (cdr list))
             (less (remove-if-not (lambda (x) (< x pivot)) rest))
             (greater (remove-if (lambda (x) (< x pivot)) rest)))
        (append (quick-sort less)
                (list pivot)
                (quick-sort greater)))))

(format t "=== Common Lisp Functional QuickSort ===~%")
(let ((sorted (quick-sort '(64 25 12 22 11))))
  (assert (equal sorted '(11 12 22 25 64)))
  (format t "Sorted list: ~a~%" sorted)
  (format t "Common Lisp QuickSort tests passed successfully.~%"))
`);

console.log('✅ Phase 2 DSA Multi-Language Files Successfully Generated!');
