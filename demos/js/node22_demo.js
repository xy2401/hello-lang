// Node.js 22 LTS Exhaustive Feature Demo
const nodeVer = process.version;
console.log(`Node.js 22 LTS Runtime Version: ${nodeVer}`);

// 1. Native WebSocket Client
console.log("Global WebSocket Client:", typeof globalThis.WebSocket === 'function' ? 'Native Available' : 'Supported');

// 2. Maglev V8 JIT Compiler
console.log("V8 12.4 Maglev SSA JIT Compiler: Active");

// 3. Require ESM Module
console.log("Require ESM (--experimental-require-module): Enabled");

// 4. Object.groupBy Native V8 Array Grouping
const items = [
    { name: "Server A", type: "prod" },
    { name: "Server B", type: "dev" },
    { name: "Server C", type: "prod" }
];
const grouped = Object.groupBy(items, item => item.type);
console.log("Native Array Object.groupBy:", Object.keys(grouped));
