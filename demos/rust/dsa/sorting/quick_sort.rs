fn quick_sort<T: Ord>(slice: &mut [T]) {
    if slice.len() <= 1 {
        return;
    }
    let pivot_idx = partition(slice);
    let (left, right) = slice.split_at_mut(pivot_idx);
    quick_sort(left);
    quick_sort(&mut right[1..]);
}

fn partition<T: Ord>(slice: &mut [T]) -> usize {
    let len = slice.len();
    let mut i = 0;
    for j in 0..len - 1 {
        if slice[j] <= slice[len - 1] {
            slice.swap(i, j);
            i += 1;
        }
    }
    slice.swap(i, len - 1);
    i
}

fn main() {
    println!("=== Rust Idiomatic In-Place QuickSort ===");
    let mut data = vec![64, 25, 12, 22, 11];
    quick_sort(&mut data);
    assert_eq!(data, vec![11, 12, 22, 25, 64]);
    println!("Sorted: {:?}", data);
    println!("Rust QuickSort tests passed successfully.");
}
