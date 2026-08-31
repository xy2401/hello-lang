<?php
echo "=== PHP SplPriorityQueue (Max Heap) ===\n";
$pq = new SplPriorityQueue();
$pq->insert("Task Low", 10);
$pq->insert("Task High", 50);
$pq->insert("Task Mid", 30);

assert($pq->top() === "Task High");
assert($pq->extract() === "Task High");
assert($pq->extract() === "Task Mid");
assert($pq->extract() === "Task Low");

echo "PHP SplPriorityQueue tests passed successfully.\n";
