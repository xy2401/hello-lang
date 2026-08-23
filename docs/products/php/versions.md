# PHP 版本演进

PHP 采用每年 11 月发布一个主特性版本的模式，受支持版本享有 3 年官方维护。从 PHP 7.0 到 8.x，PHP 实现了从弱类型动态胶水到高性能强类型面向对象语言的蜕变。

## 核心版本演进与关键里程碑

### PHP 8.4（2024 年 11 月）

**主要功能与架构演进：**

- 属性钩子（Property Hooks）：原生支持 `get` 与 `set` 访问器逻辑，减少冗余样板代码
- 非对称可见性（Asymmetric Visibility）：支持公共读取私有写入（`public private(set)`）
- 支持 `new MyClass()->method()` 链式直接调用（无需外层包裹括号）

**工程影响与选型建议：**

> 面向对象语法简洁性看齐 Swift 与 Kotlin。

### PHP 8.3（2023 年 11 月）

**主要功能与架构演进：**

- 类型化类常量（Typed Class Constants）
- 动态类常量获取语法（`ClassName::{$constantName}`）
- 引入 `#[Override]` 注解明确标注重写父类方法

**工程影响与选型建议：**

> 类型系统与静态分析工具友好度进一步增强。

### PHP 8.0（2020 年 11 月）

**主要功能与架构演进：**

- 引入 JIT（即时编译器）
- 命名参数（Named Arguments）、联合类型（Union Types `int|string`）、Match 表达式
- 构造器属性提升（Constructor Property Promotion）与注解（Attributes `#[Attr]`）

**工程影响与选型建议：**

> 现代 PHP 8 世代的绝对奠基版本。

### PHP 7.0（2015 年 12 月）

**主要功能与架构演进：**

- 基于全新的 PHPNG（Next Generation）重写底层 Zend VM 核心，执行性能提升高达 2x~3x，内存减半
- 引入标量类型声明（Scalar Type Hints）与返回值类型声明（Return Types）
- 引入空合并操作符（`??`）与太空船操作符（`<=>`）

**工程影响与选型建议：**

> 彻底拯救了 PHP 性能声誉的划时代转折点。

## 升级实战
- 升级至 PHP 8.x 时，需特别注意弱类型比较（如 `0 == "foo"` 在 PHP 8.0 中变更为 false）引发的旧代码隐患。
