local function quick_sort(arr, low, high)
    if low >= high then return end
    local pivot = arr[high]
    local i = low - 1
    for j = low, high - 1 do
        if arr[j] <= pivot then
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]
        end
    end
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    local pi = i + 1
    quick_sort(arr, low, pi - 1)
    quick_sort(arr, pi + 1, high)
end

print("=== Lua In-Place QuickSort ===")
local data = {64, 25, 12, 22, 11}
quick_sort(data, 1, #data)

assert(data[1] == 11 and data[5] == 64, "Sort assertion failed")
print(string.format("Sorted: %d, %d, %d, %d, %d", data[1], data[2], data[3], data[4], data[5]))
print("Lua QuickSort tests passed successfully.")
