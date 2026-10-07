# Python：公共 Docker 采集试点

状态：**待首次 Actions 验证**。此页不替代[原有 Docker 证据](./docker-tooling)。

## 场景与边界

使用 `PYTHON_3_12_SLIM_IMAGE` 的固定 digest，只读挂载 `demos/python/basic_demo.py`。断言语言名称、奖金计算和对象输出。此容器是 **Python 3.12**，与浏览器实验台的 Python 3.14 分别标注；不会自动升级既有镜像锁。

## 本地查看计划

```powershell
npm run docker:check
npm run docker:plan -- --shell powershell
```

先获取独立的 [hello-docker 工具仓库](https://github.com/xy2401/hello-docker/tree/codex/hello-docker)，将 `HELLO_DOCKER_HOME` 设置为该仓库的绝对路径，再在 hello-lang 仓库根目录执行以上命令。这两个入口只检查配置和生成计划。

## Actions 执行与回写

发布公共工具后，在 `collect-docker-pilot.yml` 手动输入其完整 40 位提交 SHA。成功结果写入 `demos/python/docker-pilot/` 并生成本页，原采集结果保留。

普通代码推送不会触发容器采集。失败日志作为 Artifact 保留，不发布失败结果。
