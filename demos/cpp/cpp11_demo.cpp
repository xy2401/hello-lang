#include <iostream>
#include <vector>
#include <numeric>
#include <functional>

int main() {
    std::cout << "C++11 Auto & Lambda Demo:" << std::endl;
    std::function<int(int)> factorial = [&](int n) -> int {
        return (n <= 1) ? 1 : n * factorial(n - 1);
    };

    std::cout << "Calculated Factorial(5) = " << factorial(5) << std::endl;
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::cout << "Vector elements: ";
    for (auto v : vec) {
        std::cout << v << " ";
    }
    std::cout << std::endl;
    return 0;
}
