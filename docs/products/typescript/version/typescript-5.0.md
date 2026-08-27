# TypeScript 5.0

> **参考官方文档**：[TypeScript 官方发布说明](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)  
> 本页依据正式 Release 与现有仓库版本证据，整理 TypeScript 5.0 的关键变化、兼容边界和升级检查。

## 版本定位

- **发布时间：** 2023 年 3 月
- **维护状态：** 历史版本或兼容基线；实际维护状态以官方页面为准
- **产品线：** TypeScript

## 核心变化

**主要功能与架构演进：**

- 全面对齐 Stage 3 ECMAScript Decorators 装饰器标准，无需配置 `experimentalDecorators`
- `const` 类型参数修饰符（`const T`）：自动为泛型实参推导最精确的字面量元组类型
- 编译器代码库从命名空间全面重构为标准 ES 模块，体积缩减 37%，打包与解析提速高达 2x

**工程影响与选型建议：**

> TypeScript 历史上最大规模的代码重构与性能飞跃。

## 兼容与迁移

- 同时更新编译器或运行时、包管理器、构建镜像与 CI，不只修改本机版本。
- 先处理弃用警告，再验证依赖、代码生成器、原生扩展和目标平台。
- 在新旧基线分别运行测试，明确产物的最低运行时与语言版本。

## 版本确认

不要根据安装包名称或容器标签推断实际版本，应在目标环境执行：

```bash
tsc --version
```

生产记录至少应包含完整版本输出、操作系统或运行时基线、架构，以及所用客户端或驱动版本。

## 官方资料

- [TypeScript 官方发布说明](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)

资料核对日期：2026-08-27。
