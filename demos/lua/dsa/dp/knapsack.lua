local function knapsack(W, weights, values)
    local dp = {}
    for i = 0, W do dp[i] = 0 end

    for i = 1, #weights do
        local w = weights[i]
        local v = values[i]
        for j = W, w, -1 do
            local candidate = dp[j - w] + v
            if candidate > dp[j] then
                dp[j] = candidate
            end
        end
    end
    return dp[W]
end

print("=== Lua 0/1 Knapsack DP ===")
local weights = {2, 3, 4, 5}
local values = {3, 4, 5, 6}
local max_val = knapsack(5, weights, values)
assert(max_val == 7, "Knapsack assertion failed")

print("Max Knapsack Value for W=5: " .. max_val)
print("Lua Knapsack DP tests passed successfully.")
