public class BinarySearchDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Arrays.binarySearch ===");
        int[] arr = {10, 20, 30, 40, 50};
        int idx = java.util.Arrays.binarySearch(arr, 30);
        if (idx != 2) throw new RuntimeException("Search failed");

        System.out.println("Binary search index for 30: " + idx);
        System.out.println("Java Binary Search tests passed successfully.");
    }
}
