global release_line = "Lua 5.5"

local function named_varargs(first, ... rest)
  return first, rest
end

local first, rest = named_varargs("alpha", "beta", "gamma")
print("global=" .. release_line)
print("named-varargs=" .. first .. "," .. table.concat(rest, ","))
print("gc-mode=" .. collectgarbage("incremental"))

