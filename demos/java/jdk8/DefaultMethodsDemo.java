interface Vehicle {
    default String getBrand() {
        return "Generic Vehicle";
    }

    static int getWheelCount() {
        return 4;
    }
}

public class DefaultMethodsDemo implements Vehicle {
    public static void main(String[] args) {
        DefaultMethodsDemo car = new DefaultMethodsDemo();
        System.out.println("Brand from default method: " + car.getBrand());
        System.out.println("Wheel count from static method: " + Vehicle.getWheelCount());
    }
}
