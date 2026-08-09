import java.util.Optional;

public class OptionalDemo {
    public static void main(String[] args) {
        String username = null;
        String name = Optional.ofNullable(username)
                .map(String::toUpperCase)
                .orElse("DEFAULT_GUEST");
        System.out.println("Optional Processed Name: " + name);
    }
}
