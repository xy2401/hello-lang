import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productsRoot = path.join(root, 'docs', 'products');
const sidebar = fs.readFileSync(path.join(root, 'docs', '.vitepress', 'config.ts'), 'utf8');
const failures = [];
const movedOutside = /^(?:c-(?:89|99|11|17|23)|cpp-(?:11|20|23)|dotnet-8|css3|modern-css|pre-css3|go-(?:118|122)|html5|modern-html|pre-html5|es6|modern-javascript|node-(?:14|16|18|20|22)|pre-es6|kotlin-2|php-8|py-(?:38|310|312)|ruby-3|edition-(?:2018|2021))\.md$/;

for (const entry of fs.readdirSync(productsRoot, { withFileTypes: true }).filter(entry => entry.isDirectory())) {
  const product = entry.name;
  const productDir = path.join(productsRoot, product);
  const legacyIndex = path.join(productDir, 'versions.md');
  if (fs.existsSync(legacyIndex)) failures.push(`${product}: 仍残留旧 versions.md`);
  const leftovers = fs.readdirSync(productDir).filter(name => movedOutside.test(name));
  if (leftovers.length) failures.push(`${product}: 产品根目录仍有版本页 ${leftovers.join(', ')}`);
  const versionDir = path.join(productDir, 'version');
  const indexFile = path.join(versionDir, 'index.md');
  if (!fs.existsSync(indexFile)) { failures.push(`${product}: 缺少 version/index.md`); continue; }
  const index = fs.readFileSync(indexFile, 'utf8').replace(/\r\n/g, '\n');
  const pages = fs.readdirSync(versionDir).filter(name => name.endsWith('.md') && name !== 'index.md');
  if (!pages.length) failures.push(`${product}: version 目录没有独立版本页`);
  for (const name of pages) {
    const slug = name.slice(0, -3);
    const route = `/products/${product}/version/${slug}`;
    const content = fs.readFileSync(path.join(versionDir, name), 'utf8').replace(/\r\n/g, '\n');
    if (!index.includes(`](./${slug})`)) failures.push(`${product}: 总览未引用 ${name}`);
    if (!sidebar.includes(route)) failures.push(`${product}: 侧栏未引用 ${route}`);
    if (!/官方/.test(content)) failures.push(`${product}/${name}: 缺少官方资料`);
    if (!/https:\/\//.test(content)) failures.push(`${product}/${name}: 缺少官方来源链接`);
    if (!/发布时间|发布日期|标准时间|标准状态|覆盖时期|发布信息/.test(content)) failures.push(`${product}/${name}: 缺少版本或发布时间信息`);
    if (!/迁移/.test(content)) failures.push(`${product}/${name}: 缺少迁移影响`);
    if (!/资料核对日期：2026-08-27/.test(content)) failures.push(`${product}/${name}: 缺少统一核对日期`);
  }
}

if (failures.length) { console.error(failures.map(item => `❌ ${item}`).join('\n')); process.exit(1); }
console.log('版本资料检查通过。');
