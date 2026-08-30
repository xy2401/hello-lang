# 浏览器语言实验台

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

## RISC-V 64 容器

下面的环境使用 `container2wasm` 在浏览器中启动精简 Alpine Linux。每个镜像只安装基础命令和对应语言工具链，点击“启动容器”后才下载；构建清单会记录实际版本和体积。

只发布 **RISC-V 64** 资产，不提供 x64 回退。没有可核验 riscv64 工具链的语言会直接说明不可用。

- [Java · OpenJDK 25 LTS](./container-java.md)
- [JavaScript · Node.js 24 LTS](./container-javascript.md)
- [TypeScript · Node.js 24 LTS](./container-typescript.md)
- [Python · CPython](./container-python.md)
- [C & C++ · GCC / Clang](./container-cpp.md)
- [Go](./container-go.md)
- [Rust · Cargo](./container-rust.md)
- [C# · .NET 10 LTS](./container-csharp.md)（暂无 riscv64 SDK）
- [Kotlin 2.3.20 · OpenJDK 25 LTS](./container-kotlin.md)
- [PHP 8.5](./container-php.md)
- [Ruby](./container-ruby.md)
- [HTML · html-validate](./container-html.md)
- [CSS · Stylelint](./container-css.md)
