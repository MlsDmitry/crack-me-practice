#include <stdio.h>

int main()
{
    printf("Hello World\n");
    char * v1 = "hello";
    printf("%p\n", v1);
    printf("%p\n", &v1);
    printf("%s\n", *&v1);
    return 0;
}