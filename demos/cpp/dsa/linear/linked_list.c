#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node* list_prepend(Node *head, int val) {
    Node *node = (Node*)malloc(sizeof(Node));
    node->value = val;
    node->next = head;
    return node;
}

void list_free(Node *head) {
    while (head) {
        Node *temp = head;
        head = head->next;
        free(temp);
    }
}

int main(void) {
    printf("=== C Singly Linked List ===\n");
    Node *head = NULL;
    head = list_prepend(head, 30);
    head = list_prepend(head, 20);
    head = list_prepend(head, 10);

    assert(head->value == 10);
    assert(head->next->value == 20);
    assert(head->next->next->value == 30);

    printf("List traversal: %d -> %d -> %d -> NULL\n", head->value, head->next->value, head->next->next->value);
    printf("C Linked List tests passed successfully.\n");
    list_free(head);
    return 0;
}
