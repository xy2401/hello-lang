local Stack = {}
Stack.__index = Stack

function Stack.new()
  return setmetatable({ values = {} }, Stack)
end

function Stack:push(value)
  self.values[#self.values + 1] = value
end

function Stack:pop()
  return table.remove(self.values)
end

local stack = Stack.new()
stack:push("parse")
stack:push("render")

local scores = { alice = 3, bob = 5 }
local tree = { value = "root", left = { value = "left" }, right = { value = "right" } }
local set = { blue = true, green = true, red = true }

print("array=" .. table.concat({ 1, 2, 3 }, ","))
print(string.format("map=alice:%d,bob:%d", scores.alice, scores.bob))
print("set=" .. table.concat({ "blue", "green", "red" }, ","))
print(string.format("tree=%s(%s,%s)", tree.value, tree.left.value, tree.right.value))
print("stack=" .. stack:pop() .. "," .. stack:pop())
print("model=one table type plus metatables")

