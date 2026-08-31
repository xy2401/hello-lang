def quick_sort(arr)
  return arr if arr.length <= 1
  pivot = arr[arr.length / 2]
  left = arr.select { |x| x < pivot }
  equal = arr.select { |x| x == pivot }
  right = arr.select { |x| x > pivot }
  quick_sort(left) + equal + quick_sort(right)
end

puts "=== Ruby Functional QuickSort ==="
data = [64, 25, 12, 22, 11]
sorted = quick_sort(data)
raise "Sort error" unless sorted == [11, 12, 22, 25, 64]

puts "Sorted: #{sorted}"
puts "Ruby QuickSort tests passed successfully."
