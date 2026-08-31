use std::collections::BinaryHeap;

fn main() {
    println!("=== Rust BinaryHeap (Priority Queue) ===");
    let mut heap = BinaryHeap::new();
    heap.push(15);
    heap.push(50);
    heap.push(30);

    assert_eq!(heap.peek(), Some(&50));
    assert_eq!(heap.pop(), Some(50));
    assert_eq!(heap.pop(), Some(30));
    assert_eq!(heap.pop(), Some(15));
    assert_eq!(heap.pop(), None);

    println!("Rust BinaryHeap tests passed successfully.");
}
