# C++ 概览

<script setup>
import { cppVersions } from '../../.vitepress/theme/data/versionData';
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

C++ 是兼具底层的硬件控制力与高层级零成本抽象（Zero-Cost Abstractions）的现代系统级编程语言。

---

## 🔀 C++ 标准演进 Diff (C++11 -> C++20 -> C++23)

<VersionDiff
  title="C++ 现代标准演进 (Modern C++)"
  :items="cppVersions"
/>

---

## 🐳 Docker 容器编译与运行 (GCC 13)

<DockerOutput
  image="gcc:13"
  :output="getOutput('cpp-20-concepts')"
  :timeMs="getTimeMs('cpp-20-concepts')"
  :exitCode="0"
/>
