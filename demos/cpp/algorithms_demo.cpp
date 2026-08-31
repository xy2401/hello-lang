#include <algorithm>
#include <iostream>
#include <map>
#include <queue>
#include <string>
#include <vector>

int main() {
    std::vector<int> numbers{13, 2, 21, 5, 8};
    std::ranges::sort(numbers);
    auto found = std::ranges::lower_bound(numbers, 13);

    std::map<std::string, std::vector<std::string>> graph{
        {"A", {"B", "C"}}, {"B", {"D"}}, {"C", {"D"}},
    };
    std::vector<std::string> order;
    std::queue<std::string> queue({"A"});
    while (!queue.empty()) {
        auto node = queue.front();
        queue.pop();
        if (std::ranges::find(order, node) != order.end()) continue;
        order.push_back(node);
        for (const auto &next : graph[node]) queue.push(next);
    }

    std::cout << "sorted=";
    for (auto value : numbers) std::cout << value << ',';
    std::cout << "\nbinary-search-13=" << std::distance(numbers.begin(), found) << "\nbfs=";
    for (const auto &node : order) std::cout << node;
    std::cout << '\n';
}
