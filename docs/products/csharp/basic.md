# C# 基础语法

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> 本页面按照统一标准拆解 C# 基础语法结构：变量声明、数据类型、条件分支、集合循环、函数定义与类结构。

---

## 🔷 C# 基础语法示例源码 (`BasicDemo.cs`)

```csharp
using System;
using System.Collections.Generic;

namespace BasicSyntaxDemo
{
    // 4.1 结构化数据定义 (Class)
    public class Person
    {
        public string Name { get; }
        public int Age { get; }

        public Person(string name, int age)
        {
            Name = name;
            Age = age;
        }

        public string GetInfo() => $"{Name} ({Age} years old)";
    }

    public class Program
    {
        // 3.1 函数定义与参数 (Function)
        public static double CalculateBonus(double baseVal, double ratio = 0.1) => baseVal * ratio;

        public static void Main()
        {
            // 1.1 变量声明与常量
            const string lang = "C#";
            // 1.2 基本数据类型
            int age = 25;
            double salary = 8500.50;
            bool isActive = true;

            Console.WriteLine($"Language: {lang}");

            // 2.1 条件分支
            if (isActive) {
                Console.WriteLine("Status: Active Worker");
            } else {
                Console.WriteLine("Status: Inactive Worker");
            }

            // 2.2 集合与循环遍历
            var skills = new List<string> { "LINQ", "ASP.NET Core", "Entity Framework" };
            Console.WriteLine("Skills: " + string.Join(" ", skills));

            // 3.1 函数调用
            double bonus = CalculateBonus(salary, 0.1);
            Console.WriteLine($"Calculated Bonus: ${bonus:F2}");

            // 4.1 实例化类
            var p = new Person("Alice", age);
            Console.WriteLine("Person Info: " + p.GetInfo());
        }
    }
}
```

<DockerOutput
  image="mcr.microsoft.com/dotnet/sdk:8.0-alpine"
  sourceFile="demos/csharp/BasicDemo.cs"
/>
