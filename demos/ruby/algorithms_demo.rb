def bfs(graph, start)
  order = []
  seen = {}
  queue = [start]
  until queue.empty?
    node = queue.shift
    next if seen[node]

    seen[node] = true
    order << node
    queue.concat(graph.fetch(node, []))
  end
  order
end

scores = [["Lin", 91], ["Ada", 95], ["Kai", 91]]
ranked = scores.sort_by { |name, score| [-score, name] }
numbers = [2, 5, 8, 13, 21]
graph = { "A" => %w[B C], "B" => ["D"], "C" => ["D"] }

puts "sorted=#{ranked.map { |name, score| "#{name}:#{score}" }.join(',')}"
puts "binary-search-13=#{numbers.bsearch_index { |value| value >= 13 }}"
puts "bfs=#{bfs(graph, 'A').join(',')}"
