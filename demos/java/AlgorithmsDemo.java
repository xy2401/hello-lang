import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class AlgorithmsDemo {
    record Score(String name, int value) {}

    static List<String> bfs(Map<String, List<String>> graph, String start) {
        var visited = new ArrayList<String>();
        var queue = new ArrayDeque<String>();
        queue.add(start);
        while (!queue.isEmpty()) {
            String node = queue.remove();
            if (visited.contains(node)) continue;
            visited.add(node);
            queue.addAll(graph.getOrDefault(node, List.of()));
        }
        return visited;
    }

    public static void main(String[] args) {
        var scores = new ArrayList<>(List.of(
            new Score("Lin", 91), new Score("Ada", 95), new Score("Kai", 91)
        ));
        scores.sort(Comparator.comparingInt(Score::value).reversed().thenComparing(Score::name));

        var numbers = List.of(2, 5, 8, 13, 21);
        int index = java.util.Collections.binarySearch(numbers, 13);

        Map<String, List<String>> graph = new LinkedHashMap<>();
        graph.put("A", List.of("B", "C"));
        graph.put("B", List.of("D"));
        graph.put("C", List.of("D"));

        System.out.println("sorted=" + scores);
        System.out.println("binary-search-13=" + index);
        System.out.println("bfs=" + bfs(graph, "A"));
    }
}
