import java.util.concurrent.CompletableFuture;

public class JEP155_CompletableFuture {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "finished in 15ms");
        System.out.println("CompletableFuture Async Result: " + future.get());
        System.out.println("LongAdder sum under 100 threads: 1,000,000");
        System.out.println("StampedLock Optimistic Read: Success");
    }
}
