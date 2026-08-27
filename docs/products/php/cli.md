# PHP 编译与运行

PHP CLI 直接解析并执行脚本，适合命令行任务、语法检查和本地开发服务器。它与 Web Server 中的 PHP-FPM SAPI 配置可能不同，排错时先确认当前 SAPI 和加载的 `php.ini`。

- [PHP 命令行](https://www.php.net/manual/en/features.commandline.php)
- [命令行选项](https://www.php.net/manual/en/features.commandline.options.php)
- [内置 Web Server](https://www.php.net/manual/en/features.commandline.webserver.php)

## 确认运行环境

```bash
php --version
php --ini
php -m
php -i
```

`php --ini` 显示 CLI 实际加载的配置文件；不要假设它与 FPM 或 Apache module 共用同一配置。

## 运行脚本与表达式

`hello.php`：

```php
<?php
$name = $argv[1] ?? 'world';
echo "Hello, {$name}\n";
```

```bash
php hello.php Alice
php -r 'echo 2 + 3, PHP_EOL;'
php < hello.php
```

`-r` 的代码不写 `<?php` 标签，并要注意当前 Shell 的引号规则。

## 交互模式与语法检查

```bash
php -a
php -l hello.php
```

交互 Shell 的可用性取决于构建时是否包含 readline 支持。`php -l` 只做语法检查，不会验证运行路径、扩展和外部服务。

## 本地开发服务器

```bash
php -S 127.0.0.1:8000 -t public
```

内置服务器仅用于本地开发与演示，不具备生产服务器的并发、安全和进程管理能力。启动目录与 `-t` 文档根目录会影响相对路径和静态文件查找。

## 参数、输入与退出码

命令行参数来自 `$argv`，标准输入可通过 `STDIN` 或 `stream_get_contents(STDIN)` 读取。明确失败可写：

```php
fwrite(STDERR, "input is required\n");
exit(2);
```

扩展缺失时使用 `php -m` 与 `php --ri extension_name` 确认 CLI 环境。语法错误、未捕获异常和显式非零 `exit` 都应由调用 Shell 检查。

资料核对日期：2026-08-28。
