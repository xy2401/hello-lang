import heapq

def main():
    print("=== Python heapq Priority Queue ===")
    heap: list[int] = []
    heapq.heappush(heap, 50)
    heapq.heappush(heap, 15)
    heapq.heappush(heap, 30)

    assert heap[0] == 15
    assert heapq.heappop(heap) == 15
    assert heapq.heappop(heap) == 30
    assert heapq.heappop(heap) == 50

    print("Python heapq tests passed successfully.")

if __name__ == "__main__":
    main()
