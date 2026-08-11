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
    version: 'ES1 → ES5',
    releaseYear: '1997–2009',
    summary: '原型、函数作用域、DOM 脚本与 JSON 奠定语言基础',
    code: `var users = [{ name: "Ada", active: true }];
var activeNames = users
  .filter(function (user) { return user.active; })
  .map(function (user) { return user.name; });`,
    notes: '这一阶段形成 JavaScript 的动态对象、闭包、原型委托与事件驱动模型；ES5 带来严格模式和关键数组迭代方法。',
  },
  {
    version: 'ES6 (ES2015)',
    releaseYear: '2015',
    summary: '现代 JS 基石：Class、Arrow Functions、Promise',
    code: `const add = (a, b) => a + b;
class User {
  constructor(name) { this.name = name; }
}`,
    notes: 'let/const、箭头函数、类、Promise、迭代器与 ES Modules 共同奠定现代 JavaScript 工程基础。',
  },
  {
    version: 'Modern JavaScript',
    releaseYear: '2016–至今',
    summary: '按能力持续演进：async/await、可选链、私有字段与不可变数组',
    code: `const response = await fetch(url);
const names = (await response.json())
  ?.items
  ?.toSorted((a, b) => a.rank - b.rank)
  .map(item => item.name) ?? [];`,
    notes: 'ES2016 以后采用年度发布节奏，但学习时应按异步控制流、数据变换、对象封装、模块化和运行时兼容性理解，而不是背年份。',
  },
];

export const htmlVersions = [
  {
    version: 'HTML 2.0 → 4.01 / XHTML',
    releaseYear: '1995–2000',
    summary: '从超文本页面走向表格、表单、样式表与更严格的文档类型',
    code: `<table summary="课程表">
  <tr><th>课程</th><th>阶段</th></tr>
  <tr><td>HTML</td><td>HTML 4.01</td></tr>
</table>`,
    notes: '早期 HTML 奠定链接、图像、表格与表单模型；HTML 4 开始强调结构与表现分离，XHTML 尝试用 XML 规则约束标记。',
  },
  {
    version: 'HTML5',
    releaseYear: '2014',
    summary: '语义元素、原生媒体、表单能力与统一 Web 平台',
    code: `<main>
  <article>
    <h1>Semantic document</h1>
    <p>Meaningful structure for browsers and assistive technology.</p>
  </article>
</main>`,
    notes: 'HTML5 将语义结构、媒体与应用能力纳入统一标准，现代 HTML 标准随后转向持续演进的 Living Standard。',
  },
  {
    version: 'Modern HTML',
    releaseYear: 'Living Standard',
    summary: 'Dialog、Details、Template 与持续演进的原生组件',
    code: `<details>
  <summary>Show details</summary>
  <p>Native disclosure without a custom component.</p>
</details>`,
    notes: '优先使用原生元素可以获得浏览器维护的语义、键盘行为和渐进增强能力。',
  },
];

export const cssVersions = [
  {
    version: 'CSS1 → CSS2.1',
    releaseYear: '1996–2011',
    summary: '字体、颜色、盒模型、定位、媒体类型与层叠规则定型',
    code: `#content {
  width: 760px;
  margin: 0 auto;
}
.nav li { float: left; }`,
    notes: 'CSS1/2 建立选择器、层叠、盒模型与定位基础；布局长期依赖 table、float 和 position 等间接手段。',
  },
  {
    version: 'CSS3 Modules',
    releaseYear: 'Modular Era',
    summary: '媒体查询、Flexbox、Grid 与模块化规范演进',
    code: `.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}`,
    notes: 'CSS 不再以单一大版本发布，而是由选择器、颜色、布局等模块独立演进。',
  },
  {
    version: 'Modern CSS',
    releaseYear: '2020s',
    summary: '容器查询、级联层、:has()、嵌套与 OKLCH',
    code: `@layer components {
  .card:has(a:focus-visible) {
    outline: 0.2rem solid oklch(62% 0.2 265deg);
  }
}`,
    notes: '越来越多过去依赖预处理器或 JavaScript 的表达能力已经进入浏览器原生 CSS。',
  },
];
