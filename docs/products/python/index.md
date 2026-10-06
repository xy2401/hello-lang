# Python 总览


Python 作为表达力极强的高级语言，通过 PEP (Python Enhancement Proposal) 社区机制推进语言规范的快速演进。

---

## 📌 精选版本与重点 PEP

| 版本 | 发布年份 | 核心 PEP 提案 | 版本页面 |
| :--- | :--- | :--- | :--- |
| **Python 3.8** | 2019 | **PEP 572** (海象运算符 `:=`), **PEP 570** (仅限位置参数 `/`) | [Python 3.8](/products/python/version/py-38) |
| **Python 3.10** | 2021 | **PEP 634** (结构化模式匹配 `match-case`), **PEP 604** (`X \| Y` 联合类型) | [Python 3.10](/products/python/version/py-310) |
| **Python 3.12** | 2023 | **PEP 695** (泛型类型参数 `[T]`), **PEP 701** (F-string 解放) | [Python 3.12](/products/python/version/py-312) |

上表是三个语法演进节点的精选对照。站内完整版本还包括 [Python 3.14](/products/python/version/python-3.14)、[3.13](/products/python/version/python-3.13) 和 [3.11](/products/python/version/python-3.11)；按侧栏顺序阅读 [完整版本目录](/products/python/version/)。

## 适用边界

适合脚本、数据处理与应用开发；Pyodide 的 WASM 包与宿主机 CPython 包并非完全互换。

## 推荐学习路线

[安装与环境](./install) → [基础语法](./basic) → [数据结构](./data-structures) → [算法](./algorithms) → [完整版本目录](./version/)。先完成最小示例，再阅读版本差异。

## 实验入口与范围

[轻量浏览器工作台](/playground/python)可执行本地代码；能力与版本见工作台说明。 [Docker 验证证据](./docker-tooling)展示已有采集结果与缺口。
