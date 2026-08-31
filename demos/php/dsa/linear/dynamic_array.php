<?php
echo "=== PHP Dynamic Arrays & SplDoublyLinkedList ===\n";
$arr = [10, 20];
$arr[] = 30;
assert(count($arr) === 3);
assert($arr[1] === 20);

$dll = new SplDoublyLinkedList();
$dll->push("tail");
$dll->unshift("head");
assert($dll->bottom() === "head");
assert($dll->top() === "tail");

echo "PHP Array count: " . count($arr) . ", DLL count: " . $dll->count() . "\n";
echo "PHP Dynamic Array tests passed successfully.\n";
