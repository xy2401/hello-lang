#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

static Node *push_front(Node *head, int value) {
    Node *node = malloc(sizeof *node);
    if (node == NULL) return head;
    node->value = value;
    node->next = head;
    return node;
}

static void free_list(Node *head) {
    while (head != NULL) {
        Node *next = head->next;
        free(head);
        head = next;
    }
}

int main(void) {
    int values[] = {2, 5, 8, 13};
    Node *head = NULL;
    head = push_front(head, 5);
    head = push_front(head, 2);

    printf("array-length=%zu\n", sizeof values / sizeof values[0]);
    printf("list=%d,%d\n", head->value, head->next->value);
    free_list(head);
    return 0;
}
