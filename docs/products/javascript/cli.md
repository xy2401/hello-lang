# JavaScript 编译与运行

JavaScript 源码通常直接由 Node.js 或浏览器执行。Node.js CLI 可运行文件、表达式、标准输入和交互 REPL；本页不展开 npm 脚本、打包器或前端工程构建。

- [Node.js CLI](https://nodejs.org/api/cli.html)
- [Node.js REPL](https://nodejs.org/api/repl.html)
- [ECMAScript Modules](https://nodejs.org/api/esm.html)

## 确认运行时

```bash
node --version
node -p "process.execPath"
node -p "process.versions"
```

`process.execPath` 能确认实际启动的 Node.js 路径，适合排查版本管理器和 PATH 冲突。

## 执行文件与表达式

`hello.mjs`：

```javascript
const name = process.argv[2] ?? 'world'
console.log(`Hello, ${name}`)
```

```bash
node hello.mjs Alice
node --eval "console.log(2 + 3)"
node --print "JSON.stringify(process.versions)"
```

`.mjs` 明确使用 ES module。`.js` 的模块类型受最近一层 `package.json` 的 `type` 字段影响，不要靠试错混用 `require` 与 `import`。

## REPL 与标准输入

```bash
node
```

REPL 中可直接输入表达式，使用 `.help` 查看命令、`.exit` 退出。让 Node 执行标准输入：

```bash
printf "console.log('stdin')\n" | node
node --input-type=module < script.js
```

## 参数、环境和退出码

```javascript
const [name = 'world'] = process.argv.slice(2)
const mode = process.env.APP_MODE ?? 'development'

if (!name.trim()) {
  console.error('name is required')
  process.exitCode = 2
}

console.log({ name, mode })
```

Shell 中可临时设置 `APP_MODE`，但语法在 POSIX Shell、CMD 和 PowerShell 间不同。跨平台文档应分别写清楚，不拼成一条看似通用的命令。

语法检查可运行 `node --check hello.mjs`。未捕获异常与未处理的启动错误会返回非零状态；不要只依据日志文本判断执行成功。

资料核对日期：2026-08-28。
