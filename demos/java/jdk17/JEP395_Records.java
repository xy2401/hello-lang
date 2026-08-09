record UserRecord(long id, String username, String role) {}

public class JEP395_Records {
    public static void main(String[] args) {
        UserRecord user = new UserRecord(101, "Alice", "ADMIN");
        System.out.println("Record " + user);
        System.out.println("Equals check: " + user.equals(new UserRecord(101, "Alice", "ADMIN")));
        System.out.println("Accessor role(): " + user.role());
    }
}
