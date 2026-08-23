# C++ 基础语法

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> 本页面按照统一标准拆解 C++ 基础语法结构：变量声明、数据类型、条件分支、集合循环、函数定义与类结构。

---

## ⚡ C++ 基础语法示例源码 (`basic_demo.cpp`)

```cpp
#include <iostream>
#include <vector>
#include <string>

// 4.1 结构化数据定义 (Class)
class Person {
private:
    std::string name;
    int age;
public:
    Person(std::string n, int a) : name(n), age(a) {}
    std::string getInfo() const {
        return name + " (" + std::to_string(age) + " years old)";
    }
};

// 3.1 函数定义与参数 (Function)
double calculateBonus(double base, double ratio = 0.1) {
    return base * ratio;
}

int main() {
    // 1.1 变量声明与常量
    const std::string lang = "C++";
    // 1.2 基本数据类型
    int age = 25;
    double salary = 8500.50;
    bool isActive = true;

    std::cout << "Language: " << lang << std::endl;

    // 2.1 条件分支
    if (isActive) {
        std::cout << "Status: Active Worker" << std::endl;
    } else {
        std::cout << "Status: Inactive Worker" << std::endl;
    }

    // 2.2 集合与循环遍历
    std::vector<std::string> skills = {"RAII", "Pointers", "Templates"};
    std::cout << "Skills: ";
    for (const auto& skill : skills) {
        std::cout << skill << " ";
    }
    std::cout << std::endl;

    // 3.1 函数调用
    double bonus = calculateBonus(salary, 0.1);
    std::cout << "Calculated Bonus: $" << bonus << std::endl;

    // 4.1 实例化类
    Person p("Alice", age);
    std::cout << "Person Info: " << p.getInfo() << std::endl;

    return 0;
}
```

<DockerOutput
  image="gcc:13"
  sourceFile="demos/cpp/basic_demo.cpp"
/>
