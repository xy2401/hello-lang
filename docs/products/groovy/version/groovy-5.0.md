# Groovy 5.0

**官方资料**：[Apache Groovy 5.0 release notes](https://groovy-lang.org/releasenotes/groovy-5.0.html)。

发布信息：Groovy 5.0 于 2025 年进入正式稳定线，提升语言一致性、类型检查和现代 JDK 支持，随后由 5.1 稳定线接替。

## 迁移影响

迁移前检查已弃用 API、解析器差异、AST transformation 和构建插件支持。应用依赖与 Gradle 内置 Groovy 必须分开升级。

```bash
groovy -e 'println GroovySystem.version'
```

资料核对日期：2026-08-27。
