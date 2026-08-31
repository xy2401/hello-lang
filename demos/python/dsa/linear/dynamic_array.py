from collections import deque

def main():
    print("=== Python list & collections.deque ===")
    arr: list[int] = [10, 20]
    arr.append(30)
    assert len(arr) == 3
    assert arr[1] == 20
    assert arr.pop() == 30

    dq: deque[str] = deque(["middle"])
    dq.appendleft("front")
    dq.append("back")
    assert list(dq) == ["front", "middle", "back"]

    print(f"Python list: {arr}, deque: {list(dq)}")
    print("Python Dynamic Array tests passed successfully.")

if __name__ == "__main__":
    main()
