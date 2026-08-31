# Lua Docker 验证证据

<DockerTooling product="lua" />

镜像从 Lua 官方 5.5.1 源码构建，并校验 SHA-256 `1c4b4068d67061f2a2231ad2b5422e77acea1487ea9890f6320af614f4373dce`。多阶段构建只把安装结果复制进运行镜像。

当前环境未提供 Docker，因此输出保持 `snapshot`、证据保持 `documented`；完整收集成功后才会改为 `verified` 并记录基础镜像 digest。
