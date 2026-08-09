#include <iostream>
#include <concepts>

template<typename T>
concept Number = std::integral<T> || std::floating_point<T>;

template<Number T>
T add(T a, T b) {
    return a + b;
}

int main() {
    std::cout << "C++20 Concepts Demo:" << std::endl;
    std::cout << "Add(10, 20) = " << add(10, 20) << " [Integral]" << std::endl;
    std::cout << "Add(3.14, 2.71) = " << add(3.14, 2.71) << " [FloatingPoint]" << std::endl;
    return 0;
}
