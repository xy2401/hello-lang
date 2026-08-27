# Kotlin 2.0

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Kotlin 2.0.0 Released](https://kotlinlang.org/docs/whatsnew20.html)  
> Kotlin 2.0 默认使用 **K2 编译器**，并改进了智能类型转换与密封接口支持。

---

## 🐳 容器运行环境 (Runtime Environment)

在固定版本 Docker 镜像 `croquiscom/kotlin-base:2.0.10` 中执行 Kotlin 编译器诊断：

<DockerOutput
  image="croquiscom/kotlin-base:2.0.10"
  sourceFile="demos/kotlin/env.out"
/>

---

## 1. 🧠 Smart Casts 2.0 (更智能的类型转换)
K2 编译器大大拓展了自动 Smart Cast 的上下文判别能力，在 `when` 逻辑分支和 `is` 检查后无需显式强转。

```kotlin
// 关联源码: demos/kotlin/kotlin2_demo.kt
sealed interface UserStatus {
    data class Active(val lastLogin: String) : UserStatus
    object Maintenance : UserStatus
}

val statusMsg = when (val s = user.status) {
    is UserStatus.Active -> "Active since ${s.lastLogin}"
    UserStatus.Maintenance -> "Under Maintenance"
}
```

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/kotlin/kotlin2_demo.kt"
/>

## 版本信息与迁移

- **发布时间 / 标准时间：** 2024 年 5 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** Kotlin 编译器、K2 前端、目标 JVM/JS/Native 平台与 Gradle 插件

**迁移影响：** 升级编译器和构建插件后，处理语言兼容警告、弃用 API、元数据与 KSP/KAPT 插件兼容性，并在所有目标平台重新构建测试。

## 版本确认

```bash
kotlinc -version
java --version
```

资料核对日期：2026-08-27。
