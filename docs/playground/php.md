<script setup>
import { phpPlaygroundCode } from '../.vitepress/theme/data/playgroundExamples';
</script>

# <span class="language-brand-icon language-brand-icon--php" aria-hidden="true"></span> PHP 工作台

PHP 代码由 PHP-WASM 在浏览器中解释执行，`echo` 等标准输出会显示在编辑器下方。

<CodeRunner
  language="php"
  title="PHP / PHP-WASM"
  :initialCode="phpPlaygroundCode"
/>

> [!NOTE]
> 首次运行需加载 PHP-WASM 运行时，不提供服务器文件系统、数据库或 Web 服务器环境。
