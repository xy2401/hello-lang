# PHP 常用外部依赖库（Composer）

## 📦 Web 框架

### Laravel
官方链接： https://laravel.com/

现代全功能 Web 框架，PHP 生态最流行。内置 ORM(Eloquent)、认证、队列、任务调度、事件系统。开发效率高，社区活跃。

GitHub: [15k+ stars](https://github.com/laravel/laravel)

### Symfony
官方链接： https://symfony.com/

企业级组件式框架，模块化设计。可独立使用各组件（HttpKernel、Form、Validator），也可完整框架。稳定性强，适合大型企业项目。

GitHub: [39k+ stars](https://github.com/symfony/symfony)

### Slim
官方链接： https://www.slimframework.com/

轻量级微框架，专注于 API 开发。路由简洁、中间件系统完善。适合快速构建 RESTful API，学习成本低。

GitHub: [22k+ stars](https://github.com/slimphp/Slim)

### Lumen
官方链接： https://lumen.laravel.com/

Laravel 的微服务版本，超轻量级。基于 Laravel 核心，移除部分重量级组件。性能更高，适合 API 网关、微服务架构。

## 🗄️ 数据库与 ORM

### Eloquent
官方链接： https://laravel.com/docs/eloquent

Laravel 内置 ORM，ActiveRecord 模式实现。关联关系、模型作用域、访问器/修饰器等强大功能。代码优雅，开发效率高。

### Doctrine
官方链接： https://www.doctrine-project.org/

强大的 ORM 框架，JPA 标准实现。支持多种数据库、缓存策略、查询生成器。比 Laravel Eloquent 更严格，学习曲线陡。

GitHub: [4k+ stars](https://github.com/doctrine)

### Phinx
官方链接： https://phinx.org/

数据库迁移工具，类似 Rails migrations。支持版本控制、回滚、跨数据库迁移。与任何框架兼容使用。

## 🧪 测试工具

### PHPUnit
官方链接： https://phpunit.de/

PHP 标准测试框架，受 JUnit 启发。支持单元测试、集成测试、Mock、Coverage。Composer 安装即用。

GitHub: [600+ stars](https://github.com/sebastianbergmann/phpunit)

### Pest
官方链接： https://pestphp.com/

现代简约测试框架，Laravel 官方推荐。语法简洁（test/describe/it），开箱即用的 assertions。PHPUnit 的现代替代品。

GitHub: [18k+ stars](https://github.com/pestphp/pest)

### Mockery
官方链接： https://docs.mockery.io/

Mock 对象库，配合 PHPUnit/Pest 使用。支持方法 mock、参数验证、返回值模拟。测试隔离必备。

GitHub: [10k+ stars](https://github.com/mockery/mockery)

### Xdebug
官方链接： https://xdebug.org/

调试和代码覆盖工具。支持断点调试、Stack Trace、性能分析、Code Coverage。IDE 插件必备。

## 🔧 实用工具库

### Composer
官方链接： https://getcomposer.org/

PHP 包管理器（必备）。依赖管理、自动加载、版本控制。所有现代 PHP 项目必用。

### Monolog
官方链接： https://monolog.github.io/

日志记录器，支持多 Handler 输出（文件/Email/RollingFile等）。格式化方便，可扩展性强。

GitHub: [8k+ stars](https://github.com/Seldaek/monolog)

### Guzzle
官方链接： https://docs.guzzlephp.org/

HTTP 客户端库，支持请求发送、响应处理、中间件。Promise/A+异步操作，功能全面。

GitHub: [13k+ stars](https://github.com/guzzle/guzzle)

### Carbon
官方链接： https://carbon.nesbot.com/

日期时间处理库，类似 Java Date/Time API。语法优雅，时区转换、相对时间、人类可读。

GitHub: [27k+ stars](https://github.com/briannesbitt/Carbon)

### Twig
官方链接： https://twig.symfony.com/

模板引擎，灵活安全。支持继承、宏、过滤器、函数。Laravel Symfony 首选模板引擎。

GitHub: [9k+ stars](https://github.com/twigphp/Twig)

## ⚠️ 已废弃/不推荐

### CodeIgniter 2
标记：🔴 已过时

旧版本框架，建议升级到 CI3 或 CI4。新版本有更大改进，兼容性更好。

替代方案：Laravel/Slim

### Zend Framework
标记：🔴 重命名为 Laminas

Zend Framework 因商标问题已更名为 Laminas。但社区逐渐迁移到其他框架，新维护速度放缓。

替代方案：Symfony/Laravel

---

*注：部分经典库已过时，请参考现代替代方案*
