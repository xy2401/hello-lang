# HTML 工程依赖

HTML 是浏览器标准，不需要语言包管理器。工程仍可能依赖 CSS/JavaScript 库、图标、字体、校验器和构建工具；这些资源可以手工放入仓库、从 CDN 加载、通过浏览器 ESM/import maps 解析，或由 npm/pnpm 管理。Node.js 版本管理器只管理工具运行时，不管理浏览器资源本身。

## 从复制文件到模块化工程

早期网页直接复制 `.js`、`.css` 到站点，随后 CDN 让页面按 URL 引入共享资源。Bower 曾以扁平前端依赖为目标，但已停止推荐，并建议迁移到 Yarn/npm。现代工程通常用 npm/pnpm 管构建依赖；无需构建的小页面也可以直接使用浏览器 ESM 与 import maps。

| 方式 | 清单与锁定 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| 手工 vendoring | 文件与自建清单 | 离线可控、没有 Node.js 前置 | 更新和来源需人工维护 | 少量稳定资源、封闭页面 |
| CDN URL | HTML 中的 URL，可配 SRI | 接入快、无需构建 | 可用性、隐私、缓存与版本治理依赖外部服务 | 演示、明确允许第三方请求的站点 |
| Bower | `bower.json` | 能维护历史项目 | 已属历史方案、现代生态不再围绕它维护 | 仅遗留项目 |
| npm/pnpm | `package.json`、lockfile | 工具和浏览器包生态完整、可审计 | 引入 Node.js 与安装步骤 | 应用、组件库、需要校验/打包的站点 |
| 浏览器 ESM + import maps | HTML import map | 无 bundler、模块身份清晰 | 浏览器兼容和裸模块 URL 需自行规划 | 小型现代应用、原型 |

## 推荐闭环：pnpm 管工程工具

```bash
pnpm init
pnpm add lit
pnpm add -D vite html-validate
pnpm remove lit

pnpm install --frozen-lockfile
pnpm list --depth Infinity
pnpm outdated
pnpm update html-validate --latest
pnpm audit
pnpm store status
```

提交 `package.json` 和 `pnpm-lock.yaml`，用 Corepack 或 `packageManager` 字段固定 pnpm 版本。HTML 中实际部署的是源码、静态资源或构建产物；`node_modules` 只是开发依赖安装目录，不应直接作为公开资源根目录。

`html-validate` 等校验器属于开发依赖，浏览器库属于运行依赖。把全部工具都写进 `dependencies` 会扩大生产安装面；反过来，把浏览器运行所需包误列为纯开发依赖，也会让某些部署裁剪流程漏包。

## CDN 与完整性

对固定 CDN 文件使用明确版本、HTTPS 和 Subresource Integrity（SRI）。`integrity` 值必须由实际响应内容计算并与供应方公布值核对，不能从其他版本复制。SRI 能验证内容未变，但不能解决 CDN 不可用、隐私请求或许可证问题；关键资源可 vendoring，并记录原 URL、版本、许可证和 SHA-256。

## 浏览器 ESM 与 import maps

```html
<script type="importmap">
{
  "imports": {
    "app-utils": "/vendor/app-utils/v1/index.js"
  }
}
</script>
<script type="module">
  import { ready } from 'app-utils';
  ready();
</script>
```

import map 解决浏览器中的模块名称映射，不会下载、升级或审计包。版本仍由 URL 和仓库内文件决定。依赖数量大、需要 tree-shaking 或兼容转换时，npm/pnpm 配合构建工具更合适。

## 缓存、镜像与选型

pnpm 的内容寻址 store 可跨项目复用；`pnpm store prune` 只用于回收未引用数据。registry 在 `.npmrc` 中配置，但 token 必须通过用户配置或环境变量提供。锁定安装和 `pnpm audit` 分别解决可复现性与已知漏洞，两者不能互相替代。

- **无构建静态页：** 少量资源 vendoring；若用 CDN，固定版本并使用真实 SRI。
- **新 Web 应用：** pnpm/npm 管理工具和模块，提交唯一 lockfile，部署使用 frozen install。
- **原生 ESM 小项目：** import maps 可减少构建层，但需自行维护版本 URL 与兼容基线。
- **Bower 遗留项目：** 先冻结当前资源与来源，再逐项迁移到 npm 或仓库内 vendor，不继续扩展 Bower 清单。
- **严格离线环境：** 保存依赖制品和校验信息；不要把某台开发机缓存当作制品库。

## 官方资料

- [MDN：JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN：import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap)
- [MDN：Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity)
- [npm documentation](https://docs.npmjs.com/)
- [pnpm documentation](https://pnpm.io/)
- [Bower project](https://bower.io/)

资料核对日期：2026-08-28。
