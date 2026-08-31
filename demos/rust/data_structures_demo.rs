use std::cmp::Reverse;
use std::collections::{BTreeMap, BinaryHeap, VecDeque};

#[derive(Debug)]
enum Tree<T> {
    Leaf(T),
    Branch(T, Vec<Tree<T>>),
}

fn main() {
    let values = vec!["parse", "validate", "render"];
    let queue: VecDeque<_> = values.iter().copied().collect();
    let scores = BTreeMap::from([("Ada", 95), ("Lin", 91)]);
    let mut tasks = BinaryHeap::from([Reverse((2, "docs")), Reverse((1, "tests"))]);
    let tree = Tree::Branch("root", vec![Tree::Leaf("left"), Tree::Leaf("right")]);

    println!("vec={values:?}");
    println!("queue-first={}", queue.front().unwrap());
    println!("scores={scores:?}");
    println!("next={}", tasks.pop().unwrap().0.1);
    if let Tree::Branch(value, children) = tree {
        println!("tree={value}:{}", children.len());
    }
}
