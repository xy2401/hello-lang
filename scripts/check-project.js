import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const docsDir = path.join(rootDir, 'docs');
const errors = [];

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
}
checkLinks(path.join(rootDir, 'README.md'), fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8'));

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
  if (!/^---\r?\n[\s\S]*?^status:\s*(verified|snapshot|error|missing)\s*$/m.test(content)) {
    errors.push(`输出快照缺少可信状态: ${relative(file)}`);
  }
}

try {
  execFileSync(process.execPath, ['--check', path.join(scriptDir, 'run-docker-demos.js')], { stdio: 'pipe' });
} catch (error) {
  errors.push(`Docker 收集脚本语法错误: ${String(error.stderr || error.message).trim()}`);
}

const javascriptDemos = walk(path.join(rootDir, 'demos', 'js'), (file) => file.endsWith('.js'));
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
