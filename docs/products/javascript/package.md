# JavaScript 依赖与包管理

浏览器 JavaScript 最初通过复制脚本或 CDN `<script>` 引入依赖；Node.js 与 npm 建立 `package.json` 和 npm registry 后，Yarn、pnpm 与 Bun 又分别改进安装性能、磁盘模型和运行时整合。

- [npm 文档](https://docs.npmjs.com/)
- [pnpm 文档](https://pnpm.io/)
- [Yarn 文档](https://yarnpkg.com/getting-started)
- [Bun 包管理器](https://bun.sh/docs/pm/cli/install)
- [npm registry](https://www.npmjs.com/)

## 工具边界

fnm/nvm 选择 Node.js 版本；npm、pnpm、Yarn、Bun 解析和安装项目依赖；Vite、Rollup 等读取依赖并构建应用；npm registry 是包源。切换 Node.js 不等于切换项目依赖，切换包管理器也不能同时保留多种锁文件。

## 主流工具比较

| 工具 | 安装模型 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| npm | 扁平 `node_modules` | Node 默认配套、兼容面最广、命令通用 | 大型工作区性能和磁盘复用通常不及 pnpm | 通用项目、库、最低工具门槛 |
| pnpm | 内容寻址存储 + 链接 | 节省磁盘、安装快、依赖边界更严格 | 某些错误依赖幽灵包的旧工具需修正 | 新项目、Monorepo、多仓库开发机 |
| Yarn Modern | Plug'n'Play 或 node_modules | 约束、补丁和工作区能力强 | PnP 对部分工具需要适配，版本世代差异大 | 已采用 Yarn 约束体系的团队 |
| Bun | 与运行时、测试器整合 | 安装速度快、单工具体验直接 | 与 Node/npm 生态的边角兼容需逐项验证 | 已验证 Bun 的应用和工具项目 |

新 Node.js 应用优先 npm 或 pnpm：要求最大兼容性选 npm，重视磁盘复用和严格依赖选 pnpm。已有 Yarn/Bun 项目应尊重仓库锁文件，不为统一个人习惯随意迁移。

## npm 可复现闭环

```bash
npm init -y
npm install date-fns
npm install --save-dev eslint
npm uninstall date-fns
npm ci
npm ls --all
npm explain eslint
npm outdated
npm audit
npm cache verify
```

应用应提交 `package-lock.json` 并用 `npm ci` 严格按锁安装。`npm update` 会在版本范围内改锁，`npm audit fix` 会实际修改依赖树，运行前先审阅报告和 Git 差异。

## pnpm、Yarn 与 Bun

```bash
pnpm add date-fns
pnpm remove date-fns
pnpm install --frozen-lockfile
pnpm why date-fns
pnpm outdated
pnpm audit
pnpm store status
```

```bash
yarn add date-fns
yarn remove date-fns
yarn install --immutable
yarn why date-fns
```

```bash
bun add date-fns
bun remove date-fns
bun install --frozen-lockfile
bun pm ls
bun audit
```

仓库只提交所选工具的一个锁文件，并在 `package.json` 的 `packageManager` 字段固定工具与精确版本。迁移管理器必须重新解析、运行测试并检查 peer dependency，不能直接把旧锁文件改名。

## 缓存、镜像与供应链

- registry 与认证放在用户级或受控项目 `.npmrc`，token 不进入 Git。
- 使用 HTTPS 官方 registry 或可信镜像，镜像故障时不要永久关闭 TLS 校验。
- 依赖树异常先用 `npm explain`、`pnpm why` 或 `yarn why`，不要反复删除锁文件碰运气。
- 升级时区分直接依赖、传递依赖、peer dependency 和运行时版本要求；每批升级都审阅锁文件差异。

资料核对日期：2026-08-28。
