# Python 3.8 PEP 570 Positional-Only Parameters
def pow_custom(x, y, /, z=None):
    res = x ** y
    return res if z is None else res % z

print("Positional-Only Args (/):")
print("pow_custom(2, 8) =", pow_custom(2, 8))
try:
    pow_custom(x=2, y=8)
except TypeError as e:
    print("Keyword call pow_custom(x=2) -> TypeError: positional-only argument")
