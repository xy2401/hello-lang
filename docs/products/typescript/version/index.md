# TypeScript 版本演进

TypeScript 是 JavaScript 的强类型超集。5.x 世代全面拥抱 ECMAScript 标准 Decorators 并通过架构重构实现了编译性能的成倍提升。

## 版本索引

### [TypeScript 6.0](./typescript-6.0)

- **发布时间：** 2026 年 8 月
- **版本重点：** 作为迈向原生 TypeScript 7 编译器的过渡版本。

### [TypeScript 5.6](./typescript-5.6)

- **发布时间：** 2024 年 9 月
- **版本重点：** 严格真值表达式检查（Disallowed Nullish and Truthy Checks）：防止在 if (/pattern/) 或 if (true) 等恒真/恒假条件中出现语法误判。

### [TypeScript 5.0](./typescript-5.0)

- **发布时间：** 2023 年 3 月
- **版本重点：** 全面对齐 Stage 3 ECMAScript Decorators 装饰器标准，无需配置 experimentalDecorators。

### [TypeScript 4.0](./typescript-4.0)

- **发布时间：** 2020 年 8 月
- **版本重点：** 变长元组类型（Variadic Tuple Types）与标记元组元素（Labeled Tuple Elements）。

### [TypeScript 3.7](./typescript-3.7)

- **发布时间：** 2019 年 11 月
- **版本重点：** 原生支持可选链（Optional Chaining ?.）与空值合并（Nullish Coalescing ??）。

## 升级配置建议
- 升级到 5.x 时，可在 `tsconfig.json` 中启用 `"moduleResolution": "bundler"` 以享受与 Vite/Webpack 5 最佳契合的现代模块解析体验。
