public class JEP439_GenerationalZGC {
    public static void main(String[] args) {
        System.out.println("Generational ZGC (-XX:+UseZGC -XX:+ZGenerational):");
        System.out.println("Young & Old Generation separated.");
        System.out.println("Throughput increased by 40%, pauses remains < 1ms!");
    }
}
