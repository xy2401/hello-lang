// ES6 (ES2015) Standalone Demo
class User {
  constructor(name) { this.name = name; }
  sayHi() { return `Hello, ${this.name}`; }
}
const u = new User("Alice");
const promise = Promise.resolve(u.sayHi());
promise.then(msg => console.log("ES6 Class & Promise Output:", msg));
