public class JEP378_TextBlocks {
    public static void main(String[] args) {
        String json = """
            {
              "status": "success",
              "code": 200,
              "message": "Hello Multi-line Text Block"
            }
            """;
        System.out.println("Multi-line Text Block JSON:");
        System.out.println(json.trim());
    }
}
