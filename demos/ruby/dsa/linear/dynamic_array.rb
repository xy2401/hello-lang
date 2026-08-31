puts "=== Ruby Array & Deque Demo ==="
arr = [10, 20]
arr.push(30)
raise "Size error" unless arr.length == 3
raise "Index error" unless arr[1] == 20
raise "Pop error" unless arr.pop == 30

deque = ["center"]
deque.unshift("front")
deque.push("back")
raise "Deque error" unless deque.first == "front" && deque.last == "back"

puts "Ruby Array: #{arr}, Deque: #{deque}"
puts "Ruby Dynamic Array tests passed successfully."
