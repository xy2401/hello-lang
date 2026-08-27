# Ruby 编译与运行

Ruby 通常由解释器直接执行源码，`irb` 提供交互环境。MRI 会将源码转换为内部指令序列，但基础使用不需要先生成独立可执行文件。

- [Ruby 命令行](https://docs.ruby-lang.org/en/master/command_line_usage_md.html)
- [IRB](https://docs.ruby-lang.org/en/master/IRB.html)
- [Ruby 语法](https://docs.ruby-lang.org/en/master/syntax/index.html)

## 确认解释器

```bash
ruby --version
ruby -e 'puts RUBY_DESCRIPTION'
ruby -e 'puts RbConfig.ruby'
```

最后一条显示当前 Ruby 可执行文件，有助于排查 mise、rbenv、系统 Ruby 与 PATH 冲突。

## 执行文件与表达式

`hello.rb`：

```ruby
name = ARGV.fetch(0, 'world')
puts "Hello, #{name}"
```

```bash
ruby hello.rb Alice
ruby -e 'puts 2 + 3'
ruby -w hello.rb Alice
```

`-w` 开启更多警告，适合检查小示例；警告不一定改变退出码，需要结合具体内容处理。

## IRB 与标准输入

```bash
irb
```

IRB 中可以直接求值表达式，使用 `exit` 或 EOF 离开。脚本读取数据可使用 `$stdin`：

```ruby
text = $stdin.read
puts text.upcase
```

```bash
ruby filter.rb < input.txt
```

## 语法检查与退出码

```bash
ruby -c hello.rb
```

明确失败状态：

```ruby
if ARGV.empty?
  warn 'usage: ruby hello.rb <name>'
  exit 2
end
```

未捕获异常会打印调用栈并返回非零状态。`LoadError` 常由当前 Ruby、gem 安装目录、Bundler 上下文或 `$LOAD_PATH` 不一致造成；先确认 `ruby` 实际路径，不要在多个环境中重复安装同一 gem。

资料核对日期：2026-08-28。
