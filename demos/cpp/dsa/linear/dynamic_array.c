#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynamicArray;

DynamicArray* da_create(size_t initial_cap) {
    DynamicArray *arr = (DynamicArray*)malloc(sizeof(DynamicArray));
    arr->capacity = initial_cap > 0 ? initial_cap : 4;
    arr->size = 0;
    arr->data = (int*)malloc(arr->capacity * sizeof(int));
    return arr;
}

void da_push(DynamicArray *arr, int val) {
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        arr->data = (int*)realloc(arr->data, arr->capacity * sizeof(int));
    }
    arr->data[arr->size++] = val;
}

int da_get(const DynamicArray *arr, size_t idx) {
    assert(idx < arr->size);
    return arr->data[idx];
}

void da_free(DynamicArray *arr) {
    if (arr) {
        free(arr->data);
        free(arr);
    }
}

int main(void) {
    printf("=== C Dynamic Array ===\n");
    DynamicArray *arr = da_create(2);
    da_push(arr, 10);
    da_push(arr, 20);
    da_push(arr, 30);
    assert(arr->size == 3);
    assert(arr->capacity == 4);
    assert(da_get(arr, 0) == 10);
    assert(da_get(arr, 1) == 20);
    assert(da_get(arr, 2) == 30);
    printf("DynamicArray size=%zu, cap=%zu, elements=[%d, %d, %d]\n", 
           arr->size, arr->capacity, da_get(arr, 0), da_get(arr, 1), da_get(arr, 2));
    printf("C Dynamic Array tests passed successfully.\n");
    da_free(arr);
    return 0;
}
