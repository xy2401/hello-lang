# Java 基础语法与 Hello World 全典

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> 本页面按照统一标准拆解 Java 基础语法结构：变量声明、数据类型、条件分支、集合循环、函数定义与类结构。

---

## ☕ Java 基础语法示例源码 (`BasicDemo.java`)

```java
import java.util.*;

// 4.1 结构化数据定义 (Class)
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getInfo() {
        return name + " (" + age + " years old)";
    }
}

public class BasicDemo {
    // 3.1 函数定义与参数 (Function)
    public static double calculateBonus(double base, double ratio) {
        return base * ratio;
    }

    public static void main(String[] args) {
        // 1.1 变量声明与常量
        final String lang = "Java";
        // 1.2 基本数据类型
        int age = 25;
        double salary = 8500.50;
        boolean isActive = true;

        System.out.println("Language: " + lang);

        // 2.1 条件分支
        if (isActive) {
            System.out.println("Status: Active Worker");
        } else {
            System.out.println("Status: Inactive Worker");
        }

        // 2.2 集合与循环遍历
        List<String> skills = Arrays.asList("OOP", "Concurrency", "JVM");
        System.out.print("Skills: ");
        for (String skill : skills) {
            System.out.print(skill + " ");
        }
        System.out.println();

        // 3.1 函数调用
        double bonus = calculateBonus(salary, 0.1);
        System.out.println("Calculated Bonus: $" + bonus);

        // 4.1 实例化类
        Person p = new Person("Alice", age);
        System.out.println("Person Info: " + p.getInfo());
    }
}
```

<DockerOutput
  image="eclipse-temurin:21-jdk-alpine"
  sourceFile="demos/java/BasicDemo.java"
/>
