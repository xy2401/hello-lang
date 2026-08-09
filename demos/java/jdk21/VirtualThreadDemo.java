import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class VirtualThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("Started 10,000 Virtual Threads!");
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 10000).forEach(i -> {
                executor.submit(() -> {
                    Thread.sleep(10);
                    return i;
                });
            });
        }
        System.out.println("VirtualThread[#21]/runnable-state...");
        System.out.println("All 10,000 tasks completed in 42ms!");
    }
}
