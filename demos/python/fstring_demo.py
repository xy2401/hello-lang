# Python 3.12 PEP 701 Formalized F-Strings
user = {"name": "Alice"}
items = ["a", "b"]

print("Formalized F-String Demo:")
print("f\"User: {user['name']!r}, List: {', '.join(['a', 'b'])}\"")
print(f"Output: User: {user['name']!r}, List: {', '.join(items)}")
