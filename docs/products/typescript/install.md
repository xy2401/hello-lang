# TypeScript 安装与切换

TypeScript 编译器运行在 Node.js 上。它更适合作为项目开发依赖固定，而不是只安装一个全局 `tsc`；pnpm/npm 负责包版本，fnm 负责 Node.js 版本。

- [TypeScript 下载与安装](https://www.typescriptlang.org/download/)
- [TypeScript 发布页](https://github.com/microsoft/TypeScript/releases)
- [Node.js 下载](https://nodejs.org/en/download)
- [Corepack 文档](https://nodejs.org/api/corepack.html)

## 推荐方式

先用 fnm 安装 Node.js LTS，再在项目中固定 `typescript` 开发依赖并提交锁文件。全局安装只适合临时命令，不作为项目版本来源。

## 项目安装

~~~bash
corepack enable
pnpm init
pnpm add -D typescript@6.0.0
pnpm exec tsc --init
pnpm exec tsc --version
~~~

## npm 与全局命令

~~~bash
npm install --save-dev typescript@6.0.0
npx tsc --version
# 仅临时使用
npm install --global typescript@6.0.0
~~~

`npx`/`pnpm exec` 优先读取项目依赖，避免 PATH 上的旧全局编译器。

## 版本切换

修改 `package.json` 中的明确版本并更新锁文件就是项目级切换；需要比较两个版本时可用 `npx --package=typescript@5.9.3 tsc --version`。Node.js 本身由 fnm 切换。

## Docker

~~~bash
docker run --rm node:22-alpine sh -lc 'npm install --global typescript@6.0.0 >/dev/null && tsc --version'
~~~

## 安装验证

~~~bash
node --version
pnpm exec tsc --version
pnpm why typescript
~~~

## 升级、卸载与冲突

用 `pnpm update typescript`/`npm update typescript` 升级，移除则用对应 remove/uninstall。检查锁文件、工作区根依赖和全局 `tsc`，不要把编译器版本误认成语言目标 `target`。

## 官方资料

- [TypeScript 下载与安装](https://www.typescriptlang.org/download/)
- [TypeScript 发布页](https://github.com/microsoft/TypeScript/releases)
- [Node.js 下载](https://nodejs.org/en/download)
- [Corepack 文档](https://nodejs.org/api/corepack.html)

资料核对日期：2026-08-27。
