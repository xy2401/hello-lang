#include <iostream>
#include <vector>
#include <algorithm>
#include <cassert>

int main() {
    std::cout << "=== C++ Binary Search & Bounds ===" << std::endl;
    std::vector<int> arr = {10, 20, 20, 20, 30, 40, 50};

    bool exists = std::binary_search(arr.begin(), arr.end(), 30);
    assert(exists);

    auto lower = std::lower_bound(arr.begin(), arr.end(), 20);
    auto upper = std::upper_bound(arr.begin(), arr.end(), 20);

    assert(std::distance(arr.begin(), lower) == 1);
    assert(std::distance(arr.begin(), upper) == 4);

    std::cout << "Target 20 range count: " << (upper - lower) << std::endl;
    std::cout << "C++ Binary Search tests passed successfully." << std::endl;
    return 0;
}
