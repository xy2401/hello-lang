public class LinkedListDemo {
    public static void main(String[] args) {
        System.out.println("=== Java LinkedList & Deque Demo ===");
        java.util.LinkedList<String> list = new java.util.LinkedList<>();
        list.addFirst("first");
        list.addLast("last");

        if (!list.getFirst().equals("first") || !list.getLast().equals("last")) {
            throw new RuntimeException("LinkedList assertion failed");
        }

        System.out.println("Java LinkedList elements: " + list);
        System.out.println("Java LinkedList tests passed successfully.");
    }
}
