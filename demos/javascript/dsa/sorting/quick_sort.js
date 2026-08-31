function quickSort(arr) {
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
