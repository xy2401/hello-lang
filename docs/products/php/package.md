# PHP 依赖与包管理

Composer 是现代 PHP 的事实标准依赖管理器，Packagist 是默认公共仓库。phpenv、mise 或容器负责 PHP 运行时版本，Composer 解析 PHP 包并生成自动加载器，框架自己的 CLI 则管理应用；不要把这些层次混在一起。

## 从 include 到 Composer

早期项目将源码直接复制到目录并用 `include`/`require` 引入，随后 PEAR 提供系统级包与渠道。Composer 把依赖声明、语义版本解析、锁文件和 PSR 自动加载统一起来，成为新项目默认方案。PEAR 主要用于维护历史软件，不应作为新应用选型。

| 方案 | 清单与锁定 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| 手工 vendoring | 自定义目录 | 可接入没有 Composer 元数据的旧库 | 更新、来源和自动加载难维护 | 封闭遗留代码 |
| PEAR | 系统 channel 数据 | 兼容老扩展与旧部署方式 | 系统级、生态陈旧、复现困难 | 仅历史项目 |
| Composer | `composer.json`、`composer.lock` | 生态统一、自动加载、平台约束和审计完整 | 求解可能受 PHP/扩展版本影响 | 所有现代 PHP 项目 |

Composer 的包管理范围是 PHP 代码。`ext-json`、`ext-pdo` 等平台依赖只声明环境约束，不会替你安装操作系统扩展；镜像、系统包或安装脚本仍需保证平台满足要求。

## 可复现工作流

```bash
mkdir hello && cd hello
composer init
composer require monolog/monolog:^3.9
composer require --dev phpunit/phpunit:^12
composer show --tree
composer depends psr/log

# 严格按 composer.lock 安装，不在部署时解析新版本
composer install --no-interaction --prefer-dist
composer check-platform-reqs

composer remove monolog/monolog
```

应用应提交 `composer.lock`；`composer install` 会使用锁定版本。可复用库通常也可提交锁文件用于自身测试，但库使用者安装时仍依据库的 `composer.json` 约束参与整体求解。

受控升级只触及目标包和必要传递依赖：

```bash
composer outdated --direct
composer update monolog/monolog --with-dependencies
composer validate --strict
composer audit
```

不要在生产部署中运行无参数 `composer update`。版本约束应表达真实兼容范围；随意使用 `*` 或忽略平台要求会把问题推迟到运行时。

## 自动加载、平台与完整性

```json
{
  "require": {
    "php": "^8.3",
    "ext-mbstring": "*"
  },
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  }
}
```

```bash
composer dump-autoload --classmap-authoritative
composer diagnose
composer clear-cache
composer config --list --source
```

Composer 校验下载内容并在锁文件中记录包来源。公共镜像或私有 repository 应通过项目/用户配置声明，凭据放在 `auth.json` 的用户级位置或环境变量中。`composer clear-cache` 用于排障，不是常规升级步骤。

`config.platform.php` 能模拟目标 PHP 版本以稳定求解，但不能替代在真实运行时执行 `composer check-platform-reqs`。错误地设置它会让本机安装通过而线上缺少扩展。

## 选择建议

- **新应用与库：** Composer + Packagist，应用提交锁文件，CI 用 `composer install`。
- **遗留手工 include：** 先配置 PSR-4 自动加载，再逐个把第三方源码替换为可追踪的 Composer 包。
- **PEAR 项目：** 保留可运行环境，确认是否有 Composer 替代包；不要直接删除系统 channel。
- **框架项目：** 框架脚手架可以生成 `composer.json`，最终依赖真相仍是 Composer 清单与锁文件。
- **原生扩展较多：** 同时固定 PHP、扩展和 OS 镜像基线，不能只锁 PHP 包。

## 官方资料

- [Composer documentation](https://getcomposer.org/doc/)
- [Composer basic usage](https://getcomposer.org/doc/01-basic-usage.md)
- [Composer schema](https://getcomposer.org/doc/04-schema.md)
- [Composer audit](https://getcomposer.org/doc/03-cli.md#audit)
- [Packagist](https://packagist.org/)
- [PEAR Manual](https://pear.php.net/manual/)

资料核对日期：2026-08-28。
