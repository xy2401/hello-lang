#include <iostream>
#include <queue>
#include <vector>
#include <cassert>

int main() {
    std::cout << "=== C++ std::priority_queue (Binary Heap) ===" << std::endl;
    std::priority_queue<int> max_heap;
    max_heap.push(15);
    max_heap.push(50);
    max_heap.push(30);

    assert(max_heap.top() == 50);
    max_heap.pop();
    assert(max_heap.top() == 30);

    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;
    min_heap.push(15);
    min_heap.push(50);
    min_heap.push(10);
    assert(min_heap.top() == 10);

    std::cout << "C++ Priority Queue tests passed successfully." << std::endl;
    return 0;
}
