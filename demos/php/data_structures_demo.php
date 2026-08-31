<?php

final readonly class Node {
    /** @param list<Node> $children */
    public function __construct(public string $value, public array $children = []) {}
}

$orderedMap = ['Ada' => 95, 'Lin' => 91];
$queue = new SplQueue();
$queue->enqueue('parse');
$queue->enqueue('render');
$heap = new SplPriorityQueue();
$heap->setExtractFlags(SplPriorityQueue::EXTR_BOTH);
$heap->insert('docs', -2);
$heap->insert('tests', -1);
$tree = new Node('root', [new Node('left'), new Node('right')]);

echo 'map=' . implode(',', array_map(fn ($k, $v) => "$k:$v", array_keys($orderedMap), $orderedMap)) . "\n";
echo 'queue-first=' . $queue->dequeue() . "\n";
echo 'next=' . $heap->extract()['data'] . "\n";
echo 'tree-children=' . count($tree->children) . "\n";
