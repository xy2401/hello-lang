public class RecordDemo {
    public record UserRecord(long id, String username, String role) {}

    public static void main(String[] args) {
        UserRecord user1 = new UserRecord(101, "Alice", "ADMIN");
        UserRecord user2 = new UserRecord(101, "Alice", "ADMIN");
        System.out.println(user1);
        System.out.println("Equals check: " + user1.equals(user2));
        System.out.println("Role: " + user1.role());
    }
}
