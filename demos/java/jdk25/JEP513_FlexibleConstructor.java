class ParentClass {
    final int val;
    ParentClass(int v) { this.val = v; }
}

public class JEP513_FlexibleConstructor extends ParentClass {
    JEP513_FlexibleConstructor(int input) {
        // Pre-construction statements allowed before super(...) in JDK 25!
        int validated = Math.max(1, input);
        System.out.println("Validated value before super(): " + validated);
        super(validated);
    }

    public static void main(String[] args) {
        JEP513_FlexibleConstructor obj = new JEP513_FlexibleConstructor(-10);
        System.out.println("Flexible Constructor Body executed! val = " + obj.val);
    }
}
