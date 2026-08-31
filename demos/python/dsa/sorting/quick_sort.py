def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

def main():
    print("=== Python Functional QuickSort & TimSort ===")
    data = [64, 25, 12, 22, 11]
    sorted_data = quick_sort(data)
    assert sorted_data == [11, 12, 22, 25, 64]
    assert sorted(data) == sorted_data

    print(f"Sorted data: {sorted_data}")
    print("Python QuickSort tests passed successfully.")

if __name__ == "__main__":
    main()
