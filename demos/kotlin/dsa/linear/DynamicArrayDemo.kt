fun main() {
    println("=== Kotlin ArrayList & ArrayDeque ===")
    val list = mutableListOf(10, 20)
    list.add(30)
    check(list.size == 3) { "Size assertion failed" }
    check(list[1] == 20) { "Index assertion failed" }

    val deque = ArrayDeque<String>()
    deque.addFirst("first")
    deque.addLast("last")
    check(deque.first() == "first" && deque.last() == "last")

    println("Kotlin List: $list, Deque: $deque")
    println("Kotlin Dynamic Array tests passed successfully.")
}
