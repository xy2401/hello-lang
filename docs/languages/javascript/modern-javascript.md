<script setup>
import { modernJsLiveCode, modernJsLiveMarkup } from '../../.vitepress/theme/data/liveExamples';
</script>

# 现代 JavaScript：按能力理解持续演进

> ES2016 以后 ECMAScript 改为稳定的年度发布节奏，但“每年背两个 API”不是有效学习方式。本页按异步控制流、数据访问、集合变换、对象封装和模块边界重新组织关键能力。

## 1. 异步控制流：Promise 之上的结构化表达

`async` / `await` 让 Promise 控制流接近同步代码，同时保留非阻塞行为。

```javascript
async function loadLessons(signal) {
  const response = await fetch("/api/lessons", { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

try {
  const lessons = await loadLessons(controller.signal);
  render(lessons);
} catch (error) {
  if (error.name !== "AbortError") showError(error);
}
```

需要并发时，不要连续 `await` 独立任务：

```javascript
const [profile, lessons] = await Promise.all([
  loadProfile(userId),
  loadLessons()
]);
```

`Promise.allSettled` 适合收集全部结果，`Promise.any` 适合第一个成功结果；取消通常由 `AbortController` 协作完成，而不是 Promise 自身。

## 2. 安全访问与默认值：`?.` 和 `??`

```javascript
const city = response.user?.address?.city ?? "未知城市";
const retries = config.retries ?? 3;
```

`??` 只在左侧为 `null` / `undefined` 时采用默认值，能保留合法的 `0`、`false` 和空字符串。可选链适合真正可缺失的边界数据；如果核心对象本应存在，过度使用会掩盖建模错误。

## 3. 数据管道：从 Entries 到 Grouping

现代集合 API 可以按数据变换理解，而不是按年份记忆：

| 任务 | 推荐能力 | 注意点 |
| :--- | :--- | :--- |
| 判断包含 | `includes` | 能正确匹配 `NaN` |
| 展平嵌套数组 | `flat` / `flatMap` | `flatMap` 只展平一层 |
| 对象与键值对互转 | `Object.entries` / `Object.fromEntries` | Symbol 键不在 `entries` 中 |
| 分组 | `Object.groupBy` / `Map.groupBy` | Object 版本的键会属性键化 |
| 字符串全量替换 | `replaceAll` | 字符串与全局正则语义不同 |

```javascript
const totalsByTeam = Object.fromEntries(
  Object.entries(Object.groupBy(tasks, task => task.team))
    .map(([team, items]) => [team, items.reduce((sum, item) => sum + item.points, 0)])
);
```

## 4. 不可变数组方法与状态更新

`sort`、`reverse` 和 `splice` 会修改原数组；`toSorted`、`toReversed`、`toSpliced` 和 `with` 返回新数组。

```javascript
const ranked = players.toSorted((left, right) => right.score - left.score);
const corrected = ranked.with(0, { ...ranked[0], verified: true });
```

这类 API 对 UI 状态、缓存和可预测数据流尤其有价值。但它们是浅复制，嵌套对象仍共享引用。

## 5. 对象封装：私有字段与静态初始化

```javascript
class Session {
  static #activeCount = 0;
  #token;

  constructor(token) {
    this.#token = token;
    Session.#activeCount += 1;
  }

  get authenticated() { return this.#token.length > 0; }
  static get activeCount() { return Session.#activeCount; }
}
```

`#field` 是语言级私有，类外代码不能读取；它不同于 TypeScript 的编译期 `private`。公开字段、私有方法与静态块让类的初始化和封装更完整。

## 6. 数值、逻辑与错误表达

- BigInt 用于超过安全整数范围的整数运算，不能直接与 Number 混算。
- 逻辑赋值 `&&=`、`||=`、`??=` 只在需要时计算右侧表达式。
- `Error` 的 `cause` 可以保留错误链，而不丢失上游上下文。
- `Object.hasOwn(object, key)` 比借用 `hasOwnProperty` 更稳妥。

```javascript
try {
  await save(order);
} catch (error) {
  throw new Error("订单保存失败", { cause: error });
}
```

## 7. 模块与运行时边界

现代 ESM 支持动态 `import()`、`import.meta` 和顶层 `await`。但语言规范、浏览器 Web API 与 Node.js API 是三层不同边界：

```javascript
const localeModule = await import(`./locales/${locale}.js`);
await localeModule.install();
```

- ECMAScript 定义语法、类型和内建对象。
- 浏览器提供 DOM、Fetch、Storage、Workers 等 Web API。
- Node.js 提供文件系统、进程、网络服务器及自己的模块解析规则。

## 8. 迭代器、异步迭代与流式数据

```javascript
async function* parseLines(stream) {
  for await (const chunk of stream) {
    yield* decodeLines(chunk);
  }
}

for await (const line of parseLines(response.body)) {
  consume(line);
}
```

异步迭代把“随时间到达的一串值”统一为可组合协议，适合网络流、分页数据和事件源。

## 9. Promise 工具与外部控制点

```javascript
const { promise, resolve, reject } = Promise.withResolvers();
queue.on("ready", resolve);
queue.on("error", reject);
await promise;
```

`Promise.withResolvers` 适合把 Promise 与事件式 API 桥接，但如果 resolve/reject 在系统中到处传递，控制流会再次变得隐蔽。

## 10. 兼容性与工程决策

1. 先区分语法、内建 API、Web API 和 Node API，再判断支持范围。
2. 以目标浏览器或 Node LTS 为基线，用兼容性数据和运行测试确认。
3. 语法可由编译器降级；新内建方法通常需要 polyfill；宿主 API 可能无法等价补齐。
4. 对库代码谨慎提升目标版本，对应用代码可根据部署环境更积极采用新能力。
5. 学习按问题域组织，年份只作为查规范和兼容性的索引。

## 11. Live 练习

示例把可选链、空值合并、不可变排序和 DOM 更新组合在一起。修改源码后切换到“效果”，即可查看页面与 Console 输出。

<WebLivePlayground
  mode="javascript"
  title="现代 JavaScript 数据处理"
  :initial-code="modernJsLiveCode"
  :preview-html="modernJsLiveMarkup"
/>
