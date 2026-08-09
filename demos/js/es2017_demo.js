// ES2017 (ES8) Demo
async function fetchData() {
  return "Async/Await Data Fetched";
}
fetchData().then(res => console.log("ES2017 Output:", res));
console.log("Object.entries:", Object.entries({ a: 1, b: 2 }));
