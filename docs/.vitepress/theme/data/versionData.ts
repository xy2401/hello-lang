export const javaVersions = [
  {
    version: 'JDK 8 LTS',
    releaseYear: '2014',
    isLts: true,
    summary: '函数式编程革新：Lambda 表达式与 Stream API',
    code: `List<String> list = Arrays.asList("java", "rust", "go");
List<String> upper = list.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());`,
    notes: '引入了 Stream API、Lambda 接口与 Optional，开启 JVM 函数式编程时代。',
  },
  {
    version: 'JDK 17 LTS',
    releaseYear: '2021',
    isLts: true,
    summary: '数据传输对象革命：Record 类与 Sealed 密封类',
    code: `public record User(long id, String name, String role) {}
User user = new User(101, "Alice", "ADMIN");
System.out.println(user.name());`,
    notes: 'Record 自动生成 immutable 字段、equals、hashCode 与 toString，极大减少 boilerplate 代码。',
  },
  {
    version: 'JDK 21 LTS',
    releaseYear: '2023',
    isLts: true,
    summary: '高并发颠覆：Virtual Threads (虚拟线程 / Project Loom)',
    code: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> { Thread.sleep(100); return i; });
    });
}`,
    notes: '百万级轻量级虚拟线程，在操作系统线程之上多路复用，彻底解决传统 Thread-per-request 的 I/O 阻塞成本。',
  },
];

export const pythonVersions = [
  {
    version: 'Python 3.8',
    releaseYear: '2019',
    summary: 'Walrus 赋值表达式海象运算符 (:=)',
    code: `chunks = ["Hello World", "Py3.8 Demo"]
for chunk in chunks:
    if (n := len(chunk)) > 5:
        print(f"Length {n}: {chunk}")`,
    notes: '允许在表达式内部直接进行变量赋值并返回值，极大精简 while 循环和条件匹配。',
  },
  {
    version: 'Python 3.10',
    releaseYear: '2021',
    summary: '结构化模式匹配 Structural Pattern Matching (match-case)',
    code: `def handle(command):
    match command:
        case ("move", x, y):
            print(f"Move to {x}, {y}")
        case "quit":
            print("Quit")`,
    notes: '引入媲美 Rust/Haskell 的强力 match-case 结构化解构匹配。',
  },
  {
    version: 'Python 3.12',
    releaseYear: '2023',
    summary: 'PEP 695 泛型类型参数新语法 [T]',
    code: `class Stack[T]:
    def __init__(self):
        self._items: list[T] = []
    def push(self, item: T) -> None:
        self._items.append(item)`,
    notes: '放弃繁琐的 TypeVar 声明，直接使用直观的 [T] 声明类与函数的泛型参数。',
  },
];

export const cppVersions = [
  {
    version: 'C++11',
    releaseYear: '2011',
    summary: '现代 C++ 起点：Auto、Lambda、Move 语义与智能指针',
    code: `auto factorial = [&](int n) -> int {
    return (n <= 1) ? 1 : n * factorial(n - 1);
};
std::unique_ptr<int> ptr = std::make_unique<int>(42);`,
    notes: '引入 std::move 右值引用与 RAII 智能指针 (unique_ptr/shared_ptr)，终结内存泄漏时代。',
  },
  {
    version: 'C++20',
    releaseYear: '2020',
    summary: 'Concepts 概念、Modules 模块、Coroutines 协程与 Ranges',
    code: `template<typename T>
concept Number = std::integral<T> || std::floating_point<T>;

template<Number T>
T add(T a, T b) { return a + b; }`,
    notes: 'Concepts 彻底改革模板元编程的编译期类型约束与编译报错体验。',
  },
];

export const rustVersions = [
  {
    version: 'Edition 2018',
    releaseYear: '2018',
    summary: 'Async / Await 语法与 模块路径优化',
    code: `async function fetch_data() -> Result<Data, Error> {
    let res = reqwest::get("https://api.example.com").await?;
    Ok(res.json().await?)
}`,
    notes: '引入原生的 async/await 异步编程生态与简化版的 use 模块引用语法。',
  },
  {
    version: 'Edition 2021',
    releaseYear: '2021',
    summary: '精准闭包捕获 (Disjoint Capture)',
    code: `struct User { name: String, age: u32 }
let u = User { name: "Alice".into(), age: 30 };
let get_age = || println!("{}", u.age);`,
    notes: '闭包精细化只捕获字段，提升内存管理与借用灵活性。',
  },
];

export const goVersions = [
  {
    version: 'Go 1.18',
    releaseYear: '2022',
    summary: 'Generics (泛型类型参数) 史诗级革新',
    code: `type Number interface {
    int | int64 | float64
}
func Sum[T Number](numbers []T) T {
    var total T
    for _, n := range numbers { total += n }
    return total
}`,
    notes: '打破 Go 长久以来无法编写类型安全泛型容器的局限。',
  },
  {
    version: 'Go 1.22',
    releaseYear: '2024',
    summary: 'for 循环变量作用域修正',
    code: `values := []string{"a", "b", "c"}
for _, v := range values {
    go func() {
        fmt.Println(v) // 每次循环分配独立 v
    }()
}`,
    notes: '彻底修复了 Go 经典的 for 循环闭包变量共享陷阱。',
  },
];

export const jsVersions = [
  {
    version: 'ES6 (ES2015)',
    releaseYear: '2015',
    summary: '现代 JS 基石：Class、Arrow Functions、Promise',
    code: `const add = (a, b) => a + b;
class User {
  constructor(name) { this.name = name; }
}`,
    notes: '奠定现代前端与 Node.js 模块化开端。',
  },
  {
    version: 'ES2022',
    releaseYear: '2022',
    summary: 'Top-level await、Private Class Fields (#field)',
    code: `class BankAccount {
  #balance = 0;
  deposit(amount) { this.#balance += amount; }
}`,
    notes: '原生支持带 # 前缀的真正私有属性与顶层 await。',
  },
];
