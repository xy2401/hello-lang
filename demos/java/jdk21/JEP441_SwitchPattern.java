public class JEP441_SwitchPattern {
    public static void main(String[] args) {
        Object obj = "Hello JDK 21 Switch Pattern";
        String formatted = switch (obj) {
            case Integer i -> String.format("int %d", i);
            case String s when s.length() > 5 -> "Long string matched: " + s;
            case String s -> "Short string: " + s;
            case null, default -> "Unknown";
        };
        System.out.println("Pattern Matching for switch with Guard when:");
        System.out.println(formatted);
    }
}
