#include <iostream>
#include <vector>
#include <algorithm>
#include <cassert>

int knapsack01(int W, const std::vector<int>& weights, const std::vector<int>& values) {
    int n = weights.size();
    std::vector<int> dp(W + 1, 0);

    for (int i = 0; i < n; ++i) {
        for (int w = W; w >= weights[i]; --w) {
            dp[w] = std::max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[W];
}

int main() {
    std::cout << "=== C++ 0/1 Knapsack Dynamic Programming ===" << std::endl;
    std::vector<int> weights = {2, 3, 4, 5};
    std::vector<int> values = {3, 4, 5, 6};
    int W = 5;

    int max_val = knapsack01(W, weights, values);
    assert(max_val == 7);

    std::cout << "Max knapsack value for W=5: " << max_val << std::endl;
    std::cout << "C++ Knapsack DP tests passed successfully." << std::endl;
    return 0;
}
