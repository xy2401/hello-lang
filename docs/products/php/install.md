# PHP 安装与切换

PHP 可作为 CLI、Web 服务器模块或 PHP-FPM 安装，三者的软件包和配置可能不同。生产环境应使用发行版或受信任仓库提供的受支持版本。

- [PHP 安装与配置](https://www.php.net/manual/en/install.php)
- [PHP 下载](https://www.php.net/downloads.php)
- [PHP 支持版本](https://www.php.net/supported-versions.php)

## 推荐方式

Linux 优先发行版包，macOS 可用 Homebrew，Windows 使用 php.net 官方 ZIP。先安装 CLI 验证，再按 Web 服务器选择 FPM/模块；Composer 是依赖管理器，不安装 PHP 本体。

## 平台软件包

~~~bash
sudo apt install php-cli php-fpm
sudo dnf install php-cli php-fpm
sudo pacman -S php php-fpm
brew install php
# Windows：从 windows.php.net/download 选择明确版本 ZIP
~~~

## 服务与配置

~~~bash
php --ini
systemctl status php-fpm
php -r 'echo PHP_BINARY, PHP_EOL;'
~~~

Debian/Ubuntu 的服务名通常带版本号；以 `systemctl list-unit-files | grep php.*fpm` 的实际结果为准。

## 版本切换

Homebrew 可并行安装 `php@8.3` 并用 `brew unlink/link`；Linux 多版本依赖发行版或第三方仓库策略。更稳妥的项目切换方式是固定容器镜像，并分别配置 CLI 与 FPM。

## Docker

~~~bash
docker run --rm php:8.3-alpine php --version
~~~

## 安装验证

~~~bash
php --version
php --ini
php -m
command -v php
~~~

## 升级、卸载与冲突

由原包管理器升级卸载。检查 CLI 与 FPM 是否加载同一套扩展和 ini；`type -a php`、`php --ini` 能发现 Homebrew、系统包和手工 ZIP 的冲突。

## 官方资料

- [PHP 安装与配置](https://www.php.net/manual/en/install.php)
- [PHP 下载](https://www.php.net/downloads.php)
- [PHP 支持版本](https://www.php.net/supported-versions.php)

资料核对日期：2026-08-27。
