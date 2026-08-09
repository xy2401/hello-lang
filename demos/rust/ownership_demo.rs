fn calculate_length(s: &String) -> usize {
    s.len()
}

fn append_world(s: &mut String) {
    s.push_str(" World!");
}

fn main() {
    println!("Rust Ownership & Borrowing Demo:");
    let mut s = String::from("Hello, Rust 2021");
    let len = calculate_length(&s);
    println!("Borrowed string length: {}", len);

    append_world(&mut s);
    println!("Mutated string: {}", s);
}
