public class KnapsackDemo {
    public static int knapsack(int W, int[] weights, int[] values) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < weights.length; i++) {
            for (int w = W; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        return dp[W];
    }

    public static void main(String[] args) {
        System.out.println("=== Java 0/1 Knapsack DP ===");
        int[] weights = {2, 3, 4, 5};
        int[] values = {3, 4, 5, 6};
        int maxVal = knapsack(5, weights, values);

        if (maxVal != 7) throw new RuntimeException("Knapsack assertion failed");
        System.out.println("Max Knapsack Value: " + maxVal);
        System.out.println("Java Knapsack DP tests passed successfully.");
    }
}
