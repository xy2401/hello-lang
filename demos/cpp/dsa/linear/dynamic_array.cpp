#include <iostream>
#include <vector>
#include <cassert>

template <typename T>
class CustomVector {
private:
    T* data_;
    size_t size_;
    size_t capacity_;

    void reallocate(size_t new_cap) {
        T* new_data = new T[new_cap];
        for (size_t i = 0; i < size_; ++i) {
            new_data[i] = std::move(data_[i]);
        }
        delete[] data_;
        data_ = new_data;
        capacity_ = new_cap;
    }

public:
    CustomVector(size_t init_cap = 4) : size_(0), capacity_(init_cap) {
        data_ = new T[capacity_];
    }
    ~CustomVector() { delete[] data_; }

    void push_back(const T& value) {
        if (size_ >= capacity_) reallocate(capacity_ * 2);
        data_[size_++] = value;
    }
    const T& operator[](size_t index) const { return data_[index]; }
    size_t size() const { return size_; }
    size_t capacity() const { return capacity_; }
};

int main() {
    std::cout << "=== C++ std::vector & Custom Vector ===" << std::endl;
    std::vector<int> std_vec = {10, 20, 30};
    std_vec.push_back(40);
    assert(std_vec.size() == 4);

    CustomVector<std::string> str_vec(2);
    str_vec.push_back("Hello");
    str_vec.push_back("DataStructures");
    str_vec.push_back("C++20");
    assert(str_vec.size() == 3);
    assert(str_vec.capacity() == 4);
    assert(str_vec[0] == "Hello");

    std::cout << "CustomVector elements: " << str_vec[0] << ", " << str_vec[1] << ", " << str_vec[2] << std::endl;
    std::cout << "C++ Dynamic Array tests passed successfully." << std::endl;
    return 0;
}
