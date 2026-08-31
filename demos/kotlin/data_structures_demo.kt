import java.util.PriorityQueue

data class Task(val name: String, val priority: Int)
sealed interface Tree<out T> {
    data class Leaf<T>(val value: T) : Tree<T>
    data class Branch<T>(val value: T, val children: List<Tree<T>>) : Tree<T>
}

fun main() {
    val values: List<String> = listOf("parse", "validate", "render")
    val mutable = ArrayDeque(values)
    val scores = linkedMapOf("Ada" to 95, "Lin" to 91)
    val tasks = PriorityQueue<Task>(compareBy(Task::priority))
    tasks += Task("docs", 2)
    tasks += Task("tests", 1)
    val tree: Tree<String> = Tree.Branch("root", listOf(Tree.Leaf("child")))

    println("list=${values.joinToString(",")}")
    println("queue-first=${mutable.removeFirst()}")
    println("scores=${scores.entries.joinToString(",") { "${it.key}:${it.value}" }}")
    println("next=${tasks.remove().name}")
    val childCount = (tree as Tree.Branch<String>).children.size
    println("tree=branch:$childCount")
}
