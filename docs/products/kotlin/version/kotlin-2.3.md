# Kotlin 2.3

> **参考官方文档**：[Kotlin 官方发布说明](https://kotlinlang.org/docs/whatsnew23.html)  
> 本页依据正式 Release 与现有仓库版本证据，整理 Kotlin 2.3 的关键变化、兼容边界和升级检查。

## 版本定位

- **发布时间：** 2025 年 12 月
- **维护状态：** 截至 2026-08-27 的当前重要版本线
- **产品线：** Kotlin

## 核心变化

- 稳定嵌套类型别名和基于数据流的 `when` 穷尽检查
- Kotlin/JVM 支持 Java 25
- 改进 Swift Export、Kotlin/Wasm、Gradle 9 和标准库

## 兼容与迁移

- 升级编译器、Gradle 插件、Compose 编译器和 IDE 后检查兼容指南；多平台项目应分别验证 JVM、Native、JS 与 Wasm。

## 版本确认

不要根据安装包名称或容器标签推断实际版本，应在目标环境执行：

```bash
kotlinc -version
```

生产记录至少应包含完整版本输出、操作系统或运行时基线、架构，以及所用客户端或驱动版本。

## 官方资料

- [Kotlin 官方发布说明](https://kotlinlang.org/docs/whatsnew23.html)

资料核对日期：2026-08-27。
