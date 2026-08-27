# TypeScript 依赖与包管理

TypeScript 使用 JavaScript 的包仓库和管理器，但项目还要区分运行依赖、编译工具、类型声明与发布产物。全局安装一个 `tsc` 无法固定团队构建，编译器应作为项目开发依赖写入清单和锁文件。

- [TypeScript 下载与安装](https://www.typescriptlang.org/download/)
- [声明文件发布与使用](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- [package.json exports](https://nodejs.org/api/packages.html#package-entry-points)
- [pnpm](https://pnpm.io/)
- [npm package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)

## TypeScript 项目的四类内容

- `dependencies`：生成物运行时真正需要的包。
- `devDependencies`：`typescript`、测试器、lint 和只在构建阶段使用的工具。
- `@types/*`：没有自带声明的 JavaScript 库对应的开发期类型包。
- `peerDependencies`：库要求宿主项目提供的兼容依赖，不应被普通应用滥用。

fnm 管 Node.js，npm/pnpm/Yarn/Bun 管依赖，`tsc` 管类型检查和发射，`tsconfig.json` 不是包清单。

## 管理器选择

TypeScript 对包管理器没有特殊绑定。普通应用按 JavaScript 项目的兼容性和工作区规模选择 npm 或 pnpm；使用 Yarn PnP 时必须确认编辑器、语言服务和测试工具能解析 PnP；Bun 项目需验证 Node 类型和运行时 API 差异。

| 关注点 | npm | pnpm | Yarn Modern | Bun |
| --- | --- | --- | --- | --- |
| TypeScript 支持 | 成熟 | 成熟且依赖边界严格 | 成熟，PnP 需 SDK/编辑器适配 | 安装快，运行时兼容需验证 |
| 锁文件 | `package-lock.json` | `pnpm-lock.yaml` | `yarn.lock` | `bun.lock` |
| 新项目建议 | 最大兼容性 | 工作区和磁盘效率 | 已采用 Yarn 体系 | 已验证 Bun 运行时 |

npm 的优点是兼容面广，缺点是大型工作区的磁盘复用通常不如 pnpm；pnpm 的优点是依赖边界严格，缺点是会暴露依赖幽灵包的旧工具；Yarn PnP 适合已有配套规范的团队；Bun 适合已经验证其 Node.js 兼容面的项目。

## 初始化与依赖分类

```bash
pnpm init
pnpm add date-fns
pnpm add -D typescript @types/node
pnpm exec tsc --init
pnpm exec tsc --noEmit
```

移除和检查：

```bash
pnpm remove date-fns
pnpm remove -D @types/node
pnpm why typescript
pnpm list --depth 2
pnpm outdated
pnpm audit
```

锁定安装使用 `pnpm install --frozen-lockfile`；npm 项目对应 `npm ci`。不要同时提交多个管理器的锁文件。

## 类型声明与包边界

优先使用库自带的 `.d.ts`；只有库没有声明时才添加匹配的 `@types` 包。重复安装内置声明和 `@types` 可能造成符号冲突。

库项目需要让生成物和类型入口一致：

```json
{
  "name": "hello-types",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist"]
}
```

`types` 指向声明文件，不应指向源码；`files` 控制包内容，但本页不展开发布流程。

## 升级与供应链检查

升级 TypeScript 时同时检查 `@types/node`、目标 Node.js、`moduleResolution`、测试器和构建插件。先查看 outdated，再定点升级并执行类型检查：

```bash
pnpm update typescript @types/node
pnpm exec tsc --noEmit
pnpm install --frozen-lockfile
```

registry、缓存和凭据策略与 JavaScript 相同。类型包同样是可执行供应链的一部分，安装脚本和传递依赖不能因“只有类型”而跳过审查。

## 选择建议

- **新应用：** pnpm 或 npm，`typescript` 固定在 `devDependencies`，CI 使用 frozen install 和 `tsc --noEmit`。
- **公共库：** 明确 `exports`、`types`、目标模块格式和 peer dependency，发布目录只包含声明的生成物。
- **遗留 JavaScript 迁移：** 先启用允许 JavaScript 的检查，再逐步补类型；不要同时更换包管理器、模块格式和全部类型声明。
- **工作区：** 统一 TypeScript 与 `@types/node` 基线，避免每个包各自携带冲突的编译器。

资料核对日期：2026-08-28。
