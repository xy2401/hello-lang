using System;

public class KnapsackDemo
{
    public static int Knapsack(int W, int[] weights, int[] values)
    {
        int[] dp = new int[W + 1];
        for (int i = 0; i < weights.Length; i++)
        {
            for (int w = W; w >= weights[i]; w--)
            {
                dp[w] = Math.Max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        return dp[W];
    }

    public static void Main()
    {
        Console.WriteLine("=== C# 0/1 Knapsack DP ===");
        int[] weights = { 2, 3, 4, 5 };
        int[] values = { 3, 4, 5, 6 };
        int maxVal = Knapsack(5, weights, values);

        if (maxVal != 7) throw new Exception("Knapsack failed");
        Console.WriteLine("Max Value: " + maxVal);
        Console.WriteLine("C# Knapsack DP tests passed successfully.");
    }
}
