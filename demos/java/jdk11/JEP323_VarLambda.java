import java.util.function.BiFunction;

public class JEP323_VarLambda {
    public static void main(String[] args) {
        // Var in Lambda parameter list (JEP 323)
        BiFunction<String, String, String> concat = (@Deprecated var a, var b) -> a + " " + b;
        System.out.println("Var in Lambda with Annotations:");
        System.out.println("BiFunction: (@Deprecated var a, var b) -> a + \" \" + b");
        System.out.println("Result: " + concat.apply("Hello", "JDK 11"));
    }
}
