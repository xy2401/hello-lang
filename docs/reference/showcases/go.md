# Go 概览

<script setup>
import { goVersions } from '../../.vitepress/theme/data/versionData';
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

Go 是由 Google 设计的简洁、强并发（Goroutine/CSP Channel）且快速编译的云原生基础语言。

---

## 🔀 Go 版本演进节点 (Go 1.18 Generics ~ 1.22)

<VersionDiff
  title="Go 现代大版本演进"
  :items="goVersions"
/>

---

## 🐳 Docker 真实运行验证 (Golang 1.22 Alpine)

<DockerOutput
  image="golang:1.22-alpine"
  :output="getOutput('go-generics')"
  :timeMs="getTimeMs('go-generics')"
  :exitCode="0"
/>
