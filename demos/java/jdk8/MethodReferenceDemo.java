import java.util.Arrays;
import java.util.List;
import java.util.function.BiFunction;

public class MethodReferenceDemo {
    public static void main(String[] args) {
        // Static method reference
        BiFunction<String, Integer, String> sub = String::substring;
        System.out.println("Static Method Ref: " + sub.apply("HelloWorld", 5));

        // Instance method reference
        List<String> names = Arrays.asList("charlie", "alice", "bob");
        names.sort(String::compareToIgnoreCase);
        System.out.println("Sorted via Method Ref: " + names);
    }
}
