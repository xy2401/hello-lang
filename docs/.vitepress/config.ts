import { defineConfig } from 'vitepress';
import { allLanguages, featuredLanguages, moreLanguages } from './theme/data/languageNavigation';

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
  title: '🚀 Hello Lang',
  description: '编程语言的终极知识库（12 门语言 · 统一语法骨架 · 版本演进矩阵 · Docker 验证） (Multi-Language Concept Explorer & Version Evolution Matrix)',
  markdown: {
    config: renderLanguageBrandIcons,
  },
  ignoreDeadLinks: true, // 忽略所有 dead link 检查（demos 在项目根目录而非 docs）
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
      // 前 5 个语言全部平铺在主导航，每个都能点击
      ...allLanguages.slice(0, 5).map(l => ({
        text: l.name,
        link: `/products/${l.id}/`,
      })),
      // 第 6 个起在「更多」下拉中展开选择
      {
        text: '更多',
        items: allLanguages.slice(5).map(l => ({
          text: l.name,
          link: `/products/${l.id}/`,
        })),
      },
      }],
      
      '/products/': allLanguages.map(l => ({
        text: l.name,
        link: `/products/${l.id}/`,
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
