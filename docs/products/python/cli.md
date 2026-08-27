# Python 编译与运行

Python 通常由解释器直接执行源码，也能运行模块、表达式和交互 REPL。字节码编译是加载优化与语法检查手段，不等同于生成独立原生可执行文件。

- [Python 命令行](https://docs.python.org/3/using/cmdline.html)
- [解释器](https://docs.python.org/3/tutorial/interpreter.html)
- [compileall](https://docs.python.org/3/library/compileall.html)

## 确认解释器

```bash
python --version
python -c "import sys; print(sys.executable); print(sys.version)"
```

Windows 的官方启动器还可使用 `py -0p` 查看已注册解释器。执行脚本前应确认路径与虚拟环境，而不是只看命令名。

## 执行文件、模块与表达式

`hello.py`：

```python
import sys

name = sys.argv[1] if len(sys.argv) > 1 else "world"
print(f"Hello, {name}")
```

```bash
python hello.py Alice
python -c "print(2 + 3)"
python -m http.server 8000 --bind 127.0.0.1
```

`python -m package.module` 按模块搜索路径执行，适合需要正确包上下文的代码；直接运行内部文件可能改变导入基准。

## REPL 与标准输入

```bash
python
python -q
python < script.py
```

交互环境使用 `exit()` 或 EOF 退出。标准输入既可能承载源码，也可能是程序数据，使用重定向前要确认脚本自身是否还会读取 stdin。

## 语法检查与退出码

```bash
python -m py_compile hello.py
python -m compileall -q src
```

```python
if len(sys.argv) < 2:
    print("usage: python hello.py <name>", file=sys.stderr)
    raise SystemExit(2)
```

未捕获异常会打印 traceback 并返回非零退出码。导入失败时依次检查当前解释器、虚拟环境、工作目录、包结构和 `sys.path`，不要通过全局安装重复包来掩盖环境混用。

资料核对日期：2026-08-28。
