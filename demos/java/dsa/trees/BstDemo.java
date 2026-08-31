public class BstDemo {
    static class Node {
        int val;
        Node left, right;
        Node(int v) { val = v; }
    }

    static Node insert(Node root, int val) {
        if (root == null) return new Node(val);
        if (val < root.val) root.left = insert(root.left, val);
        else if (val > root.val) root.right = insert(root.right, val);
        return root;
    }

    static boolean search(Node root, int val) {
        if (root == null) return false;
        if (root.val == val) return true;
        return val < root.val ? search(root.left, val) : search(root.right, val);
    }

    public static void main(String[] args) {
        System.out.println("=== Java Binary Search Tree ===");
        Node root = null;
        root = insert(root, 50);
        root = insert(root, 30);
        root = insert(root, 70);

        if (!search(root, 30) || search(root, 99)) {
            throw new RuntimeException("BST search assertion failed");
        }
        System.out.println("Java BST search tests passed successfully.");
    }
}
