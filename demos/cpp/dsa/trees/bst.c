#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <assert.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* bst_insert(BSTNode *root, int key) {
    if (!root) {
        BSTNode *n = (BSTNode*)malloc(sizeof(BSTNode));
        n->key = key;
        n->left = n->right = NULL;
        return n;
    }
    if (key < root->key) root->left = bst_insert(root->left, key);
    else if (key > root->key) root->right = bst_insert(root->right, key);
    return root;
}

bool bst_search(const BSTNode *root, int key) {
    if (!root) return false;
    if (root->key == key) return true;
    return key < root->key ? bst_search(root->left, key) : bst_search(root->right, key);
}

void bst_free(BSTNode *root) {
    if (!root) return;
    bst_free(root->left);
    bst_free(root->right);
    free(root);
}

int main(void) {
    printf("=== C Binary Search Tree (BST) ===\n");
    BSTNode *root = NULL;
    root = bst_insert(root, 50);
    root = bst_insert(root, 30);
    root = bst_insert(root, 70);
    root = bst_insert(root, 20);

    assert(bst_search(root, 30) == true);
    assert(bst_search(root, 99) == false);
    printf("C BST search verified successfully.\n");
    bst_free(root);
    return 0;
}
