use std::collections::{BTreeMap, VecDeque};

fn bfs<'a>(graph: &BTreeMap<&'a str, Vec<&'a str>>, start: &'a str) -> Vec<&'a str> {
    let mut order = Vec::new();
    let mut queue = VecDeque::from([start]);
    while let Some(node) = queue.pop_front() {
        if order.contains(&node) { continue; }
        order.push(node);
        if let Some(next) = graph.get(node) { queue.extend(next); }
    }
    order
}

fn main() {
    let mut scores = vec![("Lin", 91), ("Ada", 95), ("Kai", 91)];
    scores.sort_by_key(|(name, score)| (std::cmp::Reverse(*score), *name));
    let numbers = [2, 5, 8, 13, 21];
    let graph = BTreeMap::from([
        ("A", vec!["B", "C"]), ("B", vec!["D"]), ("C", vec!["D"]),
    ]);

    println!("sorted={scores:?}");
    println!("binary-search-13={:?}", numbers.binary_search(&13).unwrap());
    println!("bfs={:?}", bfs(&graph, "A"));
}
