# Python 概览

<script setup>
import { pythonVersions } from '../.vitepress/theme/data/versionData';
import { getOutput, getTimeMs } from '../.vitepress/theme/data/outputsHelper';

const pythonDemoCode = `import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

primes = [x for x in range(1, 50) if is_prime(x)]
print("前 50 以内的质数清单:", primes)
`;
</script>

Python 是一种高层级、动态强类型、表达力极强且拥有庞大数据生态的语言。本专栏展示 **Python 3.8 至 3.12+** 的核心新特性演进。

---

## 🔀 Python 大版本演进 Diff (3.8 -> 3.10 -> 3.12)

<VersionDiff
  title="Python 3.8 ~ 3.12 语法演进里程碑"
  :items="pythonVersions"
/>

---

## ⚡ Pyodide 浏览器原生 Python 在线执行 {#pyodide-run}

通过 **Pyodide (CPython 编译至 WebAssembly)**，以下 Python 代码完全在您的浏览器本地执行，无任何后端服务器依赖：

<CodeRunner
  language="python"
  title="Python (Pyodide WebAssembly) 本地在线运行"
  :initialCode="pythonDemoCode"
/>

---

## 🐳 Docker 真实容器运行日志 (Python 3.12)

<DockerOutput
  image="python:3.12-slim"
  :output="getOutput('python-312-type-param')"
  :timeMs="getTimeMs('python-312-type-param')"
  :exitCode="0"
/>
