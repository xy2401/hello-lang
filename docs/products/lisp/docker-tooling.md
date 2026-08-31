# Lisp Docker 验证证据

<DockerTooling product="lisp" />

Lisp 是聚合产品，证据目录同时覆盖四个真实运行时：SBCL 2.6.8、GNU Guile 3.0.11、Clojure 1.12.5 与 Racket 9.3。点击各输出组件可复制对应方言的一键复现命令。

当前提交的源码输出为 `snapshot`，容器清单为 `documented`。只有在 Docker 可用环境完整执行 `npm run collect-outputs` 后，收集器才会写入 `verified`、镜像摘要与工具清单。

