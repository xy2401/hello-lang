import kotlin.math.max

fun knapsack(capacity: Int, weights: IntArray, values: IntArray): Int {
    val dp = IntArray(capacity + 1)
    for (i in weights.indices) {
        for (w in capacity downTo weights[i]) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
        }
    }
    return dp[capacity]
}

fun main() {
    println("=== Kotlin 0/1 Knapsack DP ===")
    val weights = intArrayOf(2, 3, 4, 5)
    val values = intArrayOf(3, 4, 5, 6)
    val maxVal = knapsack(5, weights, values)
    check(maxVal == 7) { "Knapsack failed" }

    println("Max Knapsack Value: $maxVal")
    println("Kotlin Knapsack DP tests passed successfully.")
}
