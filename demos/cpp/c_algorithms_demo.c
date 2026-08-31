#include <stdio.h>
#include <stdlib.h>

static int compare_int(const void *left, const void *right) {
    int a = *(const int *)left;
    int b = *(const int *)right;
    return (a > b) - (a < b);
}

int main(void) {
    int values[] = {13, 2, 21, 5, 8};
    size_t length = sizeof values / sizeof values[0];
    qsort(values, length, sizeof values[0], compare_int);
    int target = 13;
    int *found = bsearch(&target, values, length, sizeof values[0], compare_int);

    printf("sorted=");
    for (size_t i = 0; i < length; ++i) printf("%s%d", i ? "," : "", values[i]);
    printf("\nfound=%d\n", found == NULL ? -1 : (int)(found - values));
    return 0;
}
