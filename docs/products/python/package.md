# Python 依赖与包管理

Python 的难点不是“怎样下载一个包”，而是同时管理解释器、虚拟环境、项目依赖、锁文件与含原生代码的二进制依赖。它们属于不同层次：`pyenv` 管 Python 版本，`venv` 隔离环境，pip/uv/Poetry 解析并安装 Python 包，PyPI 是默认包仓库；Conda 则能连同 Python 之外的原生库一起管理。

## 演进与角色

早期项目常把模块复制进源码目录，或直接运行 `setup.py install`。随后 pip 与 `venv` 成为基础组合；pip-tools 用锁定清单补足可复现安装；Poetry 将清单、解析和构建整合起来；uv 则提供兼容 Python 生态的高速项目工作流。`setup.py` 仍可能存在于旧项目中，但现代项目应通过 `pyproject.toml` 描述构建系统和依赖。

| 工具 | 清单与锁定 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| pip + venv | `requirements.txt`，是否锁定取决于写法 | 标准、透明、兼容面最广 | 不直接提供完整求解与项目锁文件 | 简单应用、教学、遗留项目 |
| pip-tools | `requirements.in` → 固定版本的 `requirements.txt` | 在 pip 基础上增加可审查锁定 | 需要维护输入与生成文件 | 希望保留 pip 工作流的服务端项目 |
| Poetry | `pyproject.toml`、`poetry.lock` | 项目、依赖组和构建体验完整 | 独立工作流较重，与其他工具混用易混乱 | 已采用 Poetry 的应用或库 |
| uv | `pyproject.toml`、`uv.lock` | 解析、环境、Python 安装和缓存速度快 | 较新，遗留插件链仍需验证 | 新项目和多平台应用 |
| Conda | `environment.yml`、显式环境文件 | 能管理 CUDA、BLAS 等非 Python 依赖 | 与 PyPI 解析模型不同，环境更重 | 科学计算、数据与原生依赖环境 |

## 推荐闭环：uv

```bash
uv init hello
cd hello
uv add httpx
uv add --dev pytest
uv remove httpx

# 严格按现有锁文件同步；锁文件过期时直接失败
uv sync --locked
uv tree

# 只受控升级一个直接依赖
uv lock --upgrade-package pytest
uv lock --check

# 缓存通常无需人工管理；排障或回收空间时再处理
uv cache clean pytest
uv cache prune
```

提交 `pyproject.toml` 和 `uv.lock`，部署时使用 `uv sync --locked`。uv 的全局缓存可复用下载与构建产物，但缓存不是锁文件，清空缓存不应改变解析结果。

## 保守闭环：pip 与 pip-tools

```bash
python -m venv .venv
# Linux / macOS
. .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1

python -m pip install --upgrade pip pip-tools
printf 'httpx>=0.28,<1\n' > requirements.in
python -m piptools compile --generate-hashes requirements.in
python -m pip install --require-hashes -r requirements.txt
python -m pip check
python -m pip list --outdated
```

升级时修改 `requirements.in`，再有意识地执行 `pip-compile --upgrade-package httpx`。`pip freeze` 只是当前环境快照，无法表达哪些是直接依赖；不要把它当作设计良好的依赖清单。

漏洞检查可使用 PyPA 维护的 `pip-audit`：

```bash
python -m pip install pip-audit
python -m pip_audit -r requirements.txt
python -m pip cache info
```

镜像通过 pip 的 `index-url` 或 uv 的索引配置指定。凭据不应写入仓库；企业镜像也应保留 TLS 与来源审计。对带哈希的 requirements，换镜像前需确认镜像返回的构件与锁定哈希一致。

## 选择建议

- **新应用：** 优先 uv，并提交 `uv.lock`；团队若已有 Poetry 规范则继续使用 Poetry，不要同时维护两份锁文件。
- **小型或遗留项目：** `venv + pip-tools` 迁移成本低，先把松散依赖变成直接依赖清单与固定版本。
- **可发布库：** 在 `pyproject.toml` 中声明合理版本范围；锁文件主要服务开发和测试，不应把应用级精确锁定强加给库使用者。
- **科学计算或 GPU：** Conda/mamba 负责原生环境，pip 仅补充 Conda 没有的 Python 包；先装 Conda 包，再用 pip，并记录两套来源。
- **系统 Python：** 不用 `sudo pip install` 覆盖发行版文件；创建虚拟环境或使用隔离的应用安装工具。

## 官方资料

- [Python Packaging User Guide](https://packaging.python.org/)
- [pip documentation](https://pip.pypa.io/en/stable/)
- [uv：项目与依赖](https://docs.astral.sh/uv/concepts/projects/dependencies/)
- [Poetry documentation](https://python-poetry.org/docs/)
- [pip-tools documentation](https://pip-tools.readthedocs.io/)
- [Conda：管理环境](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html)

资料核对日期：2026-08-28。
