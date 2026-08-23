#!/usr/bin/env node
import fs from 'node:fs';import path from 'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const expected=['cpp','csharp','css','go','html','java','javascript','kotlin','php','python','ruby','rust','typescript'];
const source=fs.readFileSync(path.join(root,'docs/.vitepress/theme/data/dockerCatalog.ts'),'utf8');
const ids=[...source.matchAll(/(?:\bid:\s*|builderRuntime\()\s*['"]([^'"]+)['"]/g)].map(m=>m[1]);const failures=[];
for(const declaration of['DockerImageRef','DockerCatalogEntry','DockerEvidenceStatus'])if(!source.includes(`interface ${declaration}`)&&!source.includes(`type ${declaration}`))failures.push(`missing unified type ${declaration}`);
for(const id of expected)if(!ids.includes(id))failures.push(`catalog missing ${id}`);for(const id of ids)if(!expected.includes(id))failures.push(`unknown catalog id ${id}`);
if(new Set(ids).size!==ids.length)failures.push('duplicate catalog id');if(/(?:^|:)latest(?:$|[@,\s])|:edge|:nightly/.test(source))failures.push('floating image tag in catalog');
for(const id of expected)for(const kind of['inventory','session','assert']){const file=path.join(root,'demos',id,'docker',`${kind}.out.txt`);if(!fs.existsSync(file))failures.push(`missing ${id}/docker/${kind}.out.txt`);else if(!/^---\r?\n[\s\S]*?status:\s*(verified|documented|partial|unsupported)/m.test(fs.readFileSync(file,'utf8')))failures.push(`invalid evidence metadata ${id}/${kind}`)}
if(!fs.existsSync(path.join(root,'docs/matrix/docker-tools.md')))failures.push('missing Docker matrix');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}console.log(`[docker-catalog] ${expected.length} language products covered; verified requires pinned snapshots`);
