# JavaScript / Node.js 安装与切换

浏览器本身提供 JavaScript 运行时；命令行开发通常安装 Node.js。fnm 管理 Node.js 版本，Corepack 管理 pnpm/Yarn 代理，两者职责不同。

- [Node.js 下载](https://nodejs.org/en/download)
- [fnm 官方仓库](https://github.com/Schniz/fnm)
- [Corepack 文档](https://nodejs.org/api/corepack.html)
- [ECMAScript 规范](https://tc39.es/ecma262/)

## 推荐方式

开发机使用 fnm 安装当前 LTS，并在项目中用 `.node-version` 固定主版本；生产和 CI 使用明确 Node 镜像标签。浏览器代码则以目标浏览器兼容矩阵为准。

## 安装 fnm

~~~powershell
winget install Schniz.fnm
brew install fnm
scoop install fnm
# Linux 也可从 GitHub Releases 安装官方二进制
~~~

## 初始化与包管理器

~~~bash
eval "$(fnm env --use-on-cd --shell bash)"
fnm install --lts
fnm use --lts
corepack enable
corepack prepare pnpm@10.15.0 --activate
~~~

PowerShell、fish、zsh 应使用 `fnm env --shell <名称>` 对应的初始化输出。

## 版本切换

~~~bash
fnm list-remote
fnm install 24
fnm use 24
fnm default 24
node --version
~~~

## Docker

~~~bash
docker run --rm node:22-alpine node --version
~~~

## 安装验证

~~~bash
node --version
npm --version
corepack --version
command -v node
~~~

## 升级、卸载与冲突

fnm 用 `fnm install 24` 增加版本、`fnm uninstall 24.18.0` 删除明确版本。不要同时让系统 Node、Homebrew、nvm 与 fnm 修改 PATH；`npm -g` 全局包按 Node 版本隔离，切换后需重新确认。

## 官方资料

- [Node.js 下载](https://nodejs.org/en/download)
- [fnm 官方仓库](https://github.com/Schniz/fnm)
- [Corepack 文档](https://nodejs.org/api/corepack.html)
- [ECMAScript 规范](https://tc39.es/ecma262/)

资料核对日期：2026-08-27。
