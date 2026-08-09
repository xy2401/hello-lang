import java.util.random.RandomGenerator;
import java.util.random.RandomGeneratorFactory;

public class JEP356_RandomGenerators {
    public static void main(String[] args) {
        RandomGenerator generator = RandomGeneratorFactory.of("L128X128MixRandom").create();
        int val = generator.nextInt(1, 1000);
        System.out.println("RandomGeneratorFactory (L128X128MixRandom):");
        System.out.println("Generated pseudo-random int: " + val);
    }
}
