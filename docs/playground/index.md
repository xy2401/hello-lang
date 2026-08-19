# ⚡ 在线沙箱

> 无需项目后端服务与 API。JavaScript 在可超时终止的独立 Web Worker 中运行；Python、PHP 与 Ruby 运行时按需在浏览器中加载。

每个语言都有独立的编辑与运行页面，选择后即可修改示例代码并查看标准输出。

---

<div class="matrix-grid">

### <span class="language-brand-icon language-brand-icon--javascript" aria-hidden="true"></span> [JavaScript](./javascript.md)

使用独立 Web Worker 运行 JavaScript / ESNext，支持 `async` / `await` 和控制台输出捕获。

---

### <span class="language-brand-icon language-brand-icon--python" aria-hidden="true"></span> [Python](./python.md)

使用 Pyodide 在浏览器中运行 CPython WebAssembly。

---

### <span class="language-brand-icon language-brand-icon--php" aria-hidden="true"></span> [PHP](./php.md)

使用 PHP-WASM 解释并运行 PHP 代码。

---

### <span class="language-brand-icon language-brand-icon--ruby" aria-hidden="true"></span> [Ruby](./ruby.md)

使用 Ruby-WASM 在浏览器中运行 CRuby。

</div>

> [!NOTE]
> Python、PHP 和 Ruby 首次运行时需要下载对应的 WebAssembly 运行时，后续运行会复用当前页面已加载的实例。
