// Node.js 18 LTS Exhaustive Feature Demo
const nodeVer = process.version;
console.log(`Node.js 18 LTS Runtime Version: ${nodeVer}`);

// 1. Global Fetch API
console.log("Global fetch API:", typeof globalThis.fetch === 'function' ? 'Native Available' : 'Missing');

// 2. Web Streams API
const stream = new ReadableStream({
    start(controller) {
        controller.enqueue("Stream Chunk 1");
        controller.enqueue("Stream Chunk 2");
        controller.close();
    }
});
console.log("Web Streams ReadableStream:", typeof stream === 'object' ? 'Active' : 'Missing');

// 3. Blob & BroadcastChannel APIs
const blob = new Blob(["Hello Node.js 18 Blob"], { type: "text/plain" });
blob.text().then(text => {
    console.log("Blob content:", text);
});
