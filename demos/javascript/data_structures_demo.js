class Stack {
  #items = [];
  push(value) { this.#items.push(value); }
  pop() { return this.#items.pop(); }
  get size() { return this.#items.length; }
}

const stack = new Stack();
stack.push("parse");
stack.push("render");
const scores = new Map([["Ada", 95], ["Lin", 91]]);
const tags = new Set(["docs", "code", "docs"]);
const bytes = new Uint8Array([72, 105]);
const tree = { value: "root", children: [{ value: "child", children: [] }] };

console.log(`stack=${stack.size}:${stack.pop()}`);
console.log(`scores=${[...scores].map(([k, v]) => `${k}:${v}`).join(",")}`);
console.log(`tags=${[...tags].sort().join(",")}`);
console.log(`typed-array=${bytes.join(",")}`);
console.log(`tree-children=${tree.children.length}`);
