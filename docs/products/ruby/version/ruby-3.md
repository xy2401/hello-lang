# Ruby 3.3

<script setup>
import { getOutput, getTimeMs } from '../../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [Ruby 3.3.0 Release Notes](https://www.ruby-lang.org/en/news/2023/12/25/ruby-3-3-0-released/)  
> Ruby 3.3 代表了 Ruby 社区 "Ruby 3x3" (比 Ruby 2.0 快3倍) 目标的最高成就。它引进了全新的 **Prism 解析器**、默认启用的 **YJIT (Yet Another JIT)** 以及不可变数据结构 `Data.define`。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `ruby:3.3-alpine` 中执行控制台诊断指令 `ruby -v`：

<DockerOutput
  image="ruby:3.3-alpine"
  sourceFile="demos/ruby/env.out"
/>

---

## 1. 🛡️ `Data.define` 不可变数据对象 (Ruby 3.2+)
轻量级的内置不可变数据载体，取代了容易被意外修改的旧 `Struct`。

```ruby
# 关联源码: demos/ruby/ruby3_demo.rb
User = Data.define(:id, :name, :role)
user = User.new(id: 101, name: "Alice", role: "admin")
```

---

## 2. 🔀 Pattern Matching 模式匹配 (Ruby 3.0+)
在 `case ... in` 表达式中对 Hash 或 Array 进行强力结构解构。

```ruby
access_level = case user
in { role: "admin" }
  "Full Administrator"
else
  "Guest"
end
```

<DockerOutput
  image="ruby:3.3-alpine"
  sourceFile="demos/ruby/ruby3_demo.rb"
/>

## 版本信息与迁移

- **发布时间 / 标准时间：** 2020 年 12 月
- **维护状态：** 截至 2026-08-27，以页面所链接的官方生命周期或规范状态为准
- **运行时或平台基线：** Ruby 解释器、RubyGems/Bundler、原生扩展与框架支持范围

**迁移影响：** 先处理语法、关键字参数、标准库 gem 化和 C 扩展兼容性，再重新解析依赖并运行测试与性能基线。

## 版本确认

```bash
ruby --version
gem --version
```

资料核对日期：2026-08-27。
