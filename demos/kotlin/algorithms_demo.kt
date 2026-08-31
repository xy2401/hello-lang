data class Score(val name: String, val value: Int)

fun bfs(graph: Map<String, List<String>>, start: String): List<String> {
    val order = mutableListOf<String>()
    val seen = mutableSetOf<String>()
    val queue = ArrayDeque(listOf(start))
    while (queue.isNotEmpty()) {
        val node = queue.removeFirst()
        if (!seen.add(node)) continue
        order += node
        queue.addAll(graph[node].orEmpty())
    }
    return order
}

fun main() {
    val ranked = listOf(Score("Lin", 91), Score("Ada", 95), Score("Kai", 91))
        .sortedWith(compareByDescending<Score> { it.value }.thenBy { it.name })
    val numbers = listOf(2, 5, 8, 13, 21)
    val graph = mapOf("A" to listOf("B", "C"), "B" to listOf("D"), "C" to listOf("D"))

    println("sorted=${ranked.joinToString(",") { "${it.name}:${it.value}" }}")
    println("binary-search-13=${numbers.binarySearch(13)}")
    println("bfs=${bfs(graph, "A").joinToString(",")}")
}
