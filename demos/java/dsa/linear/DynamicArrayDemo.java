public class DynamicArrayDemo {
    public static void main(String[] args) {
        System.out.println("=== Java ArrayList & Vector Demo ===");
        java.util.List<Integer> list = new java.util.ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);

        if (list.size() != 3 || list.get(1) != 20) {
            throw new RuntimeException("Assertion failed");
        }

        int sum = list.stream().mapToInt(Integer::intValue).sum();
        if (sum != 60) {
            throw new RuntimeException("Sum assertion failed");
        }

        System.out.println("Java ArrayList size=" + list.size() + ", sum=" + sum);
        System.out.println("Java Dynamic Array tests passed successfully.");
    }
}
