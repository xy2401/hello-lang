# JavaScript / Node.js 版本演进

ECMAScript 标准每年迭代（ES2015~ES2024），配合 Node.js 的 LTS（奇数版尝鲜、偶数版长期支持）构成现代全栈 JavaScript 运行基线。

## 核心版本演进与关键里程碑

### Node.js 22 LTS（2024 年 10 月）

**主要功能与架构演进：**

- 默认启用原生 WebSocket 客户端、内置 `node --run` 脚本加速执行
- V8 引擎升级至 12.4（引入 Maglev 中间层即时编译器加速常见代码路径）

**工程影响与选型建议：**

> 当前新建 Node.js 服务端推荐的长期支持版本。

### Node.js 20 LTS（2023 年 10 月）

**主要功能与架构演进：**

- 实验性权限模型（Permission Model，限制文件系统与网络访问）
- 原生支持同步读取 `.env` 环境变量文件（`node --env-file=.env`）

**工程影响与选型建议：**

> 生产环境极为成熟的长期支持基准。

### ES2020–ES2023（2020 年–2023 年）

**主要功能与架构演进：**

- 可选链（`?.`）、空值合并（`??`）、Top-level Await
- 不可变数组操作方法：`toSorted()`, `toReversed()`, `toSpliced()`, `with()`

**工程影响与选型建议：**

> 现代函数式不可变前端编程的标配语法。

### ES6 (ECMAScript 2015)（2015 年 6 月）

**主要功能与架构演进：**

- `class` 关键字、箭头函数（Arrow Functions）、`Promise` 异步规范
- ES Module 模块系统（`import` / `export`）、`let` / `const` 块级作用域、解构赋值与解构展开（`...`）

**工程影响与选型建议：**

> JavaScript 历史上最伟大、彻底重塑前后端软件工程面貌的里程碑。

## 生产升级建议
- 推荐使用 Node.js 20/22 LTS 版本，并在 package.json 中声明 `"type": "module"` 迁移至纯 ESM 模块生态。
