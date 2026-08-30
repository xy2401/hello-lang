# Groovy 4.0

**官方资料**：[Apache Groovy 4 release notes](https://groovy-lang.org/releasenotes/groovy-4.0.html)。

发布信息：Groovy 4.0 于 2022 年正式发布，模块坐标从 `org.codehaus.groovy` 迁移到 `org.apache.groovy`，并继续扩展语言和类型系统。

## 迁移影响

升级时必须替换 Maven/Gradle 坐标，检查 Spock 和插件是否使用同一 Groovy 主线，并清除由旧坐标残留造成的双运行时。

```bash
./gradlew dependencyInsight --dependency groovy
```

资料核对日期：2026-08-27。
