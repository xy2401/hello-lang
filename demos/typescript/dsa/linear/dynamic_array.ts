export class DynamicArray<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  get size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }
}

function main() {
  console.log("=== TypeScript Generic Dynamic Array ===");
  const arr = new DynamicArray<number>();
  arr.push(10);
  arr.push(20);
  arr.push(30);

  if (arr.size !== 3 || arr.get(1) !== 20) {
    throw new Error("Assertion failed");
  }

  console.log("TypeScript Array elements:", arr.toArray());
  console.log("TypeScript Dynamic Array tests passed successfully.");
}

main();
