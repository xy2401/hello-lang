// ES2022 (ES13) Demo
class Account {
  #balance = 1000;
  getBalance() { return this.#balance; }
}
const acc = new Account();
console.log("Class Private Field #balance:", acc.getBalance());
console.log("Array.prototype.at(-1):", ["a", "b", "c"].at(-1));
console.log("Object.hasOwn({x: 1}, 'x'):", Object.hasOwn({ x: 1 }, "x"));
