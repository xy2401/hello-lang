# Ruby 常用第三方库（Gem）

## 📦 Web 框架

### Ruby on Rails
官方链接： https://rubyonrails.org/

全功能 MVC 框架，约定优于配置。自带 ORM(ActiveRecord)、Migrations、Auth、Scaffolding。快速开发神器，创业公司首选。

GitHub: [17k+ stars](https://github.com/rails/rails)

### Sinatra
官方链接： https://sinatrarb.com/

轻量级微框架，类似 Flask。路由简洁、中间件灵活、DSL 风格。适合 API 服务、小型应用。

GitHub: [14k+ stars](https://github.com/sinatra/sinatra)

### Hanami
官方链接： https://hanamirb.org/

模块化 Web 框架，受 Java Spring启发。分层架构、领域驱动设计。适合中大型项目，学习成本中等。

GitHub: [5k+ stars](https://github.com/hanami/hanami)

### Grape
官方链接： https://grape.eveningout.io/

API 构建器，专为 RESTful API 设计。版本管理、参数验证、嵌套资源。FastAPI的Ruby版。

GitHub: [9k+ stars](https://github.com/ruby-grape/grape)

## 🗄️ 数据库与 ORM

### ActiveRecord
官方链接： https://guides.rubyonrails.org/active_record_basics.html

Rails 内置 ORM，ActiveRecord 模式。关联关系（belongs_to/has_many）、Scope、Callbacks。语法优雅，开发效率高。

### Sequel
官方链接： https://sequel.jeremyevans.net/

灵活 SQL 适配器，支持多种数据库。比 ActiveRecord 更灵活，性能更好。适合需要精细控制数据的场景。

GitHub: [2k+ stars](https://github.com/jeremyevans/sequel)

### Tango
官方链接： https://tango.sh/

现代 ORM，基于 DSL。支持关联查询、缓存策略、多数据库。Ruby 新世代 ORM。

## 🧪 测试工具

### RSpec
官方链接： https://rspec.info/

BDD 风格测试框架，Ruby生态主流。describe/it语法清晰，有丰富的 Matchers。配合 Shoulda 使用效果更佳。

GitHub: [6k+ stars](https://github.com/rspec/rspec-core)

### Minitest
官方链接： https://docs.ruby-lang.org/en/master/Minitest.html

Ruby 标准测试库，轻量级。速度最快，集成在 stdlib。Rails 默认测试框架。

GitHub: [3k+ stars](https://github.com/seattlerb/minitest)

### Cucumber
官方链接： https://cucumber.io/docs/cucumber/

BDD工具，通过 Gherkin 语言编写用例（Given-When-Then）。可读性强，适合需求验收测试。

GitHub: [6k+ stars](https://github.com/cucumber/cucumber-ruby)

### FactoryBot
官方链接： https://github.com/thoughtbot/factory_bot

工厂模式支持，集中管理测试数据。定义 Models -> 自动生成测试对象。避免硬编码测试数据。

GitHub: [6k+ stars](https://github.com/thoughtbot/factory_bot)

## 🔧 实用工具库

### Bundler
官方链接： https://bundler.io/

包管理器，必备工具。Gemfile 管理依赖、自动生成 Gemfile.lock。所有 Ruby 项目必用。

### Puma
官方链接： https://puma.io/

高性能 HTTP 服务器，多线程支持。Rails/Hotwire 推荐服务器，生产环境标配。

GitHub: [5k+ stars](https://github.com/puma/puma)

### Sidekiq
官方链接： https://sidekiq.org/

后台任务队列，Redis 后端。简单高效，支持延迟任务、并发处理。异步任务首选。

GitHub: [15k+ stars](https://github.com/mperham/sidekiq)

### Pagy
官方链接： https://github.com/ddnexus/pagy

分页器，支持 HTML/AJAX/Pagination API。性能优、配置灵活，替代 Kaminara。

GitHub: [5k+ stars](https://github.com/ddnexus/pagy)

### Omniauth
官方链接： https://github.com/omniauth/omniauth

OAuth 认证集成，支持 Google/Github/Facebook等第三方登录。Rails Devise 配套使用。

GitHub: [10k+ stars](https://github.com/omniauth/omniauth)

### Dry-RS
官方链接： https://dry-rb.org/gems/dry-validation/

数据验证库，独立于 Rails。Schema 定义、自定义 Validator、错误消息国际化。

## ⚠️ 已废弃/不推荐

### Rails 3.x
标记：🔴 已过时

旧版本框架，建议升级到 Rails 7+。新版本有 Turbo/Stimulus/Import Maps等新特性。

替代方案：Rails 7+

### Capistrano 2
标记：🔴 版本陈旧

旧部署工具，建议升级到 Cap v3+。新版本支持并行部署、rollback 更安全。

替代方案：Capistrano v3+、Ansible、Deployer

---

*注：部分经典库已过时，请参考现代替代方案*
