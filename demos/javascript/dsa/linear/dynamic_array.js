console.log("=== JavaScript Array & Deque Demo ===");
const arr = [10, 20];
arr.push(30);
console.assert(arr.length === 3, "Length assertion failed");
console.assert(arr[1] === 20, "Index assertion failed");
console.assert(arr.pop() === 30, "Pop assertion failed");

const deque = ["center"];
deque.unshift("front");
deque.push("back");
console.assert(deque[0] === "front" && deque[2] === "back", "Deque assertion failed");

console.log("JS Array:", arr, "Deque:", deque);
console.log("JavaScript Dynamic Array tests passed successfully.");
