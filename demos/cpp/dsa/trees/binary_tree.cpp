#include <iostream>
#include <memory>
#include <vector>
#include <cassert>

struct TreeNode {
    int val;
    std::unique_ptr<TreeNode> left;
    std::unique_ptr<TreeNode> right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(const TreeNode* node, std::vector<int>& out) {
    if (!node) return;
    inorder(node->left.get(), out);
    out.push_back(node->val);
    inorder(node->right.get(), out);
}

int main() {
    std::cout << "=== C++ Binary Tree with Smart Pointers ===" << std::endl;
    auto root = std::make_unique<TreeNode>(2);
    root->left = std::make_unique<TreeNode>(1);
    root->right = std::make_unique<TreeNode>(3);

    std::vector<int> traversed;
    inorder(root.get(), traversed);

    assert((traversed == std::vector<int>{1, 2, 3}));
    std::cout << "Inorder traversal: " << traversed[0] << ", " << traversed[1] << ", " << traversed[2] << std::endl;
    std::cout << "C++ Binary Tree tests passed successfully." << std::endl;
    return 0;
}
