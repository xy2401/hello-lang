<?php
function quickSort(array $arr): array {
    if (count($arr) <= 1) return $arr;
    $pivot = $arr[intdiv(count($arr), 2)];
    $left = [];
    $equal = [];
    $right = [];
    foreach ($arr as $v) {
        if ($v < $pivot) $left[] = $v;
        elseif ($v > $pivot) $right[] = $v;
        else $equal[] = $v;
    }
    return array_merge(quickSort($left), $equal, quickSort($right));
}

echo "=== PHP Functional QuickSort ===\n";
$data = [64, 25, 12, 22, 11];
$sorted = quickSort($data);
assert($sorted === [11, 12, 22, 25, 64]);
echo "Sorted: " . implode(", ", $sorted) . "\n";
echo "PHP QuickSort tests passed successfully.\n";
