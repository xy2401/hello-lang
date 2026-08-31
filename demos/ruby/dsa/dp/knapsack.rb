def knapsack(capacity, weights, values)
  dp = Array.new(capacity + 1, 0)
  weights.each_with_index do |w, i|
    capacity.downto(w) do |j|
      dp[j] = [dp[j], dp[j - w] + values[i]].max
    end
  end
  dp[capacity]
end

puts "=== Ruby 0/1 Knapsack DP ==="
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
max_val = knapsack(5, weights, values)
raise "Knapsack error" unless max_val == 7

puts "Max Knapsack Value: #{max_val}"
puts "Ruby Knapsack DP tests passed successfully."
