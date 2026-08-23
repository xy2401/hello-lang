# TypeScript 5.x 类型系统

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
