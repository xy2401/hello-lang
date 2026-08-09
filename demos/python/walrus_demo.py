# Python 3.8 Walrus Operator (:=)
chunks = ["Hello World", "Py3.8 Demo"]
processed = 0

for chunk in chunks:
    if (n := len(chunk)) > 5:
        print(f"Chunk length: {n}, content: {chunk}")
        processed += 1

print(f"Processed {processed} chunks successfully.")
