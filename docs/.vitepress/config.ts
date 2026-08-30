import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'node:url';
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

function markProductPage(pageData: any) {
  if (!pageData.relativePath.startsWith('products/')) return;
  const pageClasses = String(pageData.frontmatter.pageClass ?? '').split(/\s+/).filter(Boolean);
  pageData.frontmatter.pageClass = [...new Set([...pageClasses, 'product-doc-page'])].join(' ');
}

export default defineConfig({
  base: docsBase,
  title: 'Hello Lang',
  titleTemplate: ':title | 编程语言手册',
  description: '编程语言对比文档（统一语法骨架 · 版本演进矩阵 · Docker 验证） (Multi-Language Concept Explorer & Version Evolution Matrix)',
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${docsBase}favicon.svg` }]],
  vite: { configFile: fileURLToPath(new URL('../vite.config.ts', import.meta.url)) },
  markdown: {
    config: renderLanguageBrandIcons,
  },
  transformPageData(pageData) {
    markProductPage(pageData);
    for (const { pattern } of languageBrandPatterns) {
      pageData.title = pageData.title.replace(pattern, '');
    }
  },
  themeConfig: {
    logo: '/favicon.svg',
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    lastUpdated: { text: '最后更新' },
    docFooter: { prev: '上一篇', next: '下一篇' },
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
            { text: '安装与切换', link: '/products/typescript/install' },
            { text: '编译与运行', link: '/products/typescript/cli' },
            { text: '依赖与包管理', link: '/products/typescript/package' },
            {
              text: '版本演进',
              link: '/products/typescript/version/',
              collapsed: false,
              items: [
                { text: "TypeScript 6.0", link: '/products/typescript/version/typescript-6.0' },
                { text: "TypeScript 5.6", link: '/products/typescript/version/typescript-5.6' },
                { text: "TypeScript 5.0", link: '/products/typescript/version/typescript-5.0' },
                { text: "TypeScript 4.0", link: '/products/typescript/version/typescript-4.0' },
                { text: "TypeScript 3.7", link: '/products/typescript/version/typescript-3.7' },
              ],
            },
            { text: 'Docker 验证', link: '/products/typescript/DockerTooling' },
          ],
        },
      ],
      '/products/java/': [
        {
          text: 'Java',
          items: [
            { text: '概览', link: '/products/java/' },
            { text: '安装与切换', link: '/products/java/install' },
            { text: '编译与运行', link: '/products/java/cli' },
            { text: '依赖与包管理', link: '/products/java/package' },
            { text: '基础语法', link: '/products/java/basic' },
            {
              text: '版本演进',
              link: '/products/java/version/',
              collapsed: false,
              items: [
                { text: 'JDK 8 LTS', link: '/products/java/version/jdk-8' },
                { text: 'JDK 11 LTS', link: '/products/java/version/jdk-11' },
                { text: 'JDK 17 LTS', link: '/products/java/version/jdk-17' },
                { text: 'JDK 21 LTS', link: '/products/java/version/jdk-21' },
                { text: 'JDK 25 LTS', link: '/products/java/version/jdk-25' },
                { text: 'J2EE / Jakarta EE', link: '/products/java/version/jakarta-ee' },
                { text: 'Java EE 8 / Jakarta EE 8', link: '/products/java/version/jakarta-ee-8' },
                { text: 'Jakarta EE 9 / 9.1', link: '/products/java/version/jakarta-ee-9' },
                { text: 'Jakarta EE 10', link: '/products/java/version/jakarta-ee-10' },
                { text: 'Jakarta EE 11', link: '/products/java/version/jakarta-ee-11' },
                { text: 'GraalVM', link: '/products/java/version/graalvm' },
              ],
            },
            { text: 'Docker 验证', link: '/products/java/DockerTooling' },
          ],
        },
      ],
      '/products/python/': [
        {
          text: 'Python',
          items: [
            { text: '版本总览', link: '/products/python/' },
            { text: '安装与切换', link: '/products/python/install' },
            { text: '编译与运行', link: '/products/python/cli' },
            { text: '依赖与包管理', link: '/products/python/package' },
            { text: '基础语法', link: '/products/python/basic' },
            {
              text: '版本演进',
              link: '/products/python/version/',
              collapsed: false,
              items: [
                { text: "Python 3.14", link: '/products/python/version/python-3.14' },
                { text: "Python 3.13", link: '/products/python/version/python-3.13' },
                { text: "Python 3.12", link: '/products/python/version/py-312' },
                { text: "Python 3.11", link: '/products/python/version/python-3.11' },
                { text: "Python 3.10", link: '/products/python/version/py-310' },
                { text: "Python 3.8", link: '/products/python/version/py-38' },
              ],
            },
            { text: 'Docker 验证', link: '/products/python/DockerTooling' },
          ],
        },
      ],
      '/products/rust/': [
        {
          text: 'Rust',
          items: [
            { text: 'Edition 总览', link: '/products/rust/' },
            { text: '安装与切换', link: '/products/rust/install' },
            { text: '编译与运行', link: '/products/rust/cli' },
            { text: '依赖与包管理', link: '/products/rust/package' },
            { text: '基础语法', link: '/products/rust/basic' },
            {
              text: '版本演进',
              link: '/products/rust/version/',
              collapsed: false,
              items: [
                { text: "Rust Edition 2024", link: '/products/rust/version/rust-edition-2024' },
                { text: "Rust Edition 2021", link: '/products/rust/version/edition-2021' },
                { text: "Rust Edition 2018", link: '/products/rust/version/edition-2018' },
                { text: "Rust 1.0", link: '/products/rust/version/rust-1.0' },
              ],
            },
            { text: 'Docker 验证', link: '/products/rust/DockerTooling' },
          ],
        },
      ],
      '/products/go/': [
        {
          text: 'Go',
          items: [
            { text: '版本总览', link: '/products/go/' },
            { text: '安装与切换', link: '/products/go/install' },
            { text: '编译与运行', link: '/products/go/cli' },
            { text: '依赖与包管理', link: '/products/go/package' },
            { text: '基础语法', link: '/products/go/basic' },
            {
              text: '版本演进',
              link: '/products/go/version/',
              collapsed: false,
              items: [
                { text: "Go 1.27", link: '/products/go/version/go-1.27' },
                { text: "Go 1.26", link: '/products/go/version/go-1.26' },
                { text: "Go 1.25", link: '/products/go/version/go-1.25' },
                { text: "Go 1.24", link: '/products/go/version/go-1.24' },
                { text: "Go 1.23", link: '/products/go/version/go-1.23' },
                { text: "Go 1.22", link: '/products/go/version/go-122' },
                { text: "Go 1.18", link: '/products/go/version/go-118' },
                { text: "Go 1.13", link: '/products/go/version/go-1.13' },
                { text: "Go 1.11", link: '/products/go/version/go-1.11' },
              ],
            },
            { text: 'Docker 验证', link: '/products/go/DockerTooling' },
          ],
        },
      ],
      '/products/javascript/': [
        {
          text: 'JavaScript',
          items: [
            { text: '版本总览', link: '/products/javascript/' },
            { text: '安装与切换', link: '/products/javascript/install' },
            { text: '编译与运行', link: '/products/javascript/cli' },
            { text: '依赖与包管理', link: '/products/javascript/package' },
            { text: '基础语法', link: '/products/javascript/basic' },
            {
              text: '版本演进',
              link: '/products/javascript/version/',
              collapsed: false,
              items: [
                { text: "Node.js 24 LTS", link: '/products/javascript/version/node.js-24' },
                { text: "Node.js 26 Current", link: '/products/javascript/version/node.js-26-current' },
                { text: "Node.js 22 LTS", link: '/products/javascript/version/node-22' },
                { text: "Node.js 20 LTS", link: '/products/javascript/version/node-20' },
                { text: "ES2020–ES2023", link: '/products/javascript/version/modern-javascript' },
                { text: "ES6 (ECMAScript 2015)", link: '/products/javascript/version/es6' },
                { text: "Node.js 14 LTS", link: '/products/javascript/version/node-14' },
                { text: "Node.js 16 LTS", link: '/products/javascript/version/node-16' },
                { text: "Node.js 18 LTS", link: '/products/javascript/version/node-18' },
                { text: "ES1～ES5", link: '/products/javascript/version/pre-es6' },
              ],
            },
            { text: 'Docker 验证', link: '/products/javascript/DockerTooling' },
          ],
        },
      ],
      '/products/cpp/': [
        {
          text: 'C & C++',
          items: [
            { text: 'C / C++ 总览', link: '/products/cpp/' },
            { text: '安装与切换', link: '/products/cpp/install' },
            { text: '编译与运行', link: '/products/cpp/cli' },
            { text: '依赖与包管理', link: '/products/cpp/package' },
            { text: 'C 语言介绍', link: '/products/cpp/c' },
            { text: 'C++ 基础语法', link: '/products/cpp/basic' },
            {
              text: '版本演进',
              link: '/products/cpp/version/',
              collapsed: false,
              items: [
                { text: "C++23", link: '/products/cpp/version/cpp-23' },
                { text: "C++20", link: '/products/cpp/version/cpp-20' },
                { text: "C++17", link: '/products/cpp/version/cpp17' },
                { text: "C++11", link: '/products/cpp/version/cpp-11' },
                { text: "C23 (ISO C Standard)", link: '/products/cpp/version/c-23' },
                { text: "C11：原子、线程与编译期检查", link: '/products/cpp/version/c-11' },
                { text: "C17 / C18：缺陷修订与稳定基线", link: '/products/cpp/version/c-17' },
                { text: "C89 / C90：标准化基线", link: '/products/cpp/version/c-89' },
                { text: "C99：现代 C 的重要扩展", link: '/products/cpp/version/c-99' },
              ],
            },
            { text: 'Docker 验证', link: '/products/cpp/DockerTooling' },
          ],
        },
      ],
      '/products/php/': [
        {
          text: 'PHP',
          items: [
            { text: '版本总览', link: '/products/php/' },
            { text: '安装与切换', link: '/products/php/install' },
            { text: '编译与运行', link: '/products/php/cli' },
            { text: '依赖与包管理', link: '/products/php/package' },
            { text: '基础语法', link: '/products/php/basic' },
            {
              text: '版本演进',
              link: '/products/php/version/',
              collapsed: false,
              items: [
                { text: "PHP 8.5", link: '/products/php/version/php-8.5' },
                { text: "PHP 8.4", link: '/products/php/version/php-8.4' },
                { text: "PHP 8.3", link: '/products/php/version/php-8' },
                { text: "PHP 8.0", link: '/products/php/version/php-8.0' },
                { text: "PHP 7.0", link: '/products/php/version/php-7.0' },
              ],
            },
            { text: 'Docker 验证', link: '/products/php/DockerTooling' },
          ],
        },
      ],
      '/products/csharp/': [
        {
          text: 'C#',
          items: [
            { text: '版本总览', link: '/products/csharp/' },
            { text: '安装与切换', link: '/products/csharp/install' },
            { text: '编译与运行', link: '/products/csharp/cli' },
            { text: '依赖与包管理', link: '/products/csharp/package' },
            { text: '基础语法', link: '/products/csharp/basic' },
            {
              text: '版本演进',
              link: '/products/csharp/version/',
              collapsed: false,
              items: [
                { text: "C# 14 / .NET 10 LTS", link: '/products/csharp/version/csharp-14-dotnet-10' },
                { text: "C# 13 (.NET 9)", link: '/products/csharp/version/csharp-13' },
                { text: "C# 12 (.NET 8 LTS)", link: '/products/csharp/version/dotnet-8' },
                { text: "C# 10 (.NET 6 LTS)", link: '/products/csharp/version/csharp-10' },
                { text: "C# 8.0 (.NET Core 3.0)", link: '/products/csharp/version/csharp-8.0' },
              ],
            },
            { text: 'Docker 验证', link: '/products/csharp/DockerTooling' },
          ],
        },
      ],
      '/products/ruby/': [
        {
          text: 'Ruby',
          items: [
            { text: '版本总览', link: '/products/ruby/' },
            { text: '安装与切换', link: '/products/ruby/install' },
            { text: '编译与运行', link: '/products/ruby/cli' },
            { text: '依赖与包管理', link: '/products/ruby/package' },
            { text: '基础语法', link: '/products/ruby/basic' },
            {
              text: '版本演进',
              link: '/products/ruby/version/',
              collapsed: false,
              items: [
                { text: "Ruby 4.0", link: '/products/ruby/version/ruby-4.0' },
                { text: "Ruby 3.3", link: '/products/ruby/version/ruby-3' },
                { text: "Ruby 3.2", link: '/products/ruby/version/ruby-3.2' },
                { text: "Ruby 3.0 (Ruby3x3)", link: '/products/ruby/version/ruby-3.0' },
              ],
            },
            { text: 'Docker 验证', link: '/products/ruby/DockerTooling' },
          ],
        },
      ],
      '/products/kotlin/': [
        {
          text: 'Kotlin',
          items: [
            { text: '版本总览', link: '/products/kotlin/' },
            { text: '安装与切换', link: '/products/kotlin/install' },
            { text: '编译与运行', link: '/products/kotlin/cli' },
            { text: '依赖与包管理', link: '/products/kotlin/package' },
            { text: '基础语法', link: '/products/kotlin/basic' },
            {
              text: '版本演进',
              link: '/products/kotlin/version/',
              collapsed: false,
              items: [
                { text: "Kotlin 2.3", link: '/products/kotlin/version/kotlin-2.3' },
                { text: "Kotlin 2.0", link: '/products/kotlin/version/kotlin-2' },
                { text: "Kotlin 1.9", link: '/products/kotlin/version/kotlin-1.9' },
                { text: "Kotlin 1.3", link: '/products/kotlin/version/kotlin-1.3' },
              ],
            },
            { text: 'Docker 验证', link: '/products/kotlin/DockerTooling' },
          ],
        },
      ],
      '/products/groovy/': [
        { text: 'Groovy', items: [
          { text: '总览', link: '/products/groovy/' },
          { text: '安装与切换', link: '/products/groovy/install' },
          { text: '编译与运行', link: '/products/groovy/cli' },
          { text: '依赖与包管理', link: '/products/groovy/package' },
          { text: '基础语法', link: '/products/groovy/basic' },
          { text: '版本演进', link: '/products/groovy/version/', collapsed: false, items: [
            { text: 'Groovy 5.1', link: '/products/groovy/version/groovy-5.1' },
            { text: 'Groovy 5.0', link: '/products/groovy/version/groovy-5.0' },
            { text: 'Groovy 4.0', link: '/products/groovy/version/groovy-4.0' },
            { text: 'Groovy 3.0', link: '/products/groovy/version/groovy-3.0' },
            { text: 'Groovy 2.4', link: '/products/groovy/version/groovy-2.4' },
          ] },
          { text: 'Docker 验证', link: '/products/groovy/DockerTooling' },
        ] },
      ],
      '/products/scala/': [
        { text: 'Scala', items: [
          { text: '总览', link: '/products/scala/' },
          { text: '安装与切换', link: '/products/scala/install' },
          { text: '编译与运行', link: '/products/scala/cli' },
          { text: '依赖与包管理', link: '/products/scala/package' },
          { text: '基础语法', link: '/products/scala/basic' },
          { text: '版本演进', link: '/products/scala/version/', collapsed: false, items: [
            { text: 'Scala 3.8', link: '/products/scala/version/scala-3.8' },
            { text: 'Scala 3.3 LTS', link: '/products/scala/version/scala-3.3' },
            { text: 'Scala 2.13', link: '/products/scala/version/scala-2.13' },
            { text: 'Scala 2.12', link: '/products/scala/version/scala-2.12' },
          ] },
          { text: 'Docker 验证', link: '/products/scala/DockerTooling' },
        ] },
      ],
      '/products/clojure/': [
        { text: 'Clojure', items: [
          { text: '总览', link: '/products/clojure/' },
          { text: '安装与切换', link: '/products/clojure/install' },
          { text: '编译与运行', link: '/products/clojure/cli' },
          { text: '依赖与包管理', link: '/products/clojure/package' },
          { text: '基础语法', link: '/products/clojure/basic' },
          { text: '版本演进', link: '/products/clojure/version/', collapsed: false, items: [
            { text: 'Clojure 1.12', link: '/products/clojure/version/clojure-1.12' },
            { text: 'Clojure 1.11', link: '/products/clojure/version/clojure-1.11' },
            { text: 'Clojure 1.10', link: '/products/clojure/version/clojure-1.10' },
            { text: 'Clojure 1.8', link: '/products/clojure/version/clojure-1.8' },
          ] },
          { text: 'Docker 验证', link: '/products/clojure/DockerTooling' },
        ] },
      ],
      '/products/html/': [
        {
          text: 'HTML',
          items: [
            { text: '总览', link: '/products/html/' },
            { text: '安装与切换', link: '/products/html/install' },
            { text: '预览与验证', link: '/products/html/cli' },
            { text: '工程依赖', link: '/products/html/package' },
            { text: '基础语法', link: '/products/html/basic' },
            {
              text: '版本演进',
              link: '/products/html/version/',
              collapsed: false,
              items: [
                { text: "HTML Living Standard (现代特性)", link: '/products/html/version/modern-html' },
                { text: "HTML5 (W3C 推荐标准)", link: '/products/html/version/html5' },
                { text: "HTML 4.01", link: '/products/html/version/html-4.01' },
                { text: "HTML5 之前：从超文本文档到 XHTML", link: '/products/html/version/pre-html5' },
              ],
            },
            { text: 'Docker 验证', link: '/products/html/DockerTooling' },
          ],
        },
      ],
      '/products/css/': [
        {
          text: 'CSS',
          items: [
            { text: '总览', link: '/products/css/' },
            { text: '安装与切换', link: '/products/css/install' },
            { text: '预览与验证', link: '/products/css/cli' },
            { text: '工程依赖', link: '/products/css/package' },
            { text: '基础语法', link: '/products/css/basic' },
            {
              text: '版本演进',
              link: '/products/css/version/',
              collapsed: false,
              items: [
                { text: "现代 CSS (2023–2024)", link: '/products/css/version/modern-css' },
                { text: "CSS Grid 布局", link: '/products/css/version/css-grid' },
                { text: "CSS Flexbox 布局", link: '/products/css/version/css-flexbox' },
                { text: "CSS3 模块化", link: '/products/css/version/css3' },
                { text: "CSS3 之前：CSS1、CSS2 与 CSS2.1", link: '/products/css/version/pre-css3' },
              ],
            },
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
          text: '轻量 WebAssembly',
          items: [
            { text: '实验台总览', link: '/playground/' },
            { text: 'JavaScript', link: '/playground/javascript' },
            { text: 'Python', link: '/playground/python' },
            { text: 'PHP', link: '/playground/php' },
            { text: 'Ruby', link: '/playground/ruby' },
          ],
        },
        {
          text: 'RISC-V 64 容器',
          items: [
            { text: 'Java', link: '/playground/container-java' },
            { text: 'JavaScript', link: '/playground/container-javascript' },
            { text: 'TypeScript', link: '/playground/container-typescript' },
            { text: 'Python', link: '/playground/container-python' },
            { text: 'C & C++', link: '/playground/container-cpp' },
            { text: 'Go', link: '/playground/container-go' },
            { text: 'Rust', link: '/playground/container-rust' },
            { text: 'C#（暂不可用）', link: '/playground/container-csharp' },
            { text: 'Kotlin', link: '/playground/container-kotlin' },
            { text: 'Groovy', link: '/playground/container-groovy' },
            { text: 'Scala', link: '/playground/container-scala' },
            { text: 'Clojure', link: '/playground/container-clojure' },
            { text: 'PHP', link: '/playground/container-php' },
            { text: 'Ruby', link: '/playground/container-ruby' },
            { text: 'HTML', link: '/playground/container-html' },
            { text: 'CSS', link: '/playground/container-css' },
          ],
        },
      ],
      '/reference/': [
        {
          text: '编译器与多语言运行时',
          items: [
            { text: 'GCC 编译架构', link: '/reference/gcc' },
            { text: 'LLVM 编译架构', link: '/reference/llvm' },
            { text: 'JVM 字节码体系', link: '/reference/jvm' },
            { text: 'GraalVM 多语言运行时', link: '/reference/graalvm' },
          ],
        },
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
