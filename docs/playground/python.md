<script setup>
import { pythonPlaygroundCode } from '../.vitepress/theme/data/playgroundExamples';
</script>

# <span class="language-brand-icon language-brand-icon--python" aria-hidden="true"></span> Python 工作台

Python 代码由 Pyodide 提供的 CPython WebAssembly 运行时在浏览器本地执行，标准输出会显示在编辑器下方。

<CodeRunner
  language="python"
  title="Python / Pyodide"
  :initialCode="pythonPlaygroundCode"
/>

> [!NOTE]
> 首次运行需下载 Pyodide 运行时，耗时取决于当前网络和浏览器缓存。
