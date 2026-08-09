import java.util.ArrayList;
import java.util.List;
import java.util.SequencedCollection;

public class JEP431_SequencedCollections {
    public static void main(String[] args) {
        SequencedCollection<String> list = new ArrayList<>(List.of("Alpha", "Beta", "Gamma"));
        list.addLast("Omega");
        System.out.println("SequencedCollection Operations:");
        System.out.println("First Element: " + list.getFirst());
        System.out.println("Last Element: " + list.getLast());
        System.out.println("Reversed View: " + list.reversed());
    }
}
