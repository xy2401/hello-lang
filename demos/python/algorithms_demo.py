from bisect import bisect_left
from collections import deque


def bfs(graph: dict[str, list[str]], start: str) -> list[str]:
    order: list[str] = []
    seen: set[str] = set()
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node in seen:
            continue
        seen.add(node)
        order.append(node)
        queue.extend(graph.get(node, []))
    return order


scores = [("Lin", 91), ("Ada", 95), ("Kai", 91)]
ranked = sorted(scores, key=lambda item: (-item[1], item[0]))
numbers = [2, 5, 8, 13, 21]
graph = {"A": ["B", "C"], "B": ["D"], "C": ["D"]}

print(f"sorted={ranked}")
print(f"binary-search-13={bisect_left(numbers, 13)}")
print(f"bfs={bfs(graph, 'A')}")
