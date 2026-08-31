#include <stdio.h>
#include <stdbool.h>
#include <assert.h>

#define STACK_CAP 100

typedef struct {
    int data[STACK_CAP];
    int top;
} Stack;

void stack_init(Stack *s) { s->top = -1; }
bool stack_is_empty(const Stack *s) { return s->top == -1; }
void stack_push(Stack *s, int val) {
    assert(s->top < STACK_CAP - 1);
    s->data[++s->top] = val;
}
int stack_pop(Stack *s) {
    assert(!stack_is_empty(s));
    return s->data[s->top--];
}
int stack_peek(const Stack *s) {
    assert(!stack_is_empty(s));
    return s->data[s->top];
}

int main(void) {
    printf("=== C LIFO Stack ===\n");
    Stack s;
    stack_init(&s);
    stack_push(&s, 100);
    stack_push(&s, 200);
    assert(stack_peek(&s) == 200);
    assert(stack_pop(&s) == 200);
    assert(stack_pop(&s) == 100);
    assert(stack_is_empty(&s));
    printf("C Stack tests passed successfully.\n");
    return 0;
}
