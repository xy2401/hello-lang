export function quickSort<T>(arr: T[], compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)): T[] {
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
