#include <iostream>
#include <queue>
#include <deque>
#include <cassert>

int main() {
    std::cout << "=== C++ std::queue & std::deque ===" << std::endl;
    std::queue<std::string> q;
    q.push("first");
    q.push("second");
    q.push("third");

    assert(q.front() == "first");
    q.pop();
    assert(q.front() == "second");
    assert(q.size() == 2);

    std::deque<int> dq = {1, 2, 3};
    dq.push_front(0);
    dq.push_back(4);
    assert(dq.front() == 0 && dq.back() == 4);

    std::cout << "C++ Queue tests passed successfully." << std::endl;
    return 0;
}
