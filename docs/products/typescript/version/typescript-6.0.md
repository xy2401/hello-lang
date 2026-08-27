# TypeScript 6.0

> **参考官方文档**：[TypeScript 官方发布说明](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)  
> 本页依据正式 Release 与现有仓库版本证据，整理 TypeScript 6.0 的关键变化、兼容边界和升级检查。

## 版本定位

- **发布时间：** 2026 年 8 月
- **维护状态：** 截至 2026-08-27 的当前重要版本线
- **产品线：** TypeScript

## 核心变化

- 作为迈向原生 TypeScript 7 编译器的过渡版本
- 默认收紧 `rootDir`、`types`、严格模式和模块互操作等配置
- 弃用或移除 `outFile`、旧模块解析、ES5 目标等历史选项

## 兼容与迁移

- 先使用官方迁移工具和弃用诊断清理 `tsconfig`；特别检查模块加载、全局类型、输出目录与旧构建链。

## 版本确认

不要根据安装包名称或容器标签推断实际版本，应在目标环境执行：

```bash
tsc --version
```

生产记录至少应包含完整版本输出、操作系统或运行时基线、架构，以及所用客户端或驱动版本。

## 官方资料

- [TypeScript 官方发布说明](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)

资料核对日期：2026-08-27。
