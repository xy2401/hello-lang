<?php

function binarySearch(array $values, int $target): int {
    $low = 0;
    $high = count($values) - 1;
    while ($low <= $high) {
        $middle = intdiv($low + $high, 2);
        if ($values[$middle] === $target) return $middle;
        if ($values[$middle] < $target) $low = $middle + 1;
        else $high = $middle - 1;
    }
    return -1;
}

function bfs(array $graph, string $start): array {
    $order = [];
    $seen = [];
    $queue = new SplQueue();
    $queue->enqueue($start);
    while (!$queue->isEmpty()) {
        $node = $queue->dequeue();
        if (isset($seen[$node])) continue;
        $seen[$node] = true;
        $order[] = $node;
        foreach ($graph[$node] ?? [] as $next) $queue->enqueue($next);
    }
    return $order;
}

$scores = [['name' => 'Lin', 'score' => 91], ['name' => 'Ada', 'score' => 95], ['name' => 'Kai', 'score' => 91]];
usort($scores, fn ($a, $b) => $b['score'] <=> $a['score'] ?: $a['name'] <=> $b['name']);
$numbers = [2, 5, 8, 13, 21];
$graph = ['A' => ['B', 'C'], 'B' => ['D'], 'C' => ['D']];

echo 'sorted=' . implode(',', array_map(fn ($x) => "{$x['name']}:{$x['score']}", $scores)) . "\n";
echo 'binary-search-13=' . binarySearch($numbers, 13) . "\n";
echo 'bfs=' . implode(',', bfs($graph, 'A')) . "\n";
