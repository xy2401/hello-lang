export const htmlLiveCode = `<article class="profile-card">
  <header>
    <p class="eyebrow">HTML Live</p>
    <h2>语义化课程卡片</h2>
  </header>
  <p>这段 HTML 会在右侧隔离区域即时渲染。</p>
  <details>
    <summary>查看学习阶段</summary>
    <ol>
      <li>HTML 2～4 / XHTML</li>
      <li>HTML5</li>
      <li>Living Standard</li>
    </ol>
  </details>
  <button type="button">原生按钮</button>
</article>
<style>
  body { background: #fff7ed; }
  .profile-card { max-width: 28rem; padding: 1.25rem; border: 1px solid #fdba74; border-radius: 1rem; background: white; }
  .eyebrow { color: #c2410c; font-weight: 700; text-transform: uppercase; }
  button { padding: .55rem .9rem; border: 0; border-radius: .5rem; background: #ea580c; color: white; }
</style>`;

export const modernHtmlLiveCode = `<main class="demo-shell">
  <p class="eyebrow">Modern HTML</p>
  <h2>浏览器原生交互</h2>
  <details open>
    <summary>查看学习进度</summary>
    <progress max="100" value="72">72%</progress>
  </details>
  <button type="button" popovertarget="help">打开 Popover</button>
  <aside id="help" popover>
    <strong>无需额外组件</strong>
    <p>显示、关闭和顶层渲染由浏览器管理。</p>
  </aside>
</main>
<style>
  body { background: #f8fafc; color: #172033; }
  .demo-shell { max-width: 30rem; margin: auto; padding: 1.25rem; border: 1px solid #cbd5e1; border-radius: 1rem; background: white; }
  .eyebrow { color: #7c3aed; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
  details { margin-block: 1rem; padding: .85rem; border-radius: .7rem; background: #f5f3ff; }
  button { padding: .65rem .9rem; border: 0; border-radius: .6rem; background: #7c3aed; color: white; cursor: pointer; }
  [popover] { max-width: 20rem; padding: 1rem; border: 1px solid #c4b5fd; border-radius: .8rem; box-shadow: 0 18px 50px #312e8140; }
</style>`;

export const cssPreviewHtml = `<main class="demo-shell">
  <p class="eyebrow">CSS Live</p>
  <h2>响应式课程卡片</h2>
  <div class="card-grid">
    <article><strong>CSS1 / 2.1</strong><span>层叠、盒模型、定位</span></article>
    <article><strong>CSS3</strong><span>圆角、动画、媒体查询</span></article>
    <article><strong>Modern CSS</strong><span>Grid、容器查询、:has()</span></article>
  </div>
</main>`;

export const cssLiveCode = `:root {
  --accent: #2563eb;
  --surface: #eff6ff;
}
body { background: linear-gradient(145deg, #eff6ff, #f8fafc); }
.demo-shell { container: demo / inline-size; max-width: 42rem; margin: auto; }
.eyebrow { color: var(--accent); font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
.card-grid { display: grid; gap: .8rem; }
.card-grid article { display: grid; gap: .25rem; padding: 1rem; border: 1px solid #bfdbfe; border-radius: .8rem; background: white; box-shadow: 0 8px 24px #1d4ed81a; }
.card-grid span { color: #475569; }
@container demo (width > 34rem) { .card-grid { grid-template-columns: repeat(3, 1fr); } }`;

export const basicCssPreviewHtml = `<main class="lesson-list">
  <article class="lesson-card">
    <span>01</span>
    <div><strong>层叠与盒模型</strong><p>观察间距、边框和背景。</p></div>
  </article>
  <article class="lesson-card">
    <span>02</span>
    <div><strong>响应式布局</strong><p>改变窗口宽度查看 Grid 重排。</p></div>
  </article>
</main>`;

export const basicCssLiveCode = `:root { --brand: #4f46e5; }
* { box-sizing: border-box; }
body { background: #eef2ff; color: #1e293b; }
.lesson-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
  max-width: 42rem;
  margin: auto;
}
.lesson-card {
  display: flex;
  gap: .9rem;
  padding: 1rem;
  border: 1px solid #c7d2fe;
  border-radius: .8rem;
  background: white;
}
.lesson-card > span { color: var(--brand); font-weight: 800; }
.lesson-card p { margin-bottom: 0; color: #64748b; }`;

export const jsLiveMarkup = `<main>
  <h2 id="title">JavaScript Live</h2>
  <p id="status">等待脚本运行…</p>
  <button id="action" type="button">增加计数</button>
  <strong id="count">0</strong>
</main>`;

export const jsLiveCode = `const status = document.querySelector('#status');
const count = document.querySelector('#count');
const button = document.querySelector('#action');
let value = 0;

status.textContent = '脚本已运行，可以点击按钮。';
button.addEventListener('click', () => {
  value += 1;
  count.textContent = value;
  console.log('当前计数:', value);
});
console.log('Live DOM 初始化完成');`;

export const basicJsLiveMarkup = `<main>
  <h2>JavaScript 基础运行结果</h2>
  <dl id="profile"></dl>
</main>`;

export const basicJsLiveCode = `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return \`\${this.name} (\${this.age} years old)\`;
  }
}

function calculateBonus(base, ratio = 0.1) {
  return base * ratio;
}

const person = new Person('Alice', 25);
const bonus = calculateBonus(8500.5);
document.querySelector('#profile').innerHTML =
  \`<dt>Person</dt><dd>\${person.getInfo()}</dd><dt>Bonus</dt><dd>$\${bonus}</dd>\`;
console.log('Person Info:', person.getInfo());
console.log('Calculated Bonus:', bonus);`;

export const es6LiveMarkup = `<main>
  <p class="eyebrow">ES6 Class + Promise</p>
  <h2 id="message">等待 Promise 完成…</h2>
</main>`;

export const es6LiveCode = `class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return \`Hello, \${this.name}\`;
  }
}

const u = new User('Alice');
const promise = Promise.resolve(u.sayHi());
promise.then(msg => {
  document.querySelector('#message').textContent = msg;
  console.log('ES6 Class & Promise Output:', msg);
});`;

export const modernJsLiveMarkup = `<main>
  <p>按能力整理任务，不按年份罗列 API。</p>
  <ol id="tasks"></ol>
  <strong id="summary"></strong>
</main>`;

export const modernJsLiveCode = `const response = {
  user: { profile: { name: 'Alice' } },
  tasks: [
    { title: 'Promise', points: 8 },
    { title: '不可变数组', points: 5 },
    { title: '可选链', points: 3 }
  ]
};

const userName = response.user?.profile?.name ?? '匿名用户';
const ranked = response.tasks.toSorted((left, right) => right.points - left.points);
document.querySelector('#tasks').innerHTML = ranked
  .map(task => \`<li>\${task.title}：\${task.points} 分</li>\`)
  .join('');
document.querySelector('#summary').textContent = \`\${userName} · 共 \${ranked.length} 项\`;
console.log('Modern JavaScript result:', ranked);`;

export const homeJsLiveMarkup = `<main>
  <h2>Live 语言清单</h2>
  <ul id="language-output"><li>点击运行生成内容</li></ul>
</main>`;

export const homeJsLiveCode = `const languages = ['JavaScript', 'Python', 'Java', 'Rust', 'Go', 'PHP', 'C#', 'Ruby', 'Kotlin', 'HTML', 'CSS'];
const formatted = languages.map(language => \`🚀 Hello \${language}!\`);
document.querySelector('#language-output').innerHTML = formatted
  .map(item => \`<li>\${item}</li>\`)
  .join('');
console.log('Rendered languages:', formatted.length);`;
