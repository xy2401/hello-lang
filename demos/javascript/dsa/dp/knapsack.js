function knapsack01(W, weights, values) {
  const n = weights.length;
  const dp = new Int32Array(W + 1);

  for (let i = 0; i < n; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[W];
}

console.log("=== JavaScript 0/1 Knapsack DP ===");
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const maxVal = knapsack01(5, weights, values);
console.assert(maxVal === 7, "Knapsack assertion failed");
console.log("Max Knapsack Value for W=5:", maxVal);
console.log("JavaScript Knapsack DP tests passed successfully.");
