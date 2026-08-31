<?php
function knapsack(int $W, array $weights, array $values): int {
    $dp = array_fill(0, $W + 1, 0);
    $n = count($weights);
    for ($i = 0; $i < $n; $i++) {
        for ($w = $W; $w >= $weights[$i]; $w--) {
            $dp[$w] = max($dp[$w], $dp[$w - $weights[$i]] + $values[$i]);
        }
    }
    return $dp[$W];
}

echo "=== PHP 0/1 Knapsack DP ===\n";
$weights = [2, 3, 4, 5];
$values = [3, 4, 5, 6];
$maxVal = knapsack(5, $weights, $values);
assert($maxVal === 7);
echo "Max Knapsack Value: $maxVal\n";
echo "PHP Knapsack DP tests passed successfully.\n";
