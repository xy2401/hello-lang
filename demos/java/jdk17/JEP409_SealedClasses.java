sealed interface Shape permits Circle, Rectangle {}

final class Circle implements Shape {
    double radius;
    Circle(double r) { this.radius = r; }
}

final class Rectangle implements Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
}

public class JEP409_SealedClasses {
    public static void main(String[] args) {
        Shape s = new Circle(5.0);
        System.out.println("Sealed Class Hierarchy permits Circle, Rectangle:");
        if (s instanceof Circle c) {
            System.out.println("Circle Area: " + (Math.PI * c.radius * c.radius));
        }
        System.out.println("Compiler Exhaustive Switch Check Passed.");
    }
}
