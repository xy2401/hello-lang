# Python：公共 Docker 采集试点

状态：**待首次 Actions 验证**。此页不替代[原有 Docker 证据](./docker-tooling)。

## 场景与边界

使用 `PYTHON_3_12_SLIM_IMAGE` 的固定 digest，只读挂载 `demos/python/basic_demo.py`。断言语言名称、奖金计算和对象输出。此容器是 **Python 3.12**，与浏览器实验台的 Python 3.14 分别标注；不会自动升级既有镜像锁。

## 本地查看计划

```powershell
npm run docker:check
npm run docker:plan -- --shell powershell
```

在 hello-world 中会找到相邻的 hello-docker；独立克隆时使用 `HELLO_DOCKER_HOME` 指定工具仓库绝对路径。这两个入口不执行 Docker。

## Actions 执行与回写

发布公共工具后，在 `collect-docker-pilot.yml` 手动输入其完整 40 位提交 SHA。成功结果写入 `demos/python/docker-pilot/` 并生成本页，原采集结果保留。

普通代码推送不会触发容器采集。失败日志作为 Artifact 保留，不发布失败结果。
