# CSS 开发环境 安装与切换

CSS 同样没有独立语言运行时；样式由浏览器实现。开发环境关注目标浏览器、DevTools、Stylelint 与必要的 PostCSS 构建链。

- [W3C CSS 当前工作](https://www.w3.org/Style/CSS/current-work)
- [MDN CSS](https://developer.mozilla.org/docs/Web/CSS)
- [Stylelint 安装](https://stylelint.io/user-guide/get-started)

## 推荐方式

用稳定浏览器开发，并在目标浏览器矩阵上验证。Stylelint 作为项目依赖固定；只有项目确实需要转换时才引入 PostCSS/Autoprefixer。

## 浏览器准备

~~~powershell
winget install Google.Chrome
winget install Mozilla.Firefox
# macOS（Homebrew 社区 cask）
brew install --cask google-chrome firefox
~~~

Linux 采用浏览器厂商官方仓库或发行版包。Safari 随 macOS，Safari Technology Preview 由 Apple 单独提供。

## 项目校验

~~~bash
npm install --save-dev stylelint@17.14.1 stylelint-config-standard
npx stylelint "src/**/*.css"
~~~

## 版本切换

无需切换 CSS 版本。CSS 由独立模块和浏览器实现进度组成；通过 Browserslist、稳定/测试浏览器通道及特性查询验证，不虚构 CSS 3/4 运行时。

## Docker

Docker 不适用于切换 CSS 实现。可以在 Node 镜像中执行 Stylelint，但最终布局必须由真实浏览器渲染验证。

## 安装验证

~~~bash
npx stylelint --version
# 在 DevTools 的 Computed 面板确认最终样式与兼容性警告
~~~

## 升级、卸载与冲突

浏览器保持安全更新，Stylelint 和配置包通过项目锁文件升级。若全局与项目命令冲突，使用 `npx`/`pnpm exec` 调用项目版本。

## 官方资料

- [W3C CSS 当前工作](https://www.w3.org/Style/CSS/current-work)
- [MDN CSS](https://developer.mozilla.org/docs/Web/CSS)
- [Stylelint 安装](https://stylelint.io/user-guide/get-started)

资料核对日期：2026-08-27。
