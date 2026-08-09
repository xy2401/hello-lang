public class JEP394_PatternInstanceOf {
    public static void main(String[] args) {
        Object obj = "Hello Pattern InstanceOf";
        if (obj instanceof String s) {
            System.out.println("Pattern Matching instanceof:");
            System.out.println("if (obj instanceof String s) -> s.length(): " + s.length());
        }
    }
}
