fn main() {
    println!("=== Rust Vec & VecDeque ===");
    let mut vec: Vec<i32> = Vec::with_capacity(2);
    vec.push(10);
    vec.push(20);
    vec.push(30);

    assert_eq!(vec.len(), 3);
    assert!(vec.capacity() >= 4);
    assert_eq!(vec[0], 10);
    assert_eq!(vec.pop(), Some(30));

    let sum: i32 = vec.iter().sum();
    assert_eq!(sum, 30);
    println!("Rust Vec len={}, sum={}", vec.len(), sum);
    println!("Rust Dynamic Array tests passed successfully.");
}
