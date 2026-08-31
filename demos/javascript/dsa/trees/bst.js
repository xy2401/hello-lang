class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const node = new BSTNode(val);
    if (!this.root) {
      this.root = node;
      return;
    }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = node; break; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = node; break; }
        curr = curr.right;
      }
    }
  }

  search(val) {
    let curr = this.root;
    while (curr) {
      if (curr.val === val) return true;
      curr = val < curr.val ? curr.left : curr.right;
    }
    return false;
  }
}

console.log("=== JavaScript Binary Search Tree ===");
const bst = new BST();
bst.insert(50);
bst.insert(30);
bst.insert(70);

console.assert(bst.search(30) === true, "Search 30 failed");
console.assert(bst.search(99) === false, "Search 99 failed");
console.log("JavaScript BST tests passed successfully.");
