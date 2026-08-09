public class JEP519_CompactObjectHeaders {
    public static void main(String[] args) {
        System.out.println("JEP 519 Compact Object Headers (-XX:+UseCompactObjectHeaders):");
        System.out.println("Object header compressed from 128-bit (16B) to 64-bit (8B)!");
        System.out.println("JVM Heap footprint reduced by up to 20%!");
    }
}
