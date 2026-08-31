local function make_counter(start)
  local value = start
  return function(step)
    value = value + step
    return value
  end
end

local object = setmetatable({ name = "Ada" }, {
  __tostring = function(value) return "user:" .. value.name end,
})
local counter = make_counter(10)

print("table=" .. tostring(object))
print("closure=" .. counter(2) .. "," .. counter(3))
print("module=" .. math.type(3))

