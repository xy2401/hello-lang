# Ruby 安装与切换

Ruby 项目通常需要并行维护多个解释器版本。mise 或 rbenv 负责解释器选择，Bundler 负责 Gem 依赖；系统 Ruby 可能被 macOS/发行版工具使用。

- [Ruby 安装](https://www.ruby-lang.org/en/documentation/installation/)
- [mise Ruby](https://mise.jdx.dev/lang/ruby.html)
- [rbenv 官方仓库](https://github.com/rbenv/rbenv)
- [Ruby 发布页](https://www.ruby-lang.org/en/downloads/releases/)

## 推荐方式

开发机使用 mise 或 rbenv 安装项目版本，并提交 `.ruby-version`；只运行发行版工具时保留系统 Ruby。Windows 优先使用 RubyInstaller。

## mise / rbenv

~~~bash
mise use --global ruby@4.0
mise use ruby@3.3
rbenv install 4.0.0
rbenv local 4.0.0
~~~

## 平台软件包

~~~bash
brew install ruby                    # Homebrew 社区维护
sudo apt install ruby-full          # Debian / Ubuntu 发行版维护
sudo dnf install ruby ruby-devel    # Fedora / RHEL 发行版维护
sudo pacman -S ruby                 # Arch 发行版维护
~~~

Windows 从 RubyInstaller 官方站点选择带 Devkit 的明确版本。

## 版本切换

~~~bash
mise ls ruby
mise use ruby@4.0
rbenv versions
rbenv local 4.0.0
ruby --version
~~~

## Docker

~~~bash
docker run --rm ruby:3.3-alpine ruby --version
~~~

## 安装验证

~~~bash
ruby --version
gem env home
bundle --version
command -v ruby
~~~

## 升级、卸载与冲突

由 mise/rbenv 删除不再使用的版本，Gem 依赖用 Bundler 管理。不要卸载操作系统自带 Ruby；用 `type -a ruby` 与 `gem env` 确认解释器和 Gem 目录属于同一版本。

## 官方资料

- [Ruby 安装](https://www.ruby-lang.org/en/documentation/installation/)
- [mise Ruby](https://mise.jdx.dev/lang/ruby.html)
- [rbenv 官方仓库](https://github.com/rbenv/rbenv)
- [Ruby 发布页](https://www.ruby-lang.org/en/downloads/releases/)

资料核对日期：2026-08-27。
