#include <iostream>
#include <map>
#include <memory>
#include <queue>
#include <string>
#include <vector>

struct Node {
    std::string value;
    std::vector<std::unique_ptr<Node>> children;
};

int main() {
    std::vector<std::string> steps{"parse", "validate", "render"};
    std::map<std::string, int> scores{{"Ada", 95}, {"Lin", 91}};
    std::priority_queue<int, std::vector<int>, std::greater<>> tasks;
    tasks.push(2);
    tasks.push(1);
    auto tree = std::make_unique<Node>(Node{"root", {}});
    tree->children.push_back(std::make_unique<Node>(Node{"child", {}}));

    std::cout << "vector=" << steps.size() << ':' << steps.front() << '\n';
    std::cout << "map=" << scores.begin()->first << ':' << scores.begin()->second << '\n';
    std::cout << "heap-min=" << tasks.top() << '\n';
    std::cout << "tree-children=" << tree->children.size() << '\n';
}
