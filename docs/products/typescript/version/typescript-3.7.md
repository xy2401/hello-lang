# TypeScript 3.7

> **参考官方文档**：[TypeScript 官方发布说明](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)  
> 本页依据正式 Release 与现有仓库版本证据，整理 TypeScript 3.7 的关键变化、兼容边界和升级检查。

## 版本定位

- **发布时间：** 2019 年 11 月
- **维护状态：** 历史版本或兼容基线；实际维护状态以官方页面为准
- **产品线：** TypeScript

## 核心变化

**主要功能与架构演进：**

- 原生支持可选链（Optional Chaining `?.`）与空值合并（Nullish Coalescing `??`）
- 断言函数类型签名（`asserts condition`）

**工程影响与选型建议：**

> 彻底改变了前端日常防御性代码编写体验。

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
