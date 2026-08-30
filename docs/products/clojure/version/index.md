# Clojure 版本演进

Clojure 以兼容性和渐进演进为主，语言、Clojure CLI 与 JVM 是三条独立版本线。项目应在 `deps.edn` 中固定语言版本，同时单独记录 CLI 与 JDK 基线。

- [Clojure 1.12](./clojure-1.12)：Java 互操作、函数接口与工具链继续演进。
- [Clojure 1.11](./clojure-1.11)：新增关键字参数替代形式与多项库能力。
- [Clojure 1.10](./clojure-1.10)：错误报告和 Java 互操作改进。
- [Clojure 1.8](./clojure-1.8)：直接链接、字符串函数与平台能力的重要历史基线。

选择新项目基线时优先使用当前维护版本；迁移旧项目时先升级 JDK 和依赖，再单独调整 Clojure 语言坐标，避免把三类变化混在一次提交中。
