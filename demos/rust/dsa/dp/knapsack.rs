fn knapsack_01(capacity: usize, weights: &[usize], values: &[usize]) -> usize {
    let mut dp = vec![0; capacity + 1];
    for (&w, &v) in weights.iter().zip(values.iter()) {
        for j in (w..=capacity).rev() {
            dp[j] = dp[j].max(dp[j - w] + v);
        }
    }
    dp[capacity]
}

fn main() {
    println!("=== Rust 0/1 Knapsack Dynamic Programming ===");
    let weights = [2, 3, 4, 5];
    let values = [3, 4, 5, 6];
    let max_val = knapsack_01(5, &weights, &values);
    assert_eq!(max_val, 7);
    println!("Knapsack result: {}", max_val);
    println!("Rust DP Knapsack tests passed successfully.");
}
