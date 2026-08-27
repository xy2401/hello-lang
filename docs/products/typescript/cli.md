# TypeScript 编译与运行

TypeScript 编译器 `tsc` 负责类型检查并生成 JavaScript，生成物再交给 Node.js 或浏览器执行。TypeScript 本身不是独立运行时，本页不借助未经固定版本的即时执行包装器掩盖这层关系。

- [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [Node.js 命令行](https://nodejs.org/api/cli.html)

## 确认版本

```bash
tsc --version
node --version
```

如果项目通过包管理器固定了 TypeScript，应调用项目内编译器，而不是依赖全局 `tsc`。本页命令假定当前 Shell 已能解析正确版本。

## 编译并运行

`hello.ts`：

```typescript
const name: string = process.argv[2] ?? 'world'
console.log(`Hello, ${name}`)
```

```bash
tsc hello.ts --target ES2022 --module NodeNext --moduleResolution NodeNext --outDir dist
node dist/hello.js Alice
```

如果源码使用 Node.js 全局类型，项目需提供与运行时匹配的 Node 类型声明。编译器能生成 JavaScript 不代表目标运行时一定支持所用 API。

## 只做类型检查

```bash
tsc hello.ts --noEmit --strict
```

多个文件应把稳定选项写入 `tsconfig.json`，再执行：

```bash
tsc --project tsconfig.json
tsc --project tsconfig.json --noEmit
```

`--project` 不能与命令行源码文件同时使用。查看最终合并配置可运行 `tsc --showConfig`。

## 标准输入、参数与退出码

Node 参数位于 `process.argv`，脚本参数从索引 2 开始。需要返回失败状态时设置：

```typescript
if (!process.argv[2]) {
  console.error('usage: node dist/hello.js <name>')
  process.exitCode = 2
}
```

编译错误时 `tsc` 返回非零值；启用 `noEmitOnError` 可避免类型错误后仍更新生成物。模块加载错误通常来自 `module`、文件扩展名和 `package.json` 的 `type` 设置不一致。

资料核对日期：2026-08-28。
