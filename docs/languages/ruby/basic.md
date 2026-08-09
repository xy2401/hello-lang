# Ruby 基础语法全典

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> 本页面按照统一标准拆解 Ruby 基础语法结构：变量声明、数据类型、条件分支、集合循环、函数定义与类结构。

---

## 💎 Ruby 基础语法示例源码 (`basic_demo.rb`)

```ruby
# 4.1 结构化数据定义 (Class)
class Person
  attr_reader :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def get_info
    "#{@name} (#{@age} years old)"
  end
end

# 3.1 函数定义与参数 (Function)
def calculate_bonus(base, ratio = 0.1)
  base * ratio
end

# 1.1 变量声明与常量
LANG = "Ruby"
# 1.2 基本数据类型
age = 25
salary = 8500.50
is_active = true

puts "Language: #{LANG}"

# 2.1 条件分支
if is_active
  puts "Status: Active Worker"
else
  puts "Status: Inactive Worker"
end

# 2.2 集合与循环遍历
skills = ["Rails", "Blocks", "Metaprogramming"]
puts "Skills: #{skills.join(' ')}"

# 3.1 函数调用
bonus = calculate_bonus(salary, 0.1)
puts "Calculated Bonus: $#{format('%.2f', bonus)}"

# 4.1 实例化类
p = Person.new("Alice", age)
puts "Person Info: #{p.get_info}"
```

<DockerOutput
  image="ruby:3.3-alpine"
  sourceFile="demos/ruby/basic_demo.rb"
/>
