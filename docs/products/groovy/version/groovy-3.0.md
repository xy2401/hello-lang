# Groovy 3.0

**官方资料**：[Apache Groovy 3 release notes](https://groovy-lang.org/releasenotes/groovy-3.0.html)。

发布信息：Groovy 3.0 于 2020 年正式发布，引入 Parrot parser，使 lambda、方法引用等现代 Java 风格语法进入 Groovy。

## 迁移影响

从 2.x 迁移需检查旧解析器边缘语法、JDK 基线、Gradle/Jenkins 内置版本和第三方 AST transformation。先运行编译与测试，再处理语法现代化。

```bash
groovyc --version
```

资料核对日期：2026-08-27。
