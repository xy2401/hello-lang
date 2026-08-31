import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class DataStructuresDemo {
    record Task(String name, int priority) implements Comparable<Task> {
        public int compareTo(Task other) {
            return Integer.compare(priority, other.priority);
        }
    }

    record Node<T>(T value, List<Node<T>> children) {}

    public static void main(String[] args) {
        List<String> queue = new ArrayList<>(List.of("parse", "validate", "render"));
        Map<String, Integer> counts = new LinkedHashMap<>();
        queue.forEach(step -> counts.merge(step.substring(0, 1), 1, Integer::sum));

        PriorityQueue<Task> tasks = new PriorityQueue<>();
        tasks.add(new Task("docs", 2));
        tasks.add(new Task("tests", 1));

        Node<String> tree = new Node<>("root", List.of(
            new Node<>("left", List.of()), new Node<>("right", List.of())
        ));

        System.out.println("list=" + queue);
        System.out.println("counts=" + counts);
        System.out.println("next=" + tasks.remove().name());
        System.out.println("tree-children=" + tree.children().size());
    }
}
