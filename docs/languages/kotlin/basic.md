# Kotlin 基础语法全典

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> 本页面按照统一标准拆解 Kotlin 基础语法结构：变量声明、数据类型、条件分支、集合循环、函数定义与类结构。

---

## 🟣 Kotlin 基础语法示例源码 (`basic_demo.kt`)

```kotlin
// 4.1 结构化数据定义 (Class)
class Person(val name: String, val age: Int) {
    fun getInfo(): String = "$name ($age years old)"
}

// 3.1 函数定义与参数 (Function)
fun calculateBonus(base: Double, ratio: Double = 0.1): Double = base * ratio

fun main() {
    // 1.1 变量声明与常量
    val lang: String = "Kotlin"
    // 1.2 基本数据类型
    val age: Int = 25
    val salary: Double = 8500.50
    val isActive: Boolean = true

    println("Language: $lang")

    // 2.1 条件分支
    if (isActive) {
        println("Status: Active Worker")
    } else {
        println("Status: Inactive Worker")
    }

    // 2.2 集合与循环遍历
    val skills = listOf("Coroutines", "Null Safety", "Extension Functions")
    println("Skills: ${skills.joinToString(" ")}")

    // 3.1 函数调用
    val bonus = calculateBonus(salary, 0.1)
    println("Calculated Bonus: $${String.format("%.2f", bonus)}")

    // 4.1 实例化类
    val p = Person("Alice", age)
    println("Person Info: ${p.getInfo()}")
}
```

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/kotlin/basic_demo.kt"
/>
