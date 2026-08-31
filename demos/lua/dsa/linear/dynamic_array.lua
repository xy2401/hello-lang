print("=== Lua Table as Dynamic Array ===")
local arr = {10, 20}
table.insert(arr, 30)

assert(#arr == 3, "Length assertion failed")
assert(arr[2] == 20, "Index assertion failed")
local popped = table.remove(arr)
assert(popped == 30, "Remove assertion failed")

print(string.format("Lua Table len=%d, elements=[%d, %d]", #arr, arr[1], arr[2]))
print("Lua Dynamic Array tests passed successfully.")
