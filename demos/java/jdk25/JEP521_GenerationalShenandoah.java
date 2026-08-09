public class JEP521_GenerationalShenandoah {
    public static void main(String[] args) {
        System.out.println("JEP 521 Generational Shenandoah GC (-XX:+UseShenandoahGC -XX:ShenandoahGCMode=generational):");
        System.out.println("Young & Old generation separated for Shenandoah GC.");
        System.out.println("Sub-millisecond pause times preserved with +50% throughput!");
    }
}
