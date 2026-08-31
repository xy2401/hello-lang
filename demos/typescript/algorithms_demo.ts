type Comparator<T> = (left: T, right: T) => number;

function binarySearch<T>(values: readonly T[], target: T, compare: Comparator<T>): number {
  let low = 0;
  let high = values.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const order = compare(values[middle], target);
    if (order === 0) return middle;
    if (order < 0) low = middle + 1;
    else high = middle - 1;
  }
  return -1;
}

function bfs<T>(graph: ReadonlyMap<T, readonly T[]>, start: T): T[] {
  const visited = new Set<T>();
  const queue: T[] = [start];
  for (let index = 0; index < queue.length; index += 1) {
    const node = queue[index];
    if (visited.has(node)) continue;
    visited.add(node);
    queue.push(...(graph.get(node) ?? []));
  }
  return [...visited];
}

const numbers = [13, 2, 21, 5, 8].sort((a, b) => a - b);
const graph = new Map<string, readonly string[]>([["A", ["B", "C"]], ["B", ["D"]], ["C", ["D"]]]);
console.log(`sorted=${numbers.join(",")}`);
console.log(`binary-search-13=${binarySearch(numbers, 13, (a, b) => a - b)}`);
console.log(`bfs=${bfs(graph, "A").join(",")}`);
