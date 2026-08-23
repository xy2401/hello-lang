# TypeScript 版本演进

TypeScript 是 JavaScript 的强类型超集。5.x 世代全面拥抱 ECMAScript 标准 Decorators 并通过架构重构实现了编译性能的成倍提升。

## 核心版本演进与关键里程碑

### TypeScript 5.6（2024 年 9 月）

**主要功能与架构演进：**

- 严格真值表达式检查（Disallowed Nullish and Truthy Checks）：防止在 `if (/pattern/)` 或 `if (true)` 等恒真/恒假条件中出现语法误判
- 全面支持原生 Iterator 辅助方法类型（`Iterator.prototype.map / filter / take`）

**工程影响与选型建议：**

> 进一步杜绝 JavaScript 常见逻辑隐患。

### TypeScript 5.0（2023 年 3 月）

**主要功能与架构演进：**

- 全面对齐 Stage 3 ECMAScript Decorators 装饰器标准，无需配置 `experimentalDecorators`
- `const` 类型参数修饰符（`const T`）：自动为泛型实参推导最精确的字面量元组类型
- 编译器代码库从命名空间全面重构为标准 ES 模块，体积缩减 37%，打包与解析提速高达 2x

**工程影响与选型建议：**

> TypeScript 历史上最大规模的代码重构与性能飞跃。

### TypeScript 4.0（2020 年 8 月）

**主要功能与架构演进：**

- 变长元组类型（Variadic Tuple Types）与标记元组元素（Labeled Tuple Elements）
- 构造函数属性推导与类属性操作符增强

**工程影响与选型建议：**

> 奠定了现代化高阶泛型类型编程基础。

### TypeScript 3.7（2019 年 11 月）

**主要功能与架构演进：**

- 原生支持可选链（Optional Chaining `?.`）与空值合并（Nullish Coalescing `??`）
- 断言函数类型签名（`asserts condition`）

**工程影响与选型建议：**

> 彻底改变了前端日常防御性代码编写体验。

## 升级配置建议
- 升级到 5.x 时，可在 `tsconfig.json` 中启用 `"moduleResolution": "bundler"` 以享受与 Vite/Webpack 5 最佳契合的现代模块解析体验。
