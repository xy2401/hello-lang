# Scala 基础语法

```scala
val language: String = "Scala"
var count = 1

def square(value: Int): Int = value * value
val values = List(1, 2, 3, 4)
println(values.filter(_ % 2 == 0).map(square))
```

`val` 表示不可重新赋值，`var` 表示可变绑定。`case class`、`enum` 与模式匹配适合表达领域数据：

```scala
enum Status:
  case Ready, Failed(reason: String)

def label(status: Status) = status match
  case Status.Ready          => "ready"
  case Status.Failed(reason) => s"failed: $reason"
```

Scala 3 可使用缩进语法或大括号；团队应由格式化器固定一种稳定风格。
