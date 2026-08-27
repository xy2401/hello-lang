# CSS 工程依赖

CSS 本身没有语言专属包管理器。工程依赖分成两类：一类是浏览器实际加载的 CSS 库、字体和图标；另一类是 Sass、PostCSS、Autoprefixer、Stylelint 等开发工具。npm/pnpm 可以同时管理两类包，但它们的部署边界不同：工具不应进入浏览器，库也不能只存在于开发机缓存。

## 演进与角色

早期站点复制 `.css` 文件或用 `<link>` 指向 CDN。Bower 一度管理前端资源，后来生态转向 npm/Yarn/pnpm。Sass 等预处理器和 PostCSS 插件链让 CSS 进入构建流程；Stylelint 负责静态检查，它们都不是“CSS 运行时”。

| 方式 | 清单与锁定 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| 手工 CSS 文件 | 仓库文件 | 简单、离线、部署边界清楚 | 来源与升级要人工记录 | 少量稳定样式 |
| CDN `<link>` | URL，可配 SRI | 零构建、接入快 | 外部可用性、隐私与版本风险 | 原型或允许外部请求的站点 |
| Bower | `bower.json` | 可维持老项目 | 历史方案，现代工具支持弱 | 只维护遗留仓库 |
| npm/pnpm | `package.json`、lockfile | CSS 库与工具生态集中、可锁定审计 | 需要 Node.js，需明确构建产物 | 新 Web 工程 |
| Sass/PostCSS | 各自配置 + npm 依赖 | 变量、转换和兼容处理能力强 | 插件顺序、版本会改变输出 | 需要设计系统或兼容转换的项目 |

## 可复现工程闭环

```bash
pnpm init
pnpm add modern-normalize
pnpm add -D sass postcss autoprefixer stylelint
pnpm remove modern-normalize

pnpm install --frozen-lockfile
pnpm list --depth Infinity
pnpm outdated
pnpm update stylelint --latest
pnpm audit
pnpm store status
```

提交 `package.json`、唯一的 lockfile 和所有工具配置。Sass/PostCSS 的输出 CSS 是可部署产物；是否提交产物取决于部署流程，但源码、锁文件和构建命令必须足以重建它。`node_modules` 与 pnpm store 都不是发布产物。

典型脚本明确区分构建和检查：

```json
{
  "scripts": {
    "build:css": "sass src/styles:dist/styles --no-source-map",
    "lint:css": "stylelint \"src/**/*.css\""
  },
  "dependencies": {
    "modern-normalize": "3.0.1"
  },
  "devDependencies": {
    "sass": "1.92.1",
    "stylelint": "16.23.1"
  }
}
```

版本号用于说明固定依赖的形式，采用前应以项目当前兼容范围为准。浏览器直接需要的库放 `dependencies`；仅在构建和校验时运行的工具放 `devDependencies`。

## CDN、vendoring 与完整性

CDN 样式应固定精确版本并使用供应方针对该文件公布的真实 SRI；摘要必须与下载内容匹配，不能跨版本复用。关键样式可保存到仓库的 `vendor/`，同时记录上游地址、版本、许可证和哈希。手工 vendoring 的优点是部署可靠；缺点是没有自动依赖树和漏洞提醒，必须建立升级清单。

## 解析树、缓存和供应链

CSS 工具链的传递依赖通常来自 Node.js 生态，可用以下命令核对来源：

```bash
pnpm why postcss
pnpm list --depth Infinity
pnpm audit --prod
pnpm store prune
```

`--prod` 只看生产依赖，不能替代对构建工具的审计，因为被入侵的构建工具也可能修改最终 CSS。registry/mirror 写入 `.npmrc`，认证 token 放在用户配置或环境变量中；镜像必须保留完整性元数据。

Sass、PostCSS 和 Stylelint 各有独立职责。Sass 负责预处理语言，PostCSS 是 CSS 转换平台，Autoprefixer 是其插件，Stylelint 做规则检查。把它们称为四个互换的“CSS 包管理器”是错误的。

## 选择建议

- **简单静态站点：** 原生 CSS + 少量 vendored 文件即可，不必为一项依赖引入复杂构建链。
- **新应用或设计系统：** pnpm/npm 固定依赖；只在确有需要时加入 Sass/PostCSS 插件。
- **库的 CDN 使用者：** 固定精确 URL、真实 SRI 和回退策略，避免 `latest`。
- **遗留 Bower 项目：** 冻结现有安装后迁移到 npm/pnpm；不要继续添加新 Bower 依赖。
- **严格兼容项目：** 浏览器目标配置、Autoprefixer 数据和构建工具版本一起审查，不能只看源码 CSS。

## 官方资料

- [Sass documentation](https://sass-lang.com/documentation/)
- [PostCSS documentation](https://postcss.org/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Stylelint user guide](https://stylelint.io/user-guide/)
- [pnpm documentation](https://pnpm.io/)
- [MDN：Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity)

资料核对日期：2026-08-28。
