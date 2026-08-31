# TypeScript 常用外部依赖库

## 📦 Web 框架（前端）

### React
官方链接：https://react.dev/

Facebook 开发的虚拟 DOM、组件化 UI 库。使用 JSX 语法，支持 Hooks API、Server Components。生态最丰富，国内大厂首选，适合中大型项目。

GitHub: [190k+ stars](https://github.com/facebook/react)

### Vue 3
官方链接：https://vuejs.org/

Evan You 开发的渐进式框架。组合式 API（Composition API）、响应式系统、轻量级虚拟 DOM。上手简单，文档友好，适合从中小型项目起步。

GitHub: [23k+ stars](https://github.com/vuejs/core)

### Angular
官方链接：https://angular.io/

Google 开发的全功能框架。TypeScript 原生支持，内置路由/表单/http/依赖注入等模块。企业级首选，学习曲线较陡，适合大规模团队。

GitHub: [26k+ stars](https://github.com/angular/angular)

### Svelte
官方链接：https://svelte.dev/

编译时框架，无运行时开销。代码量只有 React/Vue 的 1/3，语法简洁。适合个人项目和小型团队，但社区生态相对较小。

GitHub: [58k+ stars](https://github.com/sveltejs/svelte)

### Next.js
官方链接：https://nextjs.org/

React SSR/SSG 全栈框架，Vercel 开发。集成 routing/images/fonts优化，支持 Server Actions。生产级应用首选，国内使用广泛。

GitHub: [47k+ stars](https://github.com/vercel/next.js)

## 🧪 测试工具

### Jest
官方链接：https://jestjs.io/

Facebook 开发的单元测试框架。支持快照测试、Mock、Coverage、并发执行。Vue/React/Angular官方推荐，集成度高。

GitHub: [31k+ stars](https://github.com/jestjs/jest)

### Vitest
官方链接：https://vitest.dev/

Vite 生态的原生测试框架。速度极快，兼容 Jest API。与 Vite 热更新完美集成，新项目首选。

GitHub: [5k+ stars](https://github.com/vitest-dev/vitest)

### Playwright
官方链接：https://playwright.dev/

Microsoft 出品 E2E 自动化测试。支持 Chromium/Firefox/Webkit 三大浏览器，自动等待元素，截图/视频录制。现代 E2E 测试标准工具。

GitHub: [71k+ stars](https://github.com/microsoft/playwright)

### Cypress
官方链接：https://www.cypress.io/

开发者友好的 E2E 测试工具。实时重载、时间旅行调试、网络拦截。Chrome 插件完善，社区教程多。

GitHub: [21k+ stars](https://github.com/cypress-io/cypress)

## 🔧 HTTP 与数据

### Axios
官方链接：https://axios-http.com/

基于 Promise 的 HTTP 客户端。支持请求/响应拦截器、取消请求、自动转换 JSON。浏览器 + Node.js 通用，前端必备。

GitHub: [70k+ stars](https://github.com/axios/axios)

### SWR
官方链接：https://swr.vercel.app/

React 数据获取库，自动缓存和重新验证。配合 React Context 使用，简化服务端状态管理。Next.js 官方推荐。

GitHub: [31k+ stars](https://github.com/vercel/swr)

### TanStack Query (React Query)
官方链接：https://tanstack.com/query

服务端状态管理库。自动缓存、并发请求、后台刷新。相比 Redux/Zustand 更适合处理服务端数据。

GitHub: [34k+ stars](https://github.com/TanStack/query)

### tRPC
官方链接：https://trpc.io/

类型安全后端 API。前后端共享 TypeScript 类型定义，无需手动维护接口文档。GraphQL 的轻量替代方案，TypeScript 生态首选。

GitHub: [18k+ stars](https://github.com/trpc/trpc)

## 📅 日期处理

### dayjs
官方链接：https://day.js.org/

Moment.js 替代品，体积仅 2KB。API 兼容 Moment.js，支持插件扩展。适合对体积敏感的前端项目。

GitHub: [8k+ stars](https://github.com/iamkun/dayjs)

### date-fns
官方链接：https://date-fns.org/

模块化日期库，按需导入。Tree-shaking 友好，每个函数独立可复用。适合追求极致性能的项目。

GitHub: [24k+ stars](https://github.com/date-fns/date-fns)

### Luxon
官方链接：https://moment.github.io/luxon/

DateTime 库，Intl API 封装。完整的时区支持、国际化、持久化。适合需要复杂日期操作的企业项目。

GitHub: [3k+ stars](https://github.com/moment/luxon)

## ⚠️ 已废弃/不推荐

### jQuery
标记：🔴 已过时

jQuery 是 DOM 操作的经典库，通过选择器和事件绑定简化页面操作。但现代框架（React/Vue/Angular）已经用组件化和虚拟 DOM 完全取代了这种模式。现代浏览器已原生支持大部分 jQuery 功能，不建议在新项目使用。

替代方案：React/Vue/Svelte + Fetch API

### Moment.js
标记：🔴 已过时

Moment.js 曾是 JavaScript 日期处理的标准库，功能强大但体积大（约 300KB），无法 tree-shaking（无法只打包用到的函数）。随着 ES6 Date API 改进和 dayjs/date-fns 的兴起，Moment.js 已停止新功能开发。

替代方案：dayjs/date-fns/Luxon

### Backbone.js
标记：🔴 已过时

Backbone 是最早的 MVC 框架之一，定义了 Model/View/Collection 的设计模式。但由于依赖 jQuery、学习成本高，且维护缓慢，已被更轻量的 Vue/React 等替代。GitHub 活跃度明显下降。

---

*注：部分经典库已过时，请参考现代替代方案*
