using System;
using System.Collections.Generic;
using System.Linq;

namespace AlgorithmsTopic;

public sealed record Score(string Name, int Value);

public static class Program
{
    private static IReadOnlyList<string> Bfs(IReadOnlyDictionary<string, string[]> graph, string start)
    {
        var order = new List<string>();
        var seen = new HashSet<string>();
        var queue = new Queue<string>();
        queue.Enqueue(start);
        while (queue.TryDequeue(out var node))
        {
            if (!seen.Add(node)) continue;
            order.Add(node);
            if (graph.TryGetValue(node, out var next))
                foreach (var value in next) queue.Enqueue(value);
        }
        return order;
    }

    public static void Main()
    {
        var ranked = new[] { new Score("Lin", 91), new Score("Ada", 95), new Score("Kai", 91) }
            .OrderByDescending(item => item.Value).ThenBy(item => item.Name);
        var numbers = new List<int> { 2, 5, 8, 13, 21 };
        var graph = new Dictionary<string, string[]> { ["A"] = ["B", "C"], ["B"] = ["D"], ["C"] = ["D"] };

        Console.WriteLine("sorted=" + string.Join(',', ranked.Select(item => $"{item.Name}:{item.Value}")));
        Console.WriteLine($"binary-search-13={numbers.BinarySearch(13)}");
        Console.WriteLine("bfs=" + string.Join(',', Bfs(graph, "A")));
    }
}
