# HTML 开发环境 安装与切换

HTML 是浏览器解析的标准，不存在需要安装或切换的“HTML 运行时”。需要准备的是现代浏览器、编辑器、静态服务器和规范校验工具。

- [WHATWG HTML 标准](https://html.spec.whatwg.org/)
- [Nu HTML Checker](https://validator.w3.org/nu/)
- [MDN HTML](https://developer.mozilla.org/docs/Web/HTML)

## 推荐方式

安装目标用户实际使用的浏览器，并保留至少一个稳定版与一个预发布通道做兼容性验证。项目使用本地 HTTP 服务器，避免把 `file://` 行为当成部署结果。

## 浏览器与本地服务

~~~powershell
winget install Google.Chrome
winget install Mozilla.Firefox
# macOS（Homebrew 社区 cask）
brew install --cask google-chrome firefox
~~~

Linux 使用浏览器厂商官方仓库或发行版软件包；企业环境遵循组织的软件分发策略。

## 校验工具

~~~bash
npm install --save-dev html-validate@10.17.0
npx html-validate "docs/**/*.html"
# 在线检查
# https://validator.w3.org/nu/
~~~

## 版本切换

无需切换 HTML 版本。标准持续演进；兼容性通过浏览器稳定版/测试版通道、明确的目标矩阵和自动化测试管理，而不是安装 HTML 4/5 解释器。

## Docker

Docker 不适用于切换 HTML 语言版本。若只需静态托管，可用已固定的 `nginx:1.28-alpine`，但渲染能力仍来自访问页面的浏览器。

## 安装验证

~~~bash
npx html-validate --version
# 启动项目服务器后访问 HTTP URL，而不是直接打开文件
~~~

## 升级、卸载与冲突

浏览器由厂商更新，Node 校验工具由项目锁文件管理。卸载浏览器不会改变 HTML 文件；PATH 冲突主要发生在多个 Node/npm 版本提供的 `html-validate`。

## 官方资料

- [WHATWG HTML 标准](https://html.spec.whatwg.org/)
- [Nu HTML Checker](https://validator.w3.org/nu/)
- [MDN HTML](https://developer.mozilla.org/docs/Web/HTML)

资料核对日期：2026-08-27。
