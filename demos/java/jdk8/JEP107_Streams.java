import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class JEP107_Streams {
    public static void main(String[] args) {
        System.out.println("Stream Pipeline:");
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        int parallelSum = numbers.parallelStream()
                .filter(n -> n % 2 == 0)
                .mapToInt(n -> n * n)
                .sum();
        System.out.println("Parallel Stream Sum: " + parallelSum);

        Map<String, List<Integer>> partitioned = numbers.stream()
                .collect(Collectors.groupingBy(n -> n % 2 == 0 ? "EVEN" : "ODD"));
        System.out.println("Collector Map: " + partitioned);
    }
}
