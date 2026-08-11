<script setup>
import { es6LiveCode, es6LiveMarkup } from '../../.vitepress/theme/data/liveExamples';
</script>

# ES6（ES2015）：现代 JavaScript 奠基

ES6 是 JavaScript 由浏览器脚本走向模块化应用语言的分水岭。它不是几个 API 的集合，而是同时升级了作用域、函数、对象、异步、集合、迭代和模块系统。

---

## 1. `let`、`const` 与块级作用域

```javascript
for (let index = 0; index < 3; index += 1) {
  setTimeout(() => console.log(index), 0);
}
// 0、1、2：每轮循环都有独立绑定
```

`const` 约束的是绑定不能重新赋值，并不让对象自动不可变。默认使用 `const`，确实需要重绑定时使用 `let`。

## 2. 解构、默认值与 Rest / Spread

```javascript
function connect({ host = "localhost", port = 443, ...options } = {}) {
  return { url: `https://${host}:${port}`, options };
}

const base = { retry: 2, timeout: 1000 };
const config = { ...base, timeout: 2500 };
```

这些语法让参数契约和不可变式对象更新更清楚，但对象展开是浅拷贝，不会递归复制嵌套对象。

## 3. 箭头函数与词法 `this`

```javascript
class Timer {
  seconds = 0;
  start() {
    setInterval(() => {
      this.seconds += 1;
    }, 1000);
  }
}
```

箭头函数没有自己的 `this`、`arguments` 和构造能力。它适合回调与短函数，但对象方法、原型方法和需要动态接收者的函数仍应使用普通函数。

## 4. 模板字符串与增强对象字面量

```javascript
const role = "editor";
const user = {
  role,
  [`can_${role}`]: true,
  describe() { return `${this.role.toUpperCase()} user`; }
};
```

模板字符串支持多行文本和表达式插值；标签模板还能控制转义与领域语言解析。

## 5. Class：原型模型的结构化语法

```javascript
class User {
  constructor(name) { this.name = name; }
  sayHi() { return `Hello, ${this.name}`; }
}

class Admin extends User {
  constructor(name, permissions = []) {
    super(name);
    this.permissions = permissions;
  }
}
```

Class 方法仍位于原型上。`extends` / `super` 规范化了继承写法，但组合通常比深层继承更容易维护。

## 6. Promise：可组合的异步结果

```javascript
function loadProfile(id) {
  return fetch(`/api/users/${id}`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });
}

loadProfile(42)
  .then(profile => console.log(profile.name))
  .catch(error => console.error(error));
```

Promise 把“未来值”变成可以链式组合的对象，并区分 fulfilled / rejected 状态。它不会自动取消底层任务，也不会替代 HTTP 状态检查。

## 7. 迭代协议、生成器与 `for...of`

```javascript
function* range(start, end) {
  for (let value = start; value <= end; value += 1) {
    yield value;
  }
}

for (const value of range(1, 3)) {
  console.log(value);
}
```

可迭代对象通过 `Symbol.iterator` 产生迭代器。数组、字符串、Map、Set 都遵循同一协议，使展开、解构和 `for...of` 可以统一工作。

## 8. Map、Set、Symbol 与新的数据表达

| 类型 | 适合场景 | 与普通 Object/Array 的区别 |
| :--- | :--- | :--- |
| `Map` | 任意类型键、频繁增删、保持插入顺序 | 不把键强制转换为字符串 |
| `Set` | 唯一值集合、去重、集合运算 | 语义比数组 + `includes` 更直接 |
| `WeakMap` / `WeakSet` | 关联对象而不阻止垃圾回收 | 不可枚举，键受限制 |
| `Symbol` | 唯一属性键、协议扩展点 | 避免普通字符串键冲突 |

## 9. ES Modules：静态模块边界

```javascript
// math.js
export const sum = (left, right) => left + right;

// app.js
import { sum } from "./math.js";
console.log(sum(20, 22));
```

静态结构允许工具提前分析依赖、循环引用和未使用导出。浏览器模块默认严格模式，并按 URL 解析；Node.js 还需要结合 `package.json` 的 `type` 和文件扩展名理解模块格式。

## 10. Proxy 与 Reflect：元编程边界

Proxy 可以拦截读取、写入、调用等内部操作，Reflect 提供与内部操作对应的函数式 API。它们适合响应式系统、验证和虚拟对象，但会增加调试与性能复杂度，不应替代普通数据模型。

## 11. Live 练习

下面已经放入完整的 `User`、Class 和 Promise 示例。修改源码后切换到“效果”，即可同时查看页面结果与 Console 输出。

<WebLivePlayground
  mode="javascript"
  title="ES6 Class 与 Promise"
  :initial-code="es6LiveCode"
  :preview-html="es6LiveMarkup"
/>

下一阶段：[现代 JavaScript：按能力理解持续演进](./modern-javascript.md)。
