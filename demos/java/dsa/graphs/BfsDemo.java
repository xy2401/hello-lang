import java.util.*;

public class BfsDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Graph BFS Traversal ===");
        Map<Integer, List<Integer>> graph = new HashMap<>();
        graph.put(0, Arrays.asList(1, 2));
        graph.put(1, Arrays.asList(3));
        graph.put(2, Arrays.asList(4));
        graph.put(3, Collections.emptyList());
        graph.put(4, Collections.emptyList());

        List<Integer> order = new ArrayList<>();
        Queue<Integer> q = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();

        q.offer(0);
        visited.add(0);

        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int v : graph.getOrDefault(u, Collections.emptyList())) {
                if (!visited.contains(v)) {
                    visited.add(v);
                    q.offer(v);
                }
            }
        }

        if (order.size() != 5) throw new RuntimeException("BFS traversal count failed");
        System.out.println("BFS Traversal Order: " + order);
        System.out.println("Java Graph BFS tests passed successfully.");
    }
}
