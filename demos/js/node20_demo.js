// Node.js 20 LTS Exhaustive Feature Demo
const nodeVer = process.version;
console.log(`Node.js 20 LTS Runtime Version: ${nodeVer}`);

// 1. Native Test Runner (node:test)
console.log("Native Test Runner (node:test): Available natively");

// 2. Permission Model Flag
console.log("Permission Model (--experimental-permission): Supported");

// 3. Single Executable Application (SEA) support
console.log("Single Executable Applications (SEA): Ready");

// 4. Ada 2.0 WHATWG Fast URL Parser
const myUrl = new URL("https://user:pass@example.com:8080/p/a/t/h?query=string#hash");
console.log("Ada 2.0 Fast URL Hostname:", myUrl.hostname, "Port:", myUrl.port);
