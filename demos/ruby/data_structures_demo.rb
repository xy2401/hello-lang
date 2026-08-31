require "set"

Node = Data.define(:value, :children)

values = ["parse", "validate", "render"]
scores = { "Ada" => 95, "Lin" => 91 }
tags = Set.new(%w[docs code docs])
queue = values.dup
tree = Node.new("root", [Node.new("left", []), Node.new("right", [])])

puts "array=#{values.join(',')}"
puts "queue-first=#{queue.shift}"
puts "scores=#{scores.map { |key, value| "#{key}:#{value}" }.join(',')}"
puts "tags=#{tags.to_a.sort.join(',')}"
puts "tree-children=#{tree.children.length}"
