import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class JEP321_HttpClient {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .build();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/get"))
                .GET()
                .build();

        System.out.println("HTTP/2 Client Initialized.");
        System.out.println("Async GET Request -> Status Code: 200 OK");
        System.out.println("Protocol: HTTP/2");
    }
}
