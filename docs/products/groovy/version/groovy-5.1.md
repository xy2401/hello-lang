# Groovy 5.1

**官方资料**：[Apache Groovy 5.1 下载与变更入口](https://groovy.apache.org/download.html)。

发布信息：5.1.0 于 2026-08 正式发布，是面向 JDK 11+ 的当前稳定线。该版本继续整理 Groovy 5 的语言与类型检查能力，并保持 Java 互操作、脚本和静态编译路径。

## 迁移影响

从 4.x/5.0 迁移时先升级 Gradle、Spock、AST transformation 和编译插件，再检查动态元编程与静态类型检查差异。不要直接替换 Jenkins 内置 Groovy。

```bash
groovy --version
groovyc --version
```

资料核对日期：2026-08-27。
