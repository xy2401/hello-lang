import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class JEP150_DateTime {
    public static void main(String[] args) {
        LocalDate localDate = LocalDate.now();
        ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        System.out.println("LocalDate: " + localDate);
        System.out.println("ZonedDateTime Tokyo: " + tokyoTime);
        System.out.println("Period diff: 12 Years");
    }
}
