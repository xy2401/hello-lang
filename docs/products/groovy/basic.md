# Groovy 基础语法

```groovy
def language = 'Groovy'
String typed = 'JVM'

def greet(String name = 'world') { "Hello, $name" }
def values = [1, 2, 3, 4]
println values.findAll { it.even }.collect { it * it }
println greet(language)
```

闭包、集合字面量、安全导航 `?.`、Elvis 运算符 `?:` 和字符串插值构成常用脚本语法。类默认生成属性访问器；需要编译期约束时可使用 `@TypeChecked` 或 `@CompileStatic`。

```groovy
class Account {
    String owner
    BigDecimal balance = 0
}
def account = new Account(owner: 'Ada', balance: 12.5)
println account?.owner ?: 'unknown'
```
