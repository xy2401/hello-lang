# Ruby 依赖与包管理

RubyGems 负责安装和分发 gem，Bundler 负责为一个项目解析并锁定 gem 集合；它们随现代 Ruby 工具链紧密集成。rbenv、mise、RVM 等只切换 Ruby 运行时，不替代 Bundler。rubygems.org 是默认包仓库。

## 从 load path 到 Bundler

早期 Ruby 项目把 `.rb` 文件放进 load path，或手工复制依赖。RubyGems 引入 gem 规范、版本与仓库；Bundler 再用 `Gemfile` 和 `Gemfile.lock` 解决“每台机器装到不同版本”的问题。

| 组成 | 作用 | 优点 | 缺点 | 适合场景 |
| --- | --- | --- | --- | --- |
| 手工 load path | 直接加载源码 | 无工具依赖 | 来源、版本、传递依赖不可追踪 | 仅封闭遗留脚本 |
| RubyGems | 安装 gem、读取 `.gemspec` | Ruby 标准生态、适合工具安装 | 单独 `gem install` 不定义项目完整环境 | 全局 CLI、包元数据 |
| Bundler | 解析 `Gemfile`、生成 `Gemfile.lock` | 项目隔离、锁定和组管理成熟 | 锁文件跨平台维护需关注 platform | 所有现代应用与库开发 |

`.gemspec` 描述一个可发布 gem 的元数据和依赖范围；`Gemfile` 描述当前开发/应用环境；`Gemfile.lock` 记录解析结果。应用应提交锁文件。库仓库通常也提交锁文件来固定自身 CI，但发布的 gem 消费者由 gemspec 约束重新解析。

## 可复现工作流

```bash
mkdir hello && cd hello
bundle init
bundle add httparty --version "~> 0.23"
bundle add rspec --group development,test
bundle remove httparty

bundle install
bundle list
bundle info rspec
bundle exec rspec
```

部署或 CI 应启用冻结模式，禁止锁文件被悄悄改写：

```bash
bundle config set --local frozen true
bundle config set --local path vendor/bundle
bundle install
bundle check
```

受控升级先查看，再限制目标：

```bash
bundle outdated
bundle lock --update rspec
bundle install
bundle check
```

不要把 `gem update --system`、升级 Ruby 和刷新全部应用依赖放在同一次变更中。若更新 Bundler 本身，应通过 lockfile 的 `BUNDLED WITH` 和团队 Ruby 基线一起审查。

## 平台、缓存与安全

```bash
bundle platform
bundle lock --add-platform x86_64-linux
bundle cache --all-platforms
gem sources --list
gem env home
```

含原生扩展的 gem 可能依赖编译器和系统库。锁文件需包含部署平台，不能只在 macOS 生成后假定 Linux 一定可用。`bundle cache` 可将所需 `.gem` 放入 `vendor/cache`，适合离线环境，但会增大仓库并需要随锁文件更新。

RubyGems 会校验下载内容；漏洞数据库检查常用 RubySec 维护的 `bundler-audit`，它是附加工具而非 Bundler 内建：

```bash
gem install bundler-audit
bundle audit check --update
```

镜像与凭据通过 Bundler 配置或环境变量提供，不把 token 写进 `Gemfile`。切换源时确认其同步策略和 TLS，不使用来源不明的 gem 镜像。

## 选择建议

- **新应用：** RubyGems + Bundler，提交 `Gemfile`、`Gemfile.lock`，所有命令经 `bundle exec` 运行。
- **新 gem：** 依赖范围写入 gemspec，开发工具可放 `Gemfile`；避免把应用级精确版本暴露给使用者。
- **遗留脚本：** 先建立 `Gemfile` 并记录当前可工作版本，再取消共享系统 gem 的隐式依赖。
- **多平台部署：** 将目标 platform 加入锁文件，在每个平台测试原生扩展。
- **运行时切换：** 由 rbenv/mise/RVM 负责 Ruby；同一项目仍使用锁定的 Bundler 和 gem 集合。

## 官方资料

- [RubyGems Guides](https://guides.rubygems.org/)
- [Bundler documentation](https://bundler.io/docs.html)
- [Gemfile manual](https://bundler.io/man/gemfile.5.html)
- [Bundler CLI manual](https://bundler.io/man/bundle.1.html)
- [RubyGems.org](https://rubygems.org/)

资料核对日期：2026-08-28。
