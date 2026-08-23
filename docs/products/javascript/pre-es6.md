# ES1～ES5

> 现代 JavaScript 的原型、闭包、事件循环和动态对象模型，都来自 ES6 之前。理解这一阶段不是为了继续写旧代码，而是为了读懂遗留项目与今天仍然有效的语言机制。

## 1. 从网页脚本到 ECMAScript 标准

JavaScript 诞生于 1995 年。ECMAScript 把语言核心标准化，浏览器则提供 DOM、事件、网络等宿主能力。

| 阶段 | 关键变化 | 长期影响 |
| :--- | :--- | :--- |
| ES1（1997） | 类型、对象、函数、控制流形成标准 | 建立跨浏览器语言核心 |
| ES3（1999） | 正则、异常、`do...while` 等 | 成为早期 Web 2.0 的语言基础 |
| ES4（放弃） | 过于激进的大型设计未落地 | 社区转向渐进演进 |
| ES5 / ES5.1（2009/2011） | 严格模式、JSON、数组高阶方法、属性描述符 | 为 ES6 和现代工程化铺路 |

## 2. 函数作用域、提升与闭包

`var` 只有函数作用域，声明会提升；闭包让函数在外层返回后仍可访问词法环境。

```javascript
function createCounter() {
  var value = 0;
  return function () {
    value += 1;
    return value;
  };
}

var next = createCounter();
next(); // 1
next(); // 2
```

经典陷阱是循环中的 `var` 共享同一个绑定：

```javascript
for (var i = 0; i < 3; i += 1) {
  setTimeout(function () { console.log(i); }, 0);
}
// 输出 3、3、3，而不是 0、1、2
```

现代代码优先使用 `let` / `const` 创建块级绑定。维护旧环境时可用 IIFE 为每次循环创建作用域。

## 3. 原型委托，而不是“没有类”

对象通过内部原型链委托属性查找。构造函数和 `prototype` 只是组织这一机制的经典写法。

```javascript
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return "Hello, " + this.name;
};

var ada = new User("Ada");
ada.greet();
```

ES6 `class` 提供更清晰的语法，但底层仍建立在原型模型之上。理解原型有助于分析继承、方法共享和 `this`。

## 4. `this` 由调用方式决定

普通函数的 `this` 不是按定义位置静态绑定，而取决于调用方式：方法调用、显式 `call/apply`、构造调用或默认调用。

```javascript
var account = {
  owner: "Lin",
  showOwner: function () { return this.owner; }
};

var detached = account.showOwner;
account.showOwner(); // "Lin"
detached();          // 严格模式下 this 为 undefined
```

`bind`（ES5）可以创建固定接收者的新函数；ES6 箭头函数则捕获外层词法 `this`。

## 5. ES5：严格模式、JSON 与数组抽象

```javascript
"use strict";

var users = JSON.parse('[{"name":"Ada","active":true}]');
var names = users
  .filter(function (user) { return user.active; })
  .map(function (user) { return user.name; });
```

- 严格模式禁止部分易错行为，并让静默失败变成异常。
- `JSON.parse` / `JSON.stringify` 提供标准数据交换。
- `forEach`、`map`、`filter`、`reduce`、`some`、`every` 把集合变换提升为语言常用范式。
- `Object.create`、`defineProperty` 和属性描述符让对象模型更精确。

## 6. 回调、事件循环与 Ajax

浏览器把计时器、DOM 事件和网络交给宿主环境；回调完成后进入任务队列，主线程空闲时再执行。

```javascript
button.addEventListener("click", function () {
  requestData("/api/lessons", function (error, lessons) {
    if (error) {
      showError(error);
      return;
    }
    renderLessons(lessons);
  });
});
```

多层错误优先回调容易形成“回调金字塔”。Promise 与后来的 `async` / `await` 改善了组合方式，但事件循环模型没有消失。

## 7. ES6 之前的模块化方案

语言没有标准模块时，常用 IIFE 暴露有限 API：

```javascript
var lessonStore = (function () {
  var lessons = [];
  return {
    add: function (lesson) { lessons.push(lesson); },
    all: function () { return lessons.slice(); }
  };
}());
```

随后出现 CommonJS、AMD、UMD 等生态方案。ES Modules 最终把静态 `import` / `export` 纳入语言与浏览器平台。

## 8. 阅读遗留代码的迁移原则

1. 先补测试，确认隐式类型转换、`this` 和异步顺序。
2. 将全局变量收进模块边界。
3. 谨慎把 `var` 替换为 `let` / `const`，检查提升和循环闭包行为。
4. 用 Promise 包装回调 API，再逐步引入 `async` / `await`。
5. 不要机械把原型方法改成类；先确认继承与动态扩展约定。

下一阶段：[ES6：现代 JavaScript 奠基](./es6.md)。
