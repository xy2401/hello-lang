// ES2019 (ES10) Demo
const nested = [1, [2, [3]]];
console.log("Array.prototype.flat(2):", nested.flat(2));
const entries = [["name", "Alice"], ["role", "Admin"]];
console.log("Object.fromEntries:", Object.fromEntries(entries));
