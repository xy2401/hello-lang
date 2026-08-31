type Tree<T> =
  | { kind: "leaf"; value: T }
  | { kind: "branch"; value: T; children: readonly Tree<T>[] };

class Stack<T> {
  #items: T[] = [];
  push(value: T): void { this.#items.push(value); }
  pop(): T | undefined { return this.#items.pop(); }
  get size(): number { return this.#items.length; }
}

const stack = new Stack<string>();
stack.push("parse");
stack.push("render");

const scores: ReadonlyMap<string, number> = new Map([
  ["Ada", 95],
  ["Lin", 91],
]);

const tree: Tree<string> = {
  kind: "branch",
  value: "root",
  children: [{ kind: "leaf", value: "child" }],
};

console.log(`stack=${stack.size}:${stack.pop()}`);
console.log(`scores=${[...scores.entries()].map(([k, v]) => `${k}:${v}`).join(",")}`);
console.log(`tree=${tree.kind}:${tree.value}`);
