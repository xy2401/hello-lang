# Python 3.10 PEP 604 Union Operator (X | Y)
def square(val: int | float) -> int | float:
    return val ** 2

print("Union Type Operator int | str:")
print("Type validation: True for int, True for str")
print("isinstance(10, int | str):", isinstance(10, int | str))
