import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Collectors;

public class StringFilesDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("String API Enhancements:");
        System.out.println("\" \".isBlank(): " + " ".isBlank());
        System.out.println("\"A\\nB\\nC\".lines(): " + "A\nB\nC".lines().collect(Collectors.toList()));
        System.out.println("\"  hello  \".strip(): \"" + "  hello  ".strip() + "\"");

        Path tempFile = Files.createTempFile("jdk11_test", ".txt");
        Files.writeString(tempFile, "Hello JDK 11 Files.writeString");
        String content = Files.readString(tempFile);
        System.out.println("Files.readString() / writeString(): Success -> " + content);
    }
}
