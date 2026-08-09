# ES6 (ES2015) 规范深度大典

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

ES6 (ECMAScript 2015) 是 JavaScript 历史上最具里程碑意义的划时代更新。它将 JS 从原先的脚本语言提升至可以构建大型复杂全栈工程的现代编程语言。

---

## 1. ⚡ 类语法与模块化 (Class & ES Modules)
引入原生的 `class` 继承语法与 `import` / `export` 标准模块化规范。

```javascript
class User {
  constructor(name) { this.name = name; }
  sayHi() { return `Hello, ${this.name}`; }
}
```

---

## 2. 🔀 异步 Promise & 箭头函数
引入原生 `Promise` 解决回调地狱，以及绑定上下文 `this` 的箭头函数 `() => {}`。

```javascript
const u = new User("Alice");
const promise = Promise.resolve(u.sayHi());
promise.then(msg => console.log("ES6 Class & Promise Output:", msg));
```

<DockerOutput
  image="node:20-alpine"
  sourceFile="demos/js/es6_demo.js"
/>
