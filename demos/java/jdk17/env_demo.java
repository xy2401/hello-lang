public class env_demo {
    public static void main(String[] args) {
        System.out.println(System.getProperty("java.runtime.name") + " (build " + System.getProperty("java.runtime.version") + ")");
        System.out.println(System.getProperty("java.vm.name") + " (build " + System.getProperty("java.vm.version") + ")");
    }
}
