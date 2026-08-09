record Point(int x, int y) {}
record Rectangle(Point topLeft, Point bottomRight) {}

public class JEP440_RecordPatterns {
    public static void main(String[] args) {
        Object obj = new Rectangle(new Point(0, 0), new Point(100, 200));
        if (obj instanceof Rectangle(Point(int x1, int y1), Point(int x2, int y2))) {
            int area = Math.abs(x2 - x1) * Math.abs(y2 - y1);
            System.out.println("Deconstructed Record Pattern:");
            System.out.println("Rectangle TopLeft(" + x1 + "," + y1 + "), BottomRight(" + x2 + "," + y2 + ")");
            System.out.println("Calculated Area = " + area);
        }
    }
}
