# HTML 预览与验证

HTML 不需要语言编译器。可靠的命令行闭环是通过本地 HTTP 服务预览、使用验证器检查文档，再在浏览器 DevTools 中确认 DOM、网络和可访问性；不要把直接双击 `file://` 当成部署等价环境。

- [MDN：HTML](https://developer.mozilla.org/docs/Web/HTML)
- [Python http.server](https://docs.python.org/3/library/http.server.html)
- [html-validate](https://html-validate.org/usage/cli.html)

## 启动本地预览

在站点根目录运行：

```bash
python -m http.server 8000 --bind 127.0.0.1
```

访问 `http://127.0.0.1:8000/`。工作目录就是文档根目录，启动前应确认其中没有不希望被浏览器访问的文件。

只检查响应头可使用：

```bash
curl --fail --head http://127.0.0.1:8000/index.html
```

`http.server` 适合本地预览，不是生产 Web Server。

## 验证 HTML

项目已安装 `html-validate` 时执行：

```bash
npx html-validate index.html
npx html-validate 'pages/**/*.html'
```

验证器能发现标签嵌套、属性和部分可访问性问题，但不能证明页面交互、视觉布局或网络请求正确。命令返回非零状态时，应修正文档或明确调整规则，不要在自动化中吞掉失败。

## 查看浏览器实际解析结果

浏览器可能纠正无效标记，因此 Elements 面板中的 DOM 不一定与源文件逐字相同。Console 中可以检查：

```javascript
document.doctype?.name
document.documentElement.lang
document.querySelectorAll('[id]').length
document.querySelectorAll('img:not([alt])')
```

Network 面板用于确认 HTML、模块、图片和字体的状态码、MIME 类型与缓存行为。View Source 显示网络取得的源文本，Elements 显示解析和脚本修改后的 DOM，两者用途不同。

## 参数与失败判断

本地服务的端口冲突会直接导致启动失败，可换用明确端口，但页面 URL、origin 和浏览器存储也会随端口改变。验证命令、HTTP 探测和浏览器控制台应分别检查，不能因为页面“看起来能打开”就忽略 404、解析修复和可访问性错误。

资料核对日期：2026-08-28。
