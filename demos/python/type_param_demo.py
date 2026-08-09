# Python 3.12 PEP 695 Type Parameter Syntax
class Stack[T]:
    def __init__(self):
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

s = Stack[int]()
s.push(10)
s.push(20)
s.push(30)

print(f"Generic Stack[int]: {s._items}")
popped = s.pop()
print(f"Popped: {popped}")
print(f"Stack type: {type(popped)}")
