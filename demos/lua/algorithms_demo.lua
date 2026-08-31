local function binary_search(values, target)
  local low, high = 1, #values
  while low <= high do
    local middle = (low + high) // 2
    if values[middle] == target then return middle end
    if values[middle] < target then low = middle + 1 else high = middle - 1 end
  end
  return nil
end

local function bfs(graph, start)
  return coroutine.wrap(function()
    local queue, head, seen = { start }, 1, { [start] = true }
    while head <= #queue do
      local node = queue[head]
      head = head + 1
      coroutine.yield(node)
      for _, neighbor in ipairs(graph[node]) do
        if not seen[neighbor] then
          seen[neighbor] = true
          queue[#queue + 1] = neighbor
        end
      end
    end
  end)
end

local records = {
  { key = 1, tag = "one-a", order = 1 },
  { key = 2, tag = "two", order = 2 },
  { key = 1, tag = "one-b", order = 3 },
}
table.sort(records, function(left, right)
  return left.key < right.key or (left.key == right.key and left.order < right.order)
end)

local values = { 5, 2, 8, 2, 1 }
table.sort(values)
local traversal = {}
for node in bfs({ A = { "B", "C" }, B = { "D" }, C = { "E" }, D = {}, E = {} }, "A") do
  traversal[#traversal + 1] = node
end

print("sorted=" .. table.concat(values, ","))
print("stable=" .. table.concat({ records[1].tag, records[2].tag, records[3].tag }, ","))
print("binary-search(5)=" .. binary_search(values, 5))
print("bfs=" .. table.concat(traversal, ","))
print("style=1-based indexing plus coroutine iterator")

