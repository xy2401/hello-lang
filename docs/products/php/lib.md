# PHP 常用类库索引

PHP 作为 Web 服务器端开发的主流语言，有成熟的框架和工具生态。

## 📦 核心类库分类

### 标准扩展（PECL/PEAR）
- **字符串** - mbstring, iconv, intl（国际化）
- **数据库** - PDO, mysqli, redis, memcached
- **JSON/XML** - json, SimpleXML, dom
- **加密** - openssl, hash, sodium（PHP 7.2+）
- **异步 IO** - Swoole, Amp

### Web 框架
- **现代框架** - Laravel, Symfony, Slim, Lumen
- **微服务** - API Platform, Sapi
- **传统框架** - CodeIgniter, Yii2, CakePHP

### ORM 与数据访问
- **ORM** - Doctrine, Eloquent (Laravel)
- **查询构建器** - Query Builder, Fluent
- **数据库迁移** - Phinx, Alembic

### 测试与质量
- **测试框架** - PHPUnit, Pest
- **代码覆盖** - Xdebug, Blackfire
- **静态分析** - PHPStan, Psalm
- **代码规范** - PHPSpec, PHP-CS-Fixer

### 实用工具
- **Composer** - 依赖管理工具
- **队列处理** - RabbitMQ, Beanstalkd
- **缓存系统** - Memcached, Redis, APCu
- **任务调度** - Laravel Scheduler, cron

### DevOps 工具
- **打包部署** - Docker, Kubernetes
- **自动化** - Deployer, Ansible

---

*注：Laravel 是目前最流行的 PHP 框架，推荐优先学习*
