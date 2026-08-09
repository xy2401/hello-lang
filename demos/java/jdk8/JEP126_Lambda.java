import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

public class JEP126_Lambda {
    public static void main(String[] args) {
        MathOperation add = (a, b) -> a + b;
        System.out.println("Lambda Math Operation (10 + 5) = " + add.operate(10, 5));

        List<String> names = Arrays.asList("Alice", "Bob", "Alex");
        List<String> result = names.stream()
                .filter(name -> name.startsWith("A"))
                .map(String::toUpperCase)
                .collect(Collectors.toList());
        System.out.println("Filtered names starting with A: " + result);
    }
}
