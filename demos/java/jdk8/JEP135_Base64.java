import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class JEP135_Base64 {
    public static void main(String[] args) {
        String original = "Hello Java 8 Base64";
        String encoded = Base64.getEncoder().encodeToString(original.getBytes(StandardCharsets.UTF_8));
        byte[] decodedBytes = Base64.getDecoder().decode(encoded);
        String decoded = new String(decodedBytes, StandardCharsets.UTF_8);

        System.out.println("Base64 Encoded: " + encoded);
        System.out.println("Base64 Decoded: " + decoded);
    }
}
