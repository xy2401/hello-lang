public class QuickSortDemo {
    static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivot = arr[high];
            int i = low - 1;
            for (int j = low; j < high; j++) {
                if (arr[j] <= pivot) {
                    i++;
                    int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
                }
            }
            int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
            int pi = i + 1;
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Java Dual-Pivot QuickSort & In-Place Sort ===");
        int[] data = {64, 25, 12, 22, 11};
        quickSort(data, 0, data.length - 1);

        for (int i = 0; i < data.length - 1; i++) {
            if (data[i] > data[i + 1]) throw new RuntimeException("Not sorted");
        }
        System.out.println("Java QuickSort tests passed successfully.");
    }
}
