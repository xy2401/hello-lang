import { defineConfig } from 'vitepress';
import { allLanguages, featuredLanguages, moreLanguages } from './theme/data/languageNavigation';

const docsBase = process.env.DOCS_BASE || '/';

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
  base: docsBase,
  title: 'Hello Lang',
  titleTemplate: ':title | 编程语言手册',
  description: '编程语言对比文档（统一语法骨架 · 版本演进矩阵 · Docker 验证） (Multi-Language Concept Explorer & Version Evolution Matrix)',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${docsBase}favicon.svg` }]],
  markdown: {
    config: renderLanguageBrandIcons,
  },
  transformPageData(pageData) {
    for (const { pattern } of languageBrandPatterns) {
      pageData.title = pageData.title.replace(pattern, '');
    }
  },
  themeConfig: {
    logo: '/favicon.svg',
    outline: {
      level: [2, 3],
      label: '本页导航 (On this page)',
    },
    nav: [
      ...featuredLanguages.map(language => ({
        text: language.name,
        link: language.link ?? `/products/${language.id}/`,
      })),
      {
        text: '📦 更多',
        items: [
          ...moreLanguages.map(language => ({
            text: language.name,
            link: language.link ?? `/products/${language.id}/`,
          })),
        ],
      },
      { text: '🧪 实验台', link: '/playground/' },
      { text: '⚖️ 对比矩阵', link: '/matrix/' },
      { text: '📚 参考资料', link: '/reference/' },
    ],
    sidebar: {
      '/products/typescript/': [
        {
          text: 'TypeScript',
          items: [
            { text: 'TypeScript 5.x 类型系统', link: '/products/typescript/' },
            { text: '版本演进', link: '/products/typescript/versions' },
            { text: 'Docker 验证', link: '/products/typescript/DockerTooling' },
          ],
        },
      ],
      '/products/java/': [
        {
          text: 'Java',
          items: [
            { text: '版本总览', link: '/products/java/' },
            { text: '基础语法', link: '/products/java/basic' },
            { text: 'JDK 8 LTS', link: '/products/java/jdk-8' },
            { text: 'JDK 11 LTS', link: '/products/java/jdk-11' },
            { text: 'JDK 17 LTS', link: '/products/java/jdk-17' },
            { text: 'JDK 21 LTS', link: '/products/java/jdk-21' },
            { text: 'JDK 25 LTS', link: '/products/java/jdk-25' },
            { text: '版本演进', link: '/products/java/versions' },
            { text: 'Docker 验证', link: '/products/java/DockerTooling' },
          ],
        },
      ],
      '/products/python/': [
        {
          text: 'Python',
          items: [
            { text: '版本总览', link: '/products/python/' },
            { text: '基础语法', link: '/products/python/basic' },
            { text: 'Python 3.8', link: '/products/python/py-38' },
            { text: 'Python 3.10', link: '/products/python/py-310' },
            { text: 'Python 3.12', link: '/products/python/py-312' },
            { text: '版本演进', link: '/products/python/versions' },
            { text: 'Docker 验证', link: '/products/python/DockerTooling' },
          ],
        },
      ],
      '/products/rust/': [
        {
          text: 'Rust',
          items: [
            { text: 'Edition 总览', link: '/products/rust/' },
            { text: '基础语法', link: '/products/rust/basic' },
            { text: 'Edition 2018', link: '/products/rust/edition-2018' },
            { text: 'Edition 2021', link: '/products/rust/edition-2021' },
            { text: '版本演进', link: '/products/rust/versions' },
            { text: 'Docker 验证', link: '/products/rust/DockerTooling' },
          ],
        },
      ],
      '/products/go/': [
        {
          text: 'Go',
          items: [
            { text: '版本总览', link: '/products/go/' },
            { text: '基础语法', link: '/products/go/basic' },
            { text: 'Go 1.18', link: '/products/go/go-118' },
            { text: 'Go 1.22', link: '/products/go/go-122' },
            { text: '版本演进', link: '/products/go/versions' },
            { text: 'Docker 验证', link: '/products/go/DockerTooling' },
          ],
        },
      ],
      '/products/javascript/': [
        {
          text: 'JavaScript',
          items: [
            { text: '版本总览', link: '/products/javascript/' },
            { text: '基础语法', link: '/products/javascript/basic' },
            { text: 'ES1–ES5', link: '/products/javascript/pre-es6' },
            { text: 'ES6（ES2015）', link: '/products/javascript/es6' },
            { text: '现代 JavaScript', link: '/products/javascript/modern-javascript' },
            { text: 'Node.js 14 LTS', link: '/products/javascript/node-14' },
            { text: 'Node.js 16 LTS', link: '/products/javascript/node-16' },
            { text: 'Node.js 18 LTS', link: '/products/javascript/node-18' },
            { text: 'Node.js 20 LTS', link: '/products/javascript/node-20' },
            { text: 'Node.js 22 LTS', link: '/products/javascript/node-22' },
            { text: '版本演进', link: '/products/javascript/versions' },
            { text: 'Docker 验证', link: '/products/javascript/DockerTooling' },
          ],
        },
      ],
      '/products/cpp/': [
        {
          text: 'C & C++',
          items: [
            { text: 'C / C++ 总览', link: '/products/cpp/' },
            { text: 'C 语言介绍', link: '/products/cpp/c' },
            { text: 'C89 / C90', link: '/products/cpp/c-89' },
            { text: 'C99', link: '/products/cpp/c-99' },
            { text: 'C11', link: '/products/cpp/c-11' },
            { text: 'C17 / C18', link: '/products/cpp/c-17' },
            { text: 'C23', link: '/products/cpp/c-23' },
            { text: 'C++ 基础语法', link: '/products/cpp/basic' },
            { text: 'C++11', link: '/products/cpp/cpp-11' },
            { text: 'C++20', link: '/products/cpp/cpp-20' },
            { text: 'C++23', link: '/products/cpp/cpp-23' },
            { text: '版本演进', link: '/products/cpp/versions' },
            { text: 'Docker 验证', link: '/products/cpp/DockerTooling' },
          ],
        },
      ],
      '/products/php/': [
        {
          text: 'PHP',
          items: [
            { text: '版本总览', link: '/products/php/' },
            { text: '基础语法', link: '/products/php/basic' },
            { text: 'PHP 8.3', link: '/products/php/php-8' },
            { text: '版本演进', link: '/products/php/versions' },
            { text: 'Docker 验证', link: '/products/php/DockerTooling' },
          ],
        },
      ],
      '/products/csharp/': [
        {
          text: 'C#',
          items: [
            { text: '版本总览', link: '/products/csharp/' },
            { text: '基础语法', link: '/products/csharp/basic' },
            { text: 'C# 12 / .NET 8', link: '/products/csharp/dotnet-8' },
            { text: '版本演进', link: '/products/csharp/versions' },
            { text: 'Docker 验证', link: '/products/csharp/DockerTooling' },
          ],
        },
      ],
      '/products/ruby/': [
        {
          text: 'Ruby',
          items: [
            { text: '版本总览', link: '/products/ruby/' },
            { text: '基础语法', link: '/products/ruby/basic' },
            { text: 'Ruby 3.3', link: '/products/ruby/ruby-3' },
            { text: '版本演进', link: '/products/ruby/versions' },
            { text: 'Docker 验证', link: '/products/ruby/DockerTooling' },
          ],
        },
      ],
      '/products/kotlin/': [
        {
          text: 'Kotlin',
          items: [
            { text: '版本总览', link: '/products/kotlin/' },
            { text: '基础语法', link: '/products/kotlin/basic' },
            { text: 'Kotlin 2.0', link: '/products/kotlin/kotlin-2' },
            { text: '版本演进', link: '/products/kotlin/versions' },
            { text: 'Docker 验证', link: '/products/kotlin/DockerTooling' },
          ],
        },
      ],
      '/products/html/': [
        {
          text: 'HTML',
          items: [
            { text: '总览', link: '/products/html/' },
            { text: '基础语法', link: '/products/html/basic' },
            { text: 'HTML5 之前', link: '/products/html/pre-html5' },
            { text: 'HTML5', link: '/products/html/html5' },
            { text: '现代 HTML', link: '/products/html/modern-html' },
            { text: '版本演进', link: '/products/html/versions' },
            { text: 'Docker 验证', link: '/products/html/DockerTooling' },
          ],
        },
      ],
      '/products/css/': [
        {
          text: 'CSS',
          items: [
            { text: '总览', link: '/products/css/' },
            { text: '基础语法', link: '/products/css/basic' },
            { text: 'CSS3 之前', link: '/products/css/pre-css3' },
            { text: 'CSS3', link: '/products/css/css3' },
            { text: '现代 CSS', link: '/products/css/modern-css' },
            { text: '版本演进', link: '/products/css/versions' },
            { text: 'Docker 验证', link: '/products/css/DockerTooling' },
          ],
        },
      ],
      '/products/': allLanguages.map(l => ({
        text: l.name,
        link: l.link ?? `/products/${l.id}/`,
      })),
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
            { text: '🐳 Docker 验证', link: '/matrix/docker-tools' },
          ],
        },
      ],
      '/playground/': [
        {
          text: '⚡ 浏览器实验台',
          items: [
            { text: '实验台总览', link: '/playground/' },
            { text: 'JavaScript', link: '/playground/javascript' },
            { text: 'Python', link: '/playground/python' },
            { text: 'PHP', link: '/playground/php' },
            { text: 'Ruby', link: '/playground/ruby' },
          ],
        },
      ],
      '/reference/': [
        {
          text: '参考资料',
          items: [
            { text: '参考资料总览', link: '/reference/' },
            { text: 'Docker 验证说明', link: '/reference/docker-validation' },
            { text: 'C++ 交互展示', link: '/reference/showcases/cpp' },
            { text: 'Go 交互展示', link: '/reference/showcases/go' },
            { text: 'Java LTS 索引', link: '/reference/showcases/java' },
            { text: 'JavaScript 交互展示', link: '/reference/showcases/javascript' },
            { text: 'Python 交互展示', link: '/reference/showcases/python' },
            { text: 'Rust 交互展示', link: '/reference/showcases/rust' },
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
    search: { provider: 'local' },
  },
});
