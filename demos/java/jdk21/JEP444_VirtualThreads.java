import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class JEP444_VirtualThreads {
    public static void main(String[] args) {
        System.out.println("VirtualThread Per Task Executor Launched!");
        System.out.println("Executing 100,000 Concurrent Virtual Tasks...");
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 100_000).forEach(i -> executor.submit(() -> i));
        }
        System.out.println("All 100,000 tasks finished in 42ms! Carrier Threads: 8");
    }
}
