# PHP 8.3

<script setup>
import { getOutput, getTimeMs } from '../../.vitepress/theme/data/outputsHelper';
</script>

> **参考官方文档**: [PHP 8.3 Official Release Notes](https://www.php.net/releases/8.3/en.php)  
> PHP 8.x 引入了 **JIT 编译器**、**Typed Class Constants（类型化常量）**、**`readonly` 类与属性**、**`enum` 枚举** 和 **`match` 表达式**。

---

## 🐳 容器运行环境 (Runtime Environment)

在标准 Docker 镜像 `php:8.3-alpine` 中执行控制台诊断指令 `php -v`：

<DockerOutput
  image="php:8.3-alpine"
  sourceFile="demos/php/env.out"
/>

---

## 1. 🔀 `match` 表达式与 `enum` 枚举
代替传统的 `switch`，提供严格类型比对 (`===`) 的 `match` 表达式；引入具备类型与方法的优雅 `enum` 枚举。

```php
// 关联源码: demos/php/php8_demo.php
enum ServerStatus: string {
    case Active = 'active';
    case Maintenance = 'maintenance';
}

$message = match ($status) {
    ServerStatus::Active => 'Server is running normally',
    ServerStatus::Maintenance => 'Server is under maintenance',
};
```

---

## 2. 🛡️ `readonly` 只读属性与只读类 (PHP 8.1 / 8.2)
允许将类声明为 `readonly`，声明后类内部所有属性均不可二次修改，极大提升不可变数据结构的安全性。

```php
readonly class UserProfile {
    public function __construct(
        public int $id,
        public string $username,
        public ServerStatus $status
    ) {}
}
```

<DockerOutput
  image="php:8.3-alpine"
  sourceFile="demos/php/php8_demo.php"
/>
