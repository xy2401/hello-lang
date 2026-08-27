# JavaScript / Node.js 版本演进

ECMAScript 标准每年迭代（ES2015~ES2024），配合 Node.js 的 LTS（奇数版尝鲜、偶数版长期支持）构成现代全栈 JavaScript 运行基线。

## 版本索引

### [Node.js 24 LTS](./node.js-24)

- **发布时间：** 2025 年 10 月
- **版本重点：** 进入 Krypton LTS 维护线。

### [Node.js 26 Current](./node.js-26-current)

- **发布时间：** 2026 年 4 月
- **版本重点：** 作为当前功能版本交付新的 V8 与平台 API。

### [Node.js 22 LTS](./node-22)

- **发布时间：** 2024 年 10 月
- **版本重点：** 默认启用原生 WebSocket 客户端、内置 node --run 脚本加速执行。

### [Node.js 20 LTS](./node-20)

- **发布时间：** 2023 年 10 月
- **版本重点：** 实验性权限模型（Permission Model，限制文件系统与网络访问）。

### [ES2020–ES2023](./modern-javascript)

- **发布时间：** 2020 年–2023 年
- **版本重点：** 可选链（?.）、空值合并（??）、Top-level Await。

### [ES6 (ECMAScript 2015)](./es6)

- **发布时间：** 2015 年 6 月
- **版本重点：** class 关键字、箭头函数（Arrow Functions）、Promise 异步规范。

## 生产升级建议
- 推荐使用 Node.js 20/22 LTS 版本，并在 package.json 中声明 `"type": "module"` 迁移至纯 ESM 模块生态。

## 相关版本资料

- [Node.js 14 LTS](./node-14)
- [Node.js 16 LTS](./node-16)
- [Node.js 18 LTS](./node-18)
- [ES1～ES5](./pre-es6)
