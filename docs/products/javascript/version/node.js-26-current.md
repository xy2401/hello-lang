# Node.js 26 Current

> **参考官方文档**：[JavaScript / Node.js 官方发布说明](https://nodejs.org/en/blog)  
> 本页依据正式 Release 与现有仓库版本证据，整理 Node.js 26 Current 的关键变化、兼容边界和升级检查。

## 版本定位

- **发布时间：** 2026 年 4 月
- **维护状态：** 历史版本或兼容基线；实际维护状态以官方页面为准
- **产品线：** JavaScript / Node.js

## 核心变化

- 作为当前功能版本交付新的 V8 与平台 API
- 不属于截止日期时的 LTS 线
- 适合提前验证下一轮运行时与工具链兼容

## 兼容与迁移

- 生产长期维护默认仍选择 Node.js 24 LTS；采用 Current 必须接受更短支持窗口并持续跟进次版本。

## 版本确认

不要根据安装包名称或容器标签推断实际版本，应在目标环境执行：

```bash
node --version
```

生产记录至少应包含完整版本输出、操作系统或运行时基线、架构，以及所用客户端或驱动版本。

## 官方资料

- [JavaScript / Node.js 官方发布说明](https://nodejs.org/en/blog)

资料核对日期：2026-08-27。
