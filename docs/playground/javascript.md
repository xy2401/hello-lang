<script setup>
import { javascriptPlaygroundCode } from '../.vitepress/theme/data/playgroundExamples';
</script>

# <span class="language-brand-icon language-brand-icon--javascript" aria-hidden="true"></span> JavaScript 工作台

JavaScript 代码在独立 Web Worker 中执行，不阻塞页面主线程。沙箱会捕获 `console.log`、`console.warn` 与 `console.error` 输出，并在运行超时时终止 Worker。

<CodeRunner
  language="javascript"
  title="JavaScript / ESNext"
  :initialCode="javascriptPlaygroundCode"
/>

> [!TIP]
> 可直接使用顶层 `await`。为了保持沙箱边界，Worker 内的网络请求与子 Worker 能力已禁用。
