# Kotlin 2.0 官方 Release Notes 深度拆解大典

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Kotlin 2.0.0 Released](https://kotlinlang.org/docs/whatsnew20.html)  
> Kotlin 2.0 是 JetBrains 团队划时代的里程碑版本。它全面默认启用了全新的 **K2 编译器**，编译速度提升 2 倍，并带来了 **Smart Casts 2.0 (智能类型转换)** 与改进的 **Sealed Interfaces**。

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
