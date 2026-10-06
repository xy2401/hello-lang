# TypeScript 总览


<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

---

## 1. 强类型系统与泛型约束 (`Generic Constraints`)

利用静态类型推导与条件类型 (`Conditional Types`) 确保复杂的工程开发类型安全。

```typescript
type Role = "ADMIN" | "DEVELOPER" | "GUEST";

interface User<T extends Role> {
  id: number;
  username: String;
  role: T;
}

const dev: User<"DEVELOPER"> = {
  id: 1,
  username: "Alice",
  role: "DEVELOPER"
};

console.log("TypeScript 5.x User Role:", dev.role);
```

<DockerOutput
  image="node:20-alpine"
  sourceFile="demos/js/typescript_demo.ts"
/>

## 版本阅读范围

[完整版本目录](./version/)收录本仓库已有专题（如 typescript-3.7、typescript-4.0、typescript-5.0）。这些是教学与兼容性对照入口；运行环境的具体版本以安装页、工作台或采集证据为准。

## 推荐学习路线

[安装与环境](./install) → [数据结构](./data-structures) → [算法](./algorithms) → [完整版本目录](./version/)。先完成最小示例，再阅读版本差异。

## 实验入口与范围

[容器浏览器工作台](/playground/container-typescript)提供 RISC-V 容器体验，首次使用可能需要较大的运行时下载，先阅读页面资源说明。 [Docker 验证证据](./docker-tooling)展示已有采集结果与缺口。
