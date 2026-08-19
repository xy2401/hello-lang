<script setup>
import { rubyPlaygroundCode } from '../.vitepress/theme/data/playgroundExamples';
</script>

# <span class="language-brand-icon language-brand-icon--ruby" aria-hidden="true"></span> Ruby 沙箱

Ruby 代码由 Ruby-WASM 提供的 CRuby WebAssembly 运行时在浏览器本地执行。

<CodeRunner
  language="ruby"
  title="Ruby / Ruby-WASM"
  :initialCode="rubyPlaygroundCode"
/>

> [!NOTE]
> 首次运行需下载 Ruby WebAssembly 模块，当前页面内的后续运行会复用已创建的 Ruby VM。
