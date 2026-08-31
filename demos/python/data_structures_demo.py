from collections import deque
from dataclasses import dataclass
import heapq


@dataclass(frozen=True)
class Node:
    value: str
    children: tuple["Node", ...] = ()


items = ["parse", "validate", "render"]
queue = deque(items)
scores = {"Ada": 95, "Lin": 91}
tags = {"docs", "code", "docs"}
tasks = [(2, "docs"), (1, "tests")]
heapq.heapify(tasks)
tree = Node("root", (Node("left"), Node("right")))

print(f"list={items}")
print(f"queue-first={queue.popleft()}")
print(f"scores={list(scores.items())}")
print(f"tags={sorted(tags)}")
print(f"next={heapq.heappop(tasks)[1]}")
print(f"tree-children={len(tree.children)}")
