public class JEP122_Metaspace {
    public static void main(String[] args) {
        System.out.println("Metaspace JVM Info:");
        System.out.println("PermGen Removed -> Native Memory Metaspace Active.");
        System.out.println("MaxMetaspaceSize: Unlimited (Native RAM)");
    }
}
