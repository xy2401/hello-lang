using System;
using System.Collections.Generic;

public class DynamicArrayDemo
{
    public static void Main()
    {
        Console.WriteLine("=== C# List<T> & Span<T> Demo ===");
        var list = new List<int> { 10, 20 };
        list.Add(30);

        if (list.Count != 3 || list[1] != 20)
            throw new Exception("List assertion failed");

        list.RemoveAt(list.Count - 1);
        if (list.Count != 2)
            throw new Exception("Remove assertion failed");

        ReadOnlySpan<int> span = list.ToArray().AsSpan();
        int sum = 0;
        foreach (var val in span) sum += val;
        if (sum != 30) throw new Exception("Span sum failed");

        Console.WriteLine($"C# List size={list.Count}, sum={sum}");
        Console.WriteLine("C# Dynamic Array tests passed successfully.");
    }
}
