import { defineConfig } from 'vitepress';

const languageBrandPatterns = [
  { language: 'html', pattern: /🟧(?=\s*HTML)/gu },
  { language: 'css', pattern: /🟦(?=\s*CSS)/gu },
  { language: 'java', pattern: /☕(?=\s*(?:Java|JDK))/gu },
  { language: 'javascript', pattern: /🟨(?=\s*(?:JavaScript|JS))/gu },
  { language: 'python', pattern: /🐍(?=\s*Python)/gu },
  { language: 'cpp', pattern: /⚡(?=\s*C\+\+)/gu },
  { language: 'rust', pattern: /🦀(?=\s*Rust)/gu },
  { language: 'go', pattern: /🐹(?=\s*Go)/gu },
  { language: 'php', pattern: /🐘(?=\s*PHP)/gu },
  { language: 'csharp', pattern: /🔷(?=\s*C#)/gu },
  { language: 'typescript', pattern: /🔷(?=\s*TypeScript)/gu },
  { language: 'kotlin', pattern: /🟣(?=\s*Kotlin)/gu },
  { language: 'ruby', pattern: /💎(?=\s*Ruby)/gu },
];

function renderLanguageBrandIcons(md: any) {
  md.core.ruler.before('block', 'language-brand-icons', (state: any) => {
    let fenceMarker: '```' | '~~~' | null = null;
    state.src = state.src
      .split('\n')
      .map((sourceLine: string) => {
        const trimmed = sourceLine.trimStart();
        const marker = trimmed.startsWith('```') ? '```' : trimmed.startsWith('~~~') ? '~~~' : null;
        if (marker) {
          fenceMarker = fenceMarker === marker ? null : fenceMarker ?? marker;
          return sourceLine;
        }
        if (fenceMarker) return sourceLine;

        let line = sourceLine;
        for (const { language, pattern } of languageBrandPatterns) {
          line = line.replace(
            pattern,
            `<span class="language-brand-icon language-brand-icon--${language}" aria-hidden="true"></span>`,
          );
        }
        return line;
      })
      .join('\n');
  });

  md.core.ruler.push('language-brand-accessible-labels', (state: any) => {
    const iconMarkup = /<span class="language-brand-icon language-brand-icon--[a-z]+" aria-hidden="true"><\/span>\s*/g;
    for (const token of state.tokens) {
      if (token.type !== 'inline' || !token.children) continue;
      for (const child of token.children) {
        const label = child.attrGet?.('aria-label');
        if (label?.includes('language-brand-icon')) {
          child.attrSet('aria-label', label.replace(iconMarkup, ''));
        }
      }
    }
  });
}

export default defineConfig({
  base: process.env.DOCS_BASE || '/',
  title: 'Hello Lang',
  description: '编程语言概念、基础语法与版本演进 (Multi-Language Concept Explorer & Version Evolution Matrix)',
  markdown: {
    config: renderLanguageBrandIcons,
  },
  transformPageData(pageData) {
    for (const { pattern } of languageBrandPatterns) {
      pageData.title = pageData.title.replace(pattern, '');
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    outline: {
      level: [2, 3],
      label: '本页导航 (On this page)',
    },
    nav: [
      { text: 'HTML', link: '/languages/html/' },
      { text: 'CSS', link: '/languages/css/' },
      { text: 'Java', link: '/languages/java/' },
      { text: 'JavaScript', link: '/languages/javascript/' },
      { text: 'Python', link: '/languages/python/' },
      { text: 'C++', link: '/languages/cpp/' },
      { text: 'Rust', link: '/languages/rust/' },
      { text: 'Go', link: '/languages/go/' },
      { text: 'PHP', link: '/languages/php/' },
      { text: 'C#', link: '/languages/csharp/' },
      { text: 'Kotlin', link: '/languages/kotlin/' },
      { text: 'Ruby', link: '/languages/ruby/' },
      { text: '横向矩阵', link: '/matrix/' },
      { text: '⚡ 在线沙箱', link: '/playground/' },
    ],
    sidebar: {
      '/languages/java/': [
        {
          text: 'Java LTS 版本',
          items: [
            { text: 'Java 概览与 LTS 路线图', link: '/languages/java/' },
            { text: '基础语法', link: '/languages/java/basic' },
            { text: 'JDK 8 LTS (Lambda / Stream)', link: '/languages/java/jdk-8' },
            { text: 'JDK 11 LTS (var / HttpClient)', link: '/languages/java/jdk-11' },
            { text: 'JDK 17 LTS (Record / Sealed)', link: '/languages/java/jdk-17' },
            { text: 'JDK 21 LTS (Virtual Threads)', link: '/languages/java/jdk-21' },
            { text: 'JDK 25 LTS (Compact Headers)', link: '/languages/java/jdk-25' },
          ],
        },
      ],
      '/languages/javascript/': [
        {
          text: 'JavaScript 与 ECMAScript',
          items: [
            { text: 'JavaScript 与 Node.js', link: '/languages/javascript/' },
            { text: 'JavaScript Live 演示', link: '/languages/javascript/#javascript-live-dom-实验室' },
            { text: '基础语法', link: '/languages/javascript/basic' },
            { text: 'ES1～ES5', link: '/languages/javascript/pre-es6' },
            { text: 'ES6：let、模块、Promise 与类', link: '/languages/javascript/es6' },
            { text: '现代 JavaScript：异步、数据与模块', link: '/languages/javascript/modern-javascript' },
          ],
        },
        {
          text: 'Node.js LTS 版本',
          items: [
            { text: 'Node.js 14 LTS (AsyncLocalStorage)', link: '/languages/javascript/node-14' },
            { text: 'Node.js 16 LTS (Apple Silicon / V8 9.0)', link: '/languages/javascript/node-16' },
            { text: 'Node.js 18 LTS (Native fetch)', link: '/languages/javascript/node-18' },
            { text: 'Node.js 20 LTS (Permission Model)', link: '/languages/javascript/node-20' },
            { text: 'Node.js 22 LTS (Native WebSocket)', link: '/languages/javascript/node-22' },
          ],
        },
        {
          text: 'TypeScript 类型系统',
          items: [
            { text: 'TypeScript 5.x 类型系统', link: '/languages/javascript/typescript' },
          ],
        },
      ],
      '/languages/python/': [
        {
          text: 'Python 版本与 PEP',
          items: [
            { text: 'Python 概览与 PEP 路线图', link: '/languages/python/' },
            { text: '基础语法', link: '/languages/python/basic' },
            { text: 'Python 3.8 (PEP 572 海象运算符)', link: '/languages/python/py-38' },
            { text: 'Python 3.10 (PEP 634 模式匹配)', link: '/languages/python/py-310' },
            { text: 'Python 3.12 (PEP 695 泛型语法)', link: '/languages/python/py-312' },
          ],
        },
      ],
      '/languages/cpp/': [
        {
          text: 'C++ 标准演进',
          items: [
            { text: 'C++ 标准演进概览', link: '/languages/cpp/' },
            { text: '基础语法', link: '/languages/cpp/basic' },
            { text: 'C++11 (Auto / Move / Lambda)', link: '/languages/cpp/cpp-11' },
            { text: 'C++20 (Concepts / Coroutines)', link: '/languages/cpp/cpp-20' },
            { text: 'C++23 (expected / print)', link: '/languages/cpp/cpp-23' },
          ],
        },
      ],
      '/languages/rust/': [
        {
          text: 'Rust Editions',
          items: [
            { text: 'Rust Editions 概览', link: '/languages/rust/' },
            { text: '基础语法', link: '/languages/rust/basic' },
            { text: 'Edition 2018 (Async / Await)', link: '/languages/rust/edition-2018' },
            { text: 'Edition 2021 (Disjoint Capture)', link: '/languages/rust/edition-2021' },
          ],
        },
      ],
      '/languages/go/': [
        {
          text: 'Go 版本与提案',
          items: [
            { text: 'Go 版本演进概览', link: '/languages/go/' },
            { text: '基础语法', link: '/languages/go/basic' },
            { text: 'Go 1.18 (Generics 泛型提案)', link: '/languages/go/go-118' },
            { text: 'Go 1.22 (for 循环作用域修正)', link: '/languages/go/go-122' },
          ],
        },
      ],
      '/languages/php/': [
        {
          text: 'PHP 版本',
          items: [
            { text: 'PHP 概览与 8.x 路线图', link: '/languages/php/' },
            { text: '基础语法', link: '/languages/php/basic' },
            { text: 'PHP 8.3 (JIT / Enum / Readonly)', link: '/languages/php/php-8' },
          ],
        },
      ],
      '/languages/csharp/': [
        {
          text: 'C# 与 .NET 版本',
          items: [
            { text: 'C# / .NET 概览', link: '/languages/csharp/' },
            { text: '基础语法', link: '/languages/csharp/basic' },
            { text: 'C# 12 / .NET 8 LTS (Primary Constructors)', link: '/languages/csharp/dotnet-8' },
          ],
        },
      ],
      '/languages/kotlin/': [
        {
          text: 'Kotlin 版本',
          items: [
            { text: 'Kotlin 概览', link: '/languages/kotlin/' },
            { text: '基础语法', link: '/languages/kotlin/basic' },
            { text: 'Kotlin 2.0 (K2 编译器 / Smart Cast)', link: '/languages/kotlin/kotlin-2' },
          ],
        },
      ],
      '/languages/ruby/': [
        {
          text: 'Ruby 版本',
          items: [
            { text: 'Ruby 概览', link: '/languages/ruby/' },
            { text: '基础语法', link: '/languages/ruby/basic' },
            { text: 'Ruby 3.3 (YJIT / Data.define)', link: '/languages/ruby/ruby-3' },
          ],
        },
      ],
      '/languages/html/': [
        {
          text: 'HTML 结构与语义',
          items: [
            { text: 'HTML 定位与演进', link: '/languages/html/' },
            { text: 'HTML Live 演示', link: '/languages/html/#live-html-实验室' },
            { text: '基础语法', link: '/languages/html/basic' },
            { text: 'HTML5 之前：HTML 2～4 / XHTML', link: '/languages/html/pre-html5' },
            { text: 'HTML5：语义、媒体与表单', link: '/languages/html/html5' },
            { text: '现代 HTML Living Standard', link: '/languages/html/modern-html' },
          ],
        },
      ],
      '/languages/css/': [
        {
          text: 'CSS 样式与布局',
          items: [
            { text: 'CSS 定位与演进', link: '/languages/css/' },
            { text: 'CSS Live 演示', link: '/languages/css/#live-css-实验室' },
            { text: '基础语法', link: '/languages/css/basic' },
            { text: 'CSS3 之前：CSS1 / CSS2.1', link: '/languages/css/pre-css3' },
            { text: 'CSS3：模块化与响应式', link: '/languages/css/css3' },
            { text: '现代 CSS 平台能力', link: '/languages/css/modern-css' },
          ],
        },
      ],
      '/matrix/': [
        {
          text: '🌐 横向概念矩阵',
          items: [
            { text: '总览', link: '/matrix/' },
            { text: '📌 基础语法', link: '/matrix/basic-syntax' },
            { text: '🧩 面向对象', link: '/matrix/object-model' },
            { text: '⚡ 并发与异步', link: '/matrix/concurrency' },
            { text: '🧠 内存管理与垃圾回收', link: '/matrix/memory' },
            { text: '📦 包管理与构建', link: '/matrix/package-management' },
            { text: '🔀 类型系统、泛型与模式匹配', link: '/matrix/type-system' },
            { text: '🛡️ 错误处理', link: '/matrix/error-handling' },
          ],
        },
      ],
      '/playground/': [
        {
          text: '⚡ 在线沙箱',
          items: [
            { text: '总览', link: '/playground/' },
            { text: 'JavaScript', link: '/playground/javascript' },
            { text: 'Python', link: '/playground/python' },
            { text: 'PHP', link: '/playground/php' },
            { text: 'Ruby', link: '/playground/ruby' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xy2401/hello-lang' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Hello-Lang Platform',
    },
  },
});
