// ES2018 (ES9) Demo
const obj = { a: 1, b: 2, c: 3 };
const { a, ...rest } = obj;
console.log("Rest properties:", rest);
console.log("Spread properties:", { ...rest, d: 4 });
