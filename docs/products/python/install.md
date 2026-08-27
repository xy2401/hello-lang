# Python 安装与切换

Python 解释器、虚拟环境与项目依赖是三层问题。uv 可安装并选择 Python，pyenv 适合传统的多版本解释器管理；系统 Python 可能被操作系统工具依赖，不应覆盖或删除。

- [Python 下载](https://www.python.org/downloads/)
- [uv 安装 Python](https://docs.astral.sh/uv/guides/install-python/)
- [pyenv 官方仓库](https://github.com/pyenv/pyenv)
- [Python venv](https://docs.python.org/3/library/venv.html)

## 推荐方式

新项目优先用 uv 安装受管理的 CPython 并创建虚拟环境；需要测试大量历史实现时使用 pyenv。Windows 也可使用 python.org 官方安装器和 `py` launcher。

## uv

~~~bash
curl -LsSf https://astral.sh/uv/install.sh | sh   # Linux / macOS 官方脚本
winget install --id=astral-sh.uv               # Windows WinGet 清单
uv python install 3.14
uv venv --python 3.14
~~~

## 系统包与官方安装器

~~~bash
sudo apt install python3 python3-venv
sudo dnf install python3
sudo pacman -S python
brew install python@3.14
~~~

Linux 包由发行版维护；Windows/macOS 的官方安装器从 python.org 下载。不要用 `sudo pip install` 修改系统环境。

## 版本切换

~~~bash
uv python list
uv python pin 3.14
uv run python --version
pyenv install 3.14.7
pyenv local 3.14.7
~~~

`.python-version` 或 uv 的 pin 文件应提交到项目；虚拟环境仍需单独创建。

## Docker

~~~bash
docker run --rm python:3.12-slim python --version
~~~

## 安装验证

~~~bash
python --version
python -c "import sys; print(sys.executable); print(sys.prefix)"
uv python find
~~~

## 升级、卸载与冲突

uv 可用 `uv python uninstall 3.14`；pyenv 可用 `pyenv uninstall 3.14.7`。升级前重建虚拟环境并锁定依赖。PATH 冲突常来自 Windows Store 别名、Conda、系统 Python、uv 与 pyenv 同时初始化。

## 官方资料

- [Python 下载](https://www.python.org/downloads/)
- [uv 安装 Python](https://docs.astral.sh/uv/guides/install-python/)
- [pyenv 官方仓库](https://github.com/pyenv/pyenv)
- [Python venv](https://docs.python.org/3/library/venv.html)

资料核对日期：2026-08-27。
