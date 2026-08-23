public class JEP507_PrimitivePatterns {
    public static void main(String[] args) {
        int val = 42;
        String result = switch (val) {
            case byte b -> "byte " + b;
            case int i when i > 10 -> "large int " + i;
            case int i -> "small int " + i;
        };
        System.out.println("Primitive Types in Pattern Matching:");
        System.out.println("switch(val = 42) -> " + result);
    }
}
