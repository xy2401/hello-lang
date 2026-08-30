# Clojure 依赖与包管理

Clojure 依赖通常来自 Maven Central、Clojars、Git 或本地目录。官方 Clojure CLI 使用 tools.deps 解析 `deps.edn`；Leiningen 仍广泛存在于遗留项目。官方资料见 [Deps and CLI Guide](https://clojure.org/guides/deps_and_cli)、[Clojure CLI Reference](https://clojure.org/reference/clojure_cli) 和 [tools.build Guide](https://clojure.org/guides/tools_build)。

## 演进与边界

早期可以直接把 `clojure.jar` 放入 classpath，但项目依赖很快需要自动解析。Leiningen 以 `project.clj` 整合依赖、任务和打包；官方 CLI 后来以数据化的 `deps.edn` 处理 classpath 与工具调用。tools.build 提供构建函数，但不是另一套仓库或运行时版本管理器。

运行时版本由 JDK 管理；Clojure CLI 是依赖解析入口；Clojure 语言本身是普通 Maven 依赖。混淆三者会导致“CLI 已升级但项目语言没变”的误判。

## tools.deps 与 deps.edn

```clojure
{:paths ["src" "resources"]
 :deps {org.clojure/clojure {:mvn/version "1.12.5"}
        org.clojure/data.json {:mvn/version "2.5.1"}}
 :aliases
 {:test {:extra-paths ["test"]}
  :build {:deps {io.github.clojure/tools.build
                 {:git/tag "v0.10.10" :git/sha "deedd62"}}
          :ns-default build}}}
```

优点是配置是普通 EDN、别名可组合、Maven 与 Git 依赖统一；限制是它主要解决 classpath 和工具调用，不直接提供 Leiningen 那种预设任务。`clojure -Stree`、`-Spath` 和 `-X:deps tree` 用于检查解析结果。

```bash
clojure -P
clojure -Stree
clojure -Spath
clojure -T:build jar
```

## Leiningen

```clojure
(defproject hello "0.1.0"
  :dependencies [[org.clojure/clojure "1.12.5"]
                 [org.clojure/data.json "2.5.1"]]
  :main hello.core)
```

Leiningen 的优势是任务、插件和 uberjar 工作流成熟；缺点是配置与 tools.deps 不直接互换，插件还会形成第二套依赖图。已有稳定 Leiningen 项目无需为了追新迁移；新项目可优先选择官方 CLI 与 tools.build。

```bash
lein deps :tree
lein test
lein uberjar
```

## 锁定、缓存和安全

Clojure CLI 默认没有 npm 风格的完整 lockfile。可复现性来自固定 Maven 版本、Git SHA、受控仓库和预取结果；动态版本或只写 Git tag 都不够。Maven 缓存位于 `~/.m2/repository`，Git deps 与 tools.deps 还有各自缓存。缓存可加速离线构建，但不是完整性证明。

```bash
clojure -P -M:test
clojure -Stree
find ~/.m2/repository/org/clojure -type f -name '*.jar'
```

使用 Maven/Clojars checksum、固定 Git SHA 和企业代理仓库校验来源。漏洞检查可接入 OWASP Dependency-Check、GitHub Advisory 或仓库扫描，再用依赖树确认传递路径。升级应先改一个坐标，执行测试并比较 `-Stree`，不要同时清空缓存掩盖解析差异。

## 选择建议

- 新项目和库：Clojure CLI、`deps.edn`、tools.build，固定版本与 Git SHA。
- 成熟 Leiningen 应用：保留 `project.clj`，优先升级依赖而不是同步迁移构建系统。
- 单文件探索：可用 `-Sdeps` 临时声明，但最终配置应回到项目文件。
- 发布库：明确 Maven/Clojars 坐标、签名和仓库权限，不依赖本机缓存。

两套方案各有优点和缺点；选择取决于已有插件、团队工作流和发布方式。无论使用哪套，都必须记录依赖树、完整性、缓存、漏洞检查和受控升级方式。

资料核对日期：2026-08-28。
