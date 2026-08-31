using System;
using System.Collections.Generic;

namespace DataStructuresTopic;

public sealed record Node<T>(T Value, IReadOnlyList<Node<T>> Children);

public static class Program
{
    public static void Main()
    {
        var values = new List<string> { "parse", "validate", "render" };
        var scores = new Dictionary<string, int> { ["Ada"] = 95, ["Lin"] = 91 };
        var tags = new HashSet<string> { "docs", "code", "docs" };
        var tasks = new PriorityQueue<string, int>();
        tasks.Enqueue("docs", 2);
        tasks.Enqueue("tests", 1);
        var tree = new Node<string>("root", new[] { new Node<string>("child", Array.Empty<Node<string>>()) });

        Console.WriteLine($"list={string.Join(',', values)}");
        Console.WriteLine($"scores=Ada:{scores["Ada"]},Lin:{scores["Lin"]}");
        Console.WriteLine($"tags={tags.Count}");
        Console.WriteLine($"next={tasks.Dequeue()}");
        Console.WriteLine($"tree-children={tree.Children.Count}");
    }
}
