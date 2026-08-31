using System;

public class QuickSortDemo
{
    public static void QuickSort(Span<int> arr)
    {
        if (arr.Length <= 1) return;
        int pivot = arr[arr.Length - 1];
        int i = 0;
        for (int j = 0; j < arr.Length - 1; j++)
        {
            if (arr[j] <= pivot)
            {
                (arr[i], arr[j]) = (arr[j], arr[i]);
                i++;
            }
        }
        (arr[i], arr[arr.Length - 1]) = (arr[arr.Length - 1], arr[i]);
        QuickSort(arr.Slice(0, i));
        QuickSort(arr.Slice(i + 1));
    }

    public static void Main()
    {
        Console.WriteLine("=== C# Span<T> In-Place QuickSort ===");
        int[] data = { 64, 25, 12, 22, 11 };
        QuickSort(data.AsSpan());

        for (int i = 0; i < data.Length - 1; i++)
        {
            if (data[i] > data[i + 1]) throw new Exception("Not sorted");
        }

        Console.WriteLine("Sorted: " + string.Join(", ", data));
        Console.WriteLine("C# QuickSort tests passed successfully.");
    }
}
