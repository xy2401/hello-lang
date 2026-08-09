# Python 基础语法全典

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> 本页面按照统一标准拆解 Python 基础语法结构：变量声明、数据类型、条件分支、集合循环、函数定义与类结构。

---

## 🐍 Python 基础语法示例源码 (`basic_demo.py`)

```python
# 4.1 结构化数据定义 (Class)
class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

    def get_info(self) -> str:
        return f"{self.name} ({self.age} years old)"

# 3.1 函数定义与参数 (Function)
def calculate_bonus(base: float, ratio: float = 0.1) -> float:
    return base * ratio

# 1.1 变量声明与常量
LANG: str = "Python"
# 1.2 基本数据类型
age: int = 25
salary: float = 8500.50
is_active: bool = True

print(f"Language: {LANG}")

# 2.1 条件分支
if is_active:
    print("Status: Active Worker")
else:
    print("Status: Inactive Worker")

# 2.2 集合与循环遍历
skills: list[str] = ["Dynamic Typing", "List Comprehension", "GIL"]
print("Skills:", " ".join(skills))

# 3.1 函数调用
bonus: float = calculate_bonus(salary, 0.1)
print(f"Calculated Bonus: ${bonus:.2f}")

# 4.1 实例化类
p = Person("Alice", age)
print("Person Info:", p.get_info())
```

<DockerOutput
  image="python:3.12-slim"
  sourceFile="demos/python/basic_demo.py"
/>
