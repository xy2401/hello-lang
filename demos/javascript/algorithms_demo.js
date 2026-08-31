function binarySearch(values, target) {
  let low = 0;
  let high = values.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (values[middle] === target) return middle;
    if (values[middle] < target) low = middle + 1;
    else high = middle - 1;
  }
  return -1;
}

function* bfs(graph, start) {
  const seen = new Set();
  const queue = [start];
  for (let index = 0; index < queue.length; index += 1) {
    const node = queue[index];
    if (seen.has(node)) continue;
    seen.add(node);
    yield node;
    queue.push(...(graph.get(node) ?? []));
  }
}

const scores = [{ name: "Lin", score: 91 }, { name: "Ada", score: 95 }, { name: "Kai", score: 91 }];
const ranked = scores.toSorted((a, b) => b.score - a.score || a.name.localeCompare(b.name));
const numbers = [2, 5, 8, 13, 21];
const graph = new Map([["A", ["B", "C"]], ["B", ["D"]], ["C", ["D"]]]);

console.log(`sorted=${ranked.map(({ name, score }) => `${name}:${score}`).join(",")}`);
console.log(`binary-search-13=${binarySearch(numbers, 13)}`);
console.log(`bfs=${[...bfs(graph, "A")].join(",")}`);
