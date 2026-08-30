# Groovy 2.4

**官方资料**：[Apache Groovy 2.4 release notes](https://groovy-lang.org/releasenotes/groovy-2.4.html)。

发布信息：Groovy 2.4 于 2015 年发布，是许多旧版 Gradle、Jenkins 和企业脚本仍可见的历史主线，目前不应作为新项目默认版本。

## 迁移影响

迁移重点是旧 JDK、`org.codehaus.groovy` 坐标、插件绑定和动态行为回归。先识别宿主工具控制的版本，再规划 3.x、4.x 或 5.x 路线。

```bash
groovy -e 'println GroovySystem.version'
```

资料核对日期：2026-08-27。
