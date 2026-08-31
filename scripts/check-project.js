import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const docsDir = path.join(rootDir, 'docs');
const errors = [];
const topicNames = ['data-structures', 'algorithms'];
const topicRuntimeSources = new Set();

function walk(directory, predicate = () => true) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(target, predicate));
    else if (predicate(target)) files.push(target);
  }
  return files;
}

function relative(file) {
  return path.relative(rootDir, file).replaceAll('\\', '/');
}

function existsAsDoc(target) {
  return [target, `${target}.md`, path.join(target, 'index.md')].some(fs.existsSync);
}

function checkLinks(file, content) {
  const withoutCode = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\r\n]*`/g, '');
  const links = [
    ...withoutCode.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g),
    ...withoutCode.matchAll(/href=["']([^"']+)["']/g),
  ];

  for (const match of links) {
    const rawLink = match[1];
    if (/^(https?:|mailto:|#)/.test(rawLink)) continue;
    if (rawLink.startsWith('file:')) {
      errors.push(`${relative(file)} 使用了不可移植链接: ${rawLink}`);
      continue;
    }

    const link = decodeURIComponent(rawLink.split(/[?#]/, 1)[0]);
    if (!link) continue;
    const target = link.startsWith('/')
      ? path.join(docsDir, link.slice(1))
      : path.resolve(path.dirname(file), link);
    if (!existsAsDoc(target)) errors.push(`${relative(file)} 链接不存在: ${rawLink}`);
  }
}

function checkOutputReferences(file, content) {
  for (const match of content.matchAll(/sourceFile="([^"]+)"/g)) {
    const source = match[1];
    const output = source.endsWith('.out')
      ? path.join(rootDir, `${source}.txt`)
      : path.join(rootDir, `${source}.out.txt`);
    if (!fs.existsSync(output)) errors.push(`${relative(file)} 缺少输出快照: ${relative(output)}`);
  }
}

const markdownFiles = walk(docsDir, (file) => file.endsWith('.md'));
for (const file of markdownFiles) {
  const content = fs.readFileSync(file, 'utf8');
  checkLinks(file, content);
  checkOutputReferences(file, content);

  for (const match of content.matchAll(/^<<<\s+([^\s{]+)/gm)) {
    const imported = match[1].split(/[?#]/, 1)[0];
    const target = path.resolve(path.dirname(file), imported);
    if (!fs.existsSync(target)) errors.push(`${relative(file)} 引用的源码不存在: ${imported}`);
  }

  if (topicNames.some(topic => file.endsWith(`${topic}.md`))) {
    for (const match of content.matchAll(/sourceFile="([^"]+)"/g)) topicRuntimeSources.add(match[1]);
  }
}
checkLinks(path.join(rootDir, 'README.md'), fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8'));

const productsDir = path.join(docsDir, 'products');
const productIds = fs.readdirSync(productsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();
const expectedProductIds = ['clojure', 'cpp', 'csharp', 'css', 'go', 'groovy', 'html', 'java', 'javascript', 'kotlin', 'lisp', 'lua', 'php', 'python', 'ruby', 'rust', 'scala', 'typescript'];
const topicProductIds = expectedProductIds.filter(productId => !['clojure', 'groovy', 'scala'].includes(productId));
for (const productId of expectedProductIds) {
  if (!productIds.includes(productId)) errors.push(`缺少产品分卷: ${productId}`);
}
for (const productId of productIds) {
  if (!expectedProductIds.includes(productId)) errors.push(`未登记的产品分卷: ${productId}`);
}
const vitepressConfig = fs.readFileSync(path.join(docsDir, '.vitepress', 'config.ts'), 'utf8');
for (const productId of topicProductIds) {
  for (const topic of topicNames) {
    const topicDoc = path.join(productsDir, productId, `${topic}.md`);
    if (!fs.existsSync(topicDoc)) errors.push(`产品 ${productId} 缺少专题文档: ${topic}.md`);
    const route = `/products/${productId}/${topic}`;
    if (!vitepressConfig.includes(`link: '${route}'`)) errors.push(`侧栏缺少专题路由: ${route}`);
  }
}

const familyRoutes = [
  '/products/lisp/common-lisp', '/products/lisp/scheme', '/products/lisp/clojure', '/products/lisp/racket',
  '/products/lisp/version/', '/products/lisp/docker-tooling', '/products/lua/lua-55',
  '/products/lua/version/', '/products/lua/docker-tooling',
];
for (const route of familyRoutes) {
  if (!vitepressConfig.includes(`link: '${route}'`)) errors.push(`侧栏缺少新增产品路由: ${route}`);
}

const releaseLocks = [
  ['demos/lisp/Dockerfile.guile', 'GUILE_VERSION=3.0.11', '818c79d236657a7fa96fb364137cc7b41b3bdee0d65c6174ca03769559579460'],
  ['demos/lisp/deps.edn', '1.12.5'],
  ['demos/lisp/Dockerfile.racket', 'RACKET_VERSION=9.3', '7a1cc4b14a746add95eec2e549df54e5154b7dc94938a86330ce6a02ec7f75ce'],
  ['demos/lua/Dockerfile', 'LUA_VERSION=5.5.1', '1c4b4068d67061f2a2231ad2b5422e77acea1487ea9890f6320af614f4373dce'],
];
for (const [fileName, ...tokens] of releaseLocks) {
  const content = fs.readFileSync(path.join(rootDir, fileName), 'utf8');
  for (const token of tokens) {
    if (!content.includes(token)) errors.push(`${fileName} 缺少版本或校验和锁: ${token}`);
  }
}

const dockerRunnerSource = fs.readFileSync(path.join(rootDir, 'scripts', 'run-docker-demos.js'), 'utf8');
for (const source of topicRuntimeSources) {
  const demoRelative = source.replace(/^demos\//, '');
  if (!dockerRunnerSource.includes(`file: '${demoRelative}'`)) {
    errors.push(`专题示例未注册到 Docker 收集脚本: ${source}`);
  }
}

const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const packageLock = JSON.parse(fs.readFileSync(path.join(rootDir, 'package-lock.json'), 'utf8'));
const lockRoot = packageLock.packages?.[''];
if (packageLock.name !== packageJson.name || lockRoot?.name !== packageJson.name) {
  errors.push('package.json 与 package-lock.json 的项目名不一致');
}
if (JSON.stringify(lockRoot?.devDependencies || {}) !== JSON.stringify(packageJson.devDependencies || {})) {
  errors.push('package.json 与 package-lock.json 的 devDependencies 不一致，请运行 npm install');
}

const generatedFiles = walk(path.join(rootDir, 'demos'), (file) => {
  const name = path.basename(file);
  return file.endsWith('.class') || file.endsWith('.jar') || name === 'app';
});
for (const file of generatedFiles) errors.push(`不应提交编译产物: ${relative(file)}`);

const snapshotFiles = walk(path.join(rootDir, 'demos'), (file) => file.endsWith('.out.txt'));
for (const file of snapshotFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (!/^---\r?\n[\s\S]*?^status:\s*(verified|snapshot|documented|partial|unsupported|error|missing)\s*$/m.test(content)) {
    errors.push(`输出快照缺少可信状态: ${relative(file)}`);
  }
}

try {
  execFileSync(process.execPath, ['--check', path.join(scriptDir, 'run-docker-demos.js')], { stdio: 'pipe' });
} catch (error) {
  errors.push(`Docker 收集脚本语法错误: ${String(error.stderr || error.message).trim()}`);
}

const javascriptDemos = ['js', 'javascript'].flatMap(directory =>
  walk(path.join(rootDir, 'demos', directory), (file) => file.endsWith('.js')),
);
for (const file of javascriptDemos) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (error) {
    errors.push(`${relative(file)} 语法错误: ${String(error.stderr || error.message).trim()}`);
  }
}

const faviconPath = path.join(docsDir, 'public', 'favicon.svg');
if (!fs.existsSync(faviconPath)) errors.push('缺少 docs/public/favicon.svg');

if (errors.length > 0) {
  console.error(`项目检查失败（${errors.length} 项）：`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`项目检查通过：${markdownFiles.length} 篇文档，内部链接和 Docker 快照引用完整。`);
