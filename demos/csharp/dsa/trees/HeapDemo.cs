using System;
using System.Collections.Generic;

public class HeapDemo
{
    public static void Main()
    {
        Console.WriteLine("=== C# PriorityQueue<TElement, TPriority> ===");
        var pq = new PriorityQueue<string, int>();
        pq.Enqueue("Low Priority", 30);
        pq.Enqueue("High Priority", 10);
        pq.Enqueue("Medium Priority", 20);

        string first = pq.Dequeue();
        if (first != "High Priority") throw new Exception("PriorityQueue failed");

        Console.WriteLine($"Dequeued highest priority element: {first}");
        Console.WriteLine("C# PriorityQueue tests passed successfully.");
    }
}
