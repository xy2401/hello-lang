fun <T : Comparable<T>> List<T>.quickSorted(): List<T> {
    if (size <= 1) return this
    val pivot = this[size / 2]
    val left = filter { it < pivot }
    val equal = filter { it == pivot }
    val right = filter { it > pivot }
    return left.quickSorted() + equal + right.quickSorted()
}

fun main() {
    println("=== Kotlin Functional QuickSort ===")
    val data = listOf(64, 25, 12, 22, 11)
    val sorted = data.quickSorted()
    check(sorted == listOf(11, 12, 22, 25, 64)) { "Sort failed" }

    println("Sorted: $sorted")
    println("Kotlin QuickSort tests passed successfully.")
}
