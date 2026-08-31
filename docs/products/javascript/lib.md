# JavaScript 常用第三方库

## 📦 Web 框架（前端）

### React
官方链接：https://react.dev/

Facebook 开发的组件化 UI 库，使用虚拟 DOM 和 JSX 语法。生态最丰富，适合大型应用，支持服务器端渲染（Next.js）。

GitHub: [190k+ stars](https://github.com/facebook/react)

### Vue.js
官方链接：https://vuejs.org/

渐进式框架，文档友好，学习曲线平缓。Vue 2 使用 Options API，Vue 3 新增组合式 API。国内中小企业使用广泛。

GitHub: [23k+ stars](https://github.com/vuejs/core)

### Angular
官方链接：https://angular.io/

Google 开发的全功能框架，TypeScript 原生支持。内置路由、HTTP、表单管理等模块。企业级项目首选，学习成本较高。

GitHub: [26k+ stars](https://github.com/angular/angular)

### Svelte
官方链接：https://svelte.dev/

编译时框架，无运行时开销，代码量少。语法简洁类似 HTML+CSS+JS，适合个人项目和小型团队。

GitHub: [58k+ stars](https://github.com/sveltejs/svelte)

## 📦 Web 框架（后端/Node.js）

### Express.js
官方链接：https://expressjs.com/

Node.js 最小化框架，中间件模式。生态最丰富，教程多，适合快速开发 API 和服务端渲染。

GitHub: [72k+ stars](https://github.com/expressjs/express)

### Fastify
官方链接：https://www.fastify.dev/

高性能 HTTP 框架，Schema 验证，低开销。速度比 Express 快 2-4 倍，适合高并发微服务。

GitHub: [23k+ stars](https://github.com/fastify/fastify)

### NestJS
官方链接：https://nestjs.com/

TypeScript 全功能框架，受 Angular 启发。依赖注入、装饰器、模块化，适合大型企业应用。

GitHub: [73k+ stars](https://github.com/nestjs/nest)

### Koa
官方链接：https://koajs.com/

Express 核心成员开发，轻量级框架。基于 async/await，没有中间件包袱，适合构建 REST API。

GitHub: [41k+ stars](https://github.com/koajs/koa)

## 🔧 实用工具库

### Lodash
官方链接：https://lodash.com/

函数式编程工具集，提供 500+ 方法。map/filter/reduce/debouncing/throttling 等。使用需注意体积问题。

GitHub: [10k+ stars](https://github.com/lodash/lodash)

### Ramda
官方链接：https://ramdajs.com/

纯函数式编程库，强调不可变性和函数组合。API 设计优雅，但需要一定函数式基础。

GitHub: [4k+ stars](https://github.com/ramda/ramda)

### Axios
官方链接：https://axios-http.com/

基于 Promise 的 HTTP 客户端。支持请求拦截、取消、超时控制。浏览器 + Node.js 通用，前端必备。

GitHub: [70k+ stars](https://github.com/axios/axios)

### Zod
官方链接：https://zod.dev/

TypeScript Schema 验证库。类型安全，可自动生成 TypeScript 类型定义。配合 React Hook Form 使用体验极佳。

GitHub: [6k+ stars](https://github.com/colinhacks/zod)

## ⚠️ 已废弃/不推荐

### jQuery
标记：🔴 已过时

jQuery 通过选择器和事件绑定简化 DOM 操作，曾是 JS 时代的霸主。但现代框架（React/Vue/Angular）用组件化和虚拟 DOM 完全取代了这种模式。现代浏览器已原生支持大部分功能，不建议在新项目使用。

替代方案：React/Vue/Svelte + Fetch API

### Backbone.js
标记：🔴 已过时

早期 MVC 框架，定义了 Model/View/Collection 的设计模式。但因依赖 jQuery、学习成本高、维护缓慢，已被 Vue/React 等取代。

### Moment.js
标记：🔴 已过时

日期处理经典库，功能强大但体积大（300KB+），无法 tree-shaking。随着 dayjs/date-fns 兴起，Moment.js 已停止新功能开发。

替代方案：dayjs/date-fns/Luxon

---

*注：部分经典库已过时，请参考现代替代方案*
