public class HeapDemo {
    public static void main(String[] args) {
        System.out.println("=== Java PriorityQueue (Min/Max Heap) ===");
        java.util.PriorityQueue<Integer> minHeap = new java.util.PriorityQueue<>();
        minHeap.offer(50);
        minHeap.offer(15);
        minHeap.offer(30);

        if (minHeap.peek() != 15) throw new RuntimeException("Heap peek failed");
        if (minHeap.poll() != 15) throw new RuntimeException("Heap poll failed");
        if (minHeap.poll() != 30) throw new RuntimeException("Heap poll failed");
        if (minHeap.poll() != 50) throw new RuntimeException("Heap poll failed");

        System.out.println("Java PriorityQueue tests passed successfully.");
    }
}
