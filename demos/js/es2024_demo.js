// ES2024 (ES15) Demo
const inventory = [
  { name: "asparagus", type: "vegetables" },
  { name: "bananas", type: "fruit" },
  { name: "cherries", type: "fruit" },
];
const result = Object.groupBy(inventory, ({ type }) => type);
console.log("ES2024 Object.groupBy Fruit Count:", result.fruit.length);

const { promise, resolve } = Promise.withResolvers();
resolve("Promise.withResolvers resolved!");
promise.then(msg => console.log("ES2024 Promise.withResolvers:", msg));
