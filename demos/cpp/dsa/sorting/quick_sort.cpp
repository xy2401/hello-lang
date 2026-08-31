#include <iostream>
#include <vector>
#include <algorithm>
#include <cassert>

int main() {
    std::cout << "=== C++ std::sort (Introsort) & QuickSort ===" << std::endl;
    std::vector<int> vec = {64, 25, 12, 22, 11};
    std::sort(vec.begin(), vec.end());

    assert(std::is_sorted(vec.begin(), vec.end()));
    assert((vec[0] == 11 && vec[4] == 64));

    std::cout << "Sorted result: ";
    for (int v : vec) std::cout << v << " ";
    std::cout << "\nC++ Sort tests passed successfully." << std::endl;
    return 0;
}
