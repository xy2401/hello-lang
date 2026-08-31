#include <iostream>
#include <memory>
#include <forward_list>
#include <cassert>

template <typename T>
class LinkedList {
    struct Node {
        T data;
        std::unique_ptr<Node> next;
        Node(T val) : data(std::move(val)), next(nullptr) {}
    };
    std::unique_ptr<Node> head_;

public:
    void push_front(T val) {
        auto node = std::make_unique<Node>(std::move(val));
        node->next = std::move(head_);
        head_ = std::move(node);
    }
    const T& front() const { return head_->data; }
    bool empty() const { return head_ == nullptr; }
};

int main() {
    std::cout << "=== C++ std::forward_list & RAII UniquePtr List ===" << std::endl;
    std::forward_list<int> flist = {10, 20, 30};
    flist.push_front(5);
    assert(flist.front() == 5);

    LinkedList<std::string> custom_list;
    custom_list.push_front("World");
    custom_list.push_front("Hello");
    assert(custom_list.front() == "Hello");

    std::cout << "C++ Linked List tests passed successfully." << std::endl;
    return 0;
}
