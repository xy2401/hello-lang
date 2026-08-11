import { defineConfig } from 'vitepress';

export default defineConfig({
  base: process.env.DOCS_BASE || '/hello-lang/',
  title: 'Hello Lang',
  description: '全主流编程语言概念、基础语法与版本演进大典 (Multi-Language Concept Explorer & Version Evolution Matrix)',
  themeConfig: {
    logo: '/logo.svg',
    outline: {
      level: [2, 3],
      label: '本页导航 (On this page)',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: 'Java LTS', link: '/languages/java/' },
      { text: 'JS / Node', link: '/languages/javascript/' },
      { text: 'HTML', link: '/languages/html/' },
      { text: 'CSS', link: '/languages/css/' },
      { text: 'Python PEP', link: '/languages/python/' },
      { text: 'C++ 标准', link: '/languages/cpp/' },
      { text: 'Rust Edition', link: '/languages/rust/' },
      { text: 'Go Proposal', link: '/languages/go/' },
      { text: 'PHP 8', link: '/languages/php/' },
      { text: 'C# / .NET', link: '/languages/csharp/' },
      { text: 'Kotlin', link: '/languages/kotlin/' },
      { text: 'Ruby', link: '/languages/ruby/' },
      { text: '横向矩阵大屏', link: '/matrix/' },
      { text: '⚡ 在线沙箱', link: '/playground' },
    ],
    sidebar: {
      '/languages/java/': [
        {
          text: '☕ Java LTS 版本全典',
          items: [
            { text: 'Java 概览与 LTS 路线图', link: '/languages/java/' },
            { text: '📌 Java 基础语法与 Hello World', link: '/languages/java/basic' },
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
          text: '🟨 JS & ECMAScript 规范大典',
          items: [
            { text: 'JS / Node.js 全景图', link: '/languages/javascript/' },
            { text: '⚡ JavaScript Live 演示', link: '/languages/javascript/#javascript-live-dom-实验室' },
            { text: '📌 JS 基础语法全典', link: '/languages/javascript/basic' },
            { text: 'ES6 之前：ES1～ES5 经典时代', link: '/languages/javascript/pre-es6' },
            { text: 'ES6：现代 JavaScript 奠基', link: '/languages/javascript/es6' },
            { text: '现代 JavaScript：异步、数据与模块', link: '/languages/javascript/modern-javascript' },
          ],
        },
        {
          text: '🟢 Node.js LTS 版本全典',
          items: [
            { text: 'Node.js 14 LTS (AsyncLocalStorage)', link: '/languages/javascript/node-14' },
            { text: 'Node.js 16 LTS (Apple Silicon / V8 9.0)', link: '/languages/javascript/node-16' },
            { text: 'Node.js 18 LTS (Native fetch)', link: '/languages/javascript/node-18' },
            { text: 'Node.js 20 LTS (Permission Model)', link: '/languages/javascript/node-20' },
            { text: 'Node.js 22 LTS (Native WebSocket)', link: '/languages/javascript/node-22' },
          ],
        },
        {
          text: '🔷 TypeScript 类型系统',
          items: [
            { text: 'TypeScript 5.x 工业级类型', link: '/languages/javascript/typescript' },
          ],
        },
      ],
      '/languages/python/': [
        {
          text: '🐍 Python 版本 PEP 全典',
          items: [
            { text: 'Python 概览与 PEP 路线图', link: '/languages/python/' },
            { text: '📌 Python 基础语法全典', link: '/languages/python/basic' },
            { text: 'Python 3.8 (PEP 572 海象运算符)', link: '/languages/python/py-38' },
            { text: 'Python 3.10 (PEP 634 模式匹配)', link: '/languages/python/py-310' },
            { text: 'Python 3.12 (PEP 695 泛型语法)', link: '/languages/python/py-312' },
          ],
        },
      ],
      '/languages/cpp/': [
        {
          text: '⚡ C++ 现代标准大典',
          items: [
            { text: 'C++ 标准演进概览', link: '/languages/cpp/' },
            { text: '📌 C++ 基础语法全典', link: '/languages/cpp/basic' },
            { text: 'C++11 (Auto / Move / Lambda)', link: '/languages/cpp/cpp-11' },
            { text: 'C++20 (Concepts / Coroutines)', link: '/languages/cpp/cpp-20' },
            { text: 'C++23 (expected / print)', link: '/languages/cpp/cpp-23' },
          ],
        },
      ],
      '/languages/rust/': [
        {
          text: '🦀 Rust Editions 全典',
          items: [
            { text: 'Rust Editions 概览', link: '/languages/rust/' },
            { text: '📌 Rust 基础语法全典', link: '/languages/rust/basic' },
            { text: 'Edition 2018 (Async / Await)', link: '/languages/rust/edition-2018' },
            { text: 'Edition 2021 (Disjoint Capture)', link: '/languages/rust/edition-2021' },
          ],
        },
      ],
      '/languages/go/': [
        {
          text: '🐹 Go 演进与提案全典',
          items: [
            { text: 'Go 版本演进概览', link: '/languages/go/' },
            { text: '📌 Go 基础语法全典', link: '/languages/go/basic' },
            { text: 'Go 1.18 (Generics 泛型提案)', link: '/languages/go/go-118' },
            { text: 'Go 1.22 (for 循环作用域修正)', link: '/languages/go/go-122' },
          ],
        },
      ],
      '/languages/php/': [
        {
          text: '🐘 PHP 演进与 Release Notes',
          items: [
            { text: 'PHP 概览与 8.x 路线图', link: '/languages/php/' },
            { text: '📌 PHP 基础语法全典', link: '/languages/php/basic' },
            { text: 'PHP 8.3 (JIT / Enum / Readonly)', link: '/languages/php/php-8' },
          ],
        },
      ],
      '/languages/csharp/': [
        {
          text: '🔷 C# & .NET 全典',
          items: [
            { text: 'C# / .NET 概览', link: '/languages/csharp/' },
            { text: '📌 C# 基础语法全典', link: '/languages/csharp/basic' },
            { text: 'C# 12 / .NET 8 LTS (Primary Constructors)', link: '/languages/csharp/dotnet-8' },
          ],
        },
      ],
      '/languages/kotlin/': [
        {
          text: '🟣 Kotlin 演进全典',
          items: [
            { text: 'Kotlin 概览', link: '/languages/kotlin/' },
            { text: '📌 Kotlin 基础语法全典', link: '/languages/kotlin/basic' },
            { text: 'Kotlin 2.0 (K2 编译器 / Smart Cast)', link: '/languages/kotlin/kotlin-2' },
          ],
        },
      ],
      '/languages/ruby/': [
        {
          text: '💎 Ruby 演进全典',
          items: [
            { text: 'Ruby 概览', link: '/languages/ruby/' },
            { text: '📌 Ruby 基础语法全典', link: '/languages/ruby/basic' },
            { text: 'Ruby 3.3 (YJIT / Data.define)', link: '/languages/ruby/ruby-3' },
          ],
        },
      ],
      '/languages/html/': [
        {
          text: '🟧 HTML 结构与语义全典',
          items: [
            { text: 'HTML 定位与演进', link: '/languages/html/' },
            { text: '⚡ HTML Live 演示', link: '/languages/html/#live-html-实验室' },
            { text: '📌 HTML 基础结构与语义', link: '/languages/html/basic' },
            { text: 'HTML5 之前：HTML 2～4 / XHTML', link: '/languages/html/pre-html5' },
            { text: 'HTML5：语义、媒体与表单', link: '/languages/html/html5' },
            { text: '现代 HTML Living Standard', link: '/languages/html/modern-html' },
          ],
        },
      ],
      '/languages/css/': [
        {
          text: '🟦 CSS 样式与布局全典',
          items: [
            { text: 'CSS 定位与演进', link: '/languages/css/' },
            { text: '⚡ CSS Live 演示', link: '/languages/css/#live-css-实验室' },
            { text: '📌 CSS 基础、层叠与布局', link: '/languages/css/basic' },
            { text: 'CSS3 之前：CSS1 / CSS2.1', link: '/languages/css/pre-css3' },
            { text: 'CSS3：模块化与响应式', link: '/languages/css/css3' },
            { text: '现代 CSS 平台能力', link: '/languages/css/modern-css' },
          ],
        },
      ],
      '/matrix/': [
        {
          text: '🌐 横向概念对比矩阵大屏',
          items: [
            { text: '矩阵总览 Matrix Index', link: '/matrix/' },
            { text: '📌 12 门语言基础语法跨语言对照', link: '/matrix/basic-syntax' },
            { text: '⚡ 并发与异步模型大比拼', link: '/matrix/concurrency' },
            { text: '🧠 内存管理与 GC 垃圾回收大比拼', link: '/matrix/memory' },
            { text: '📦 包管理与构建工具链大比拼', link: '/matrix/package-management' },
            { text: '🔀 类型系统、泛型与模式匹配', link: '/matrix/type-system' },
            { text: '🛡️ 错误处理与控制流哲学', link: '/matrix/error-handling' },
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
