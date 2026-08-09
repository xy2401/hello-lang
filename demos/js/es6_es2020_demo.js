// ES6 ~ ES2020 Core Features Demo
const user = {
    name: "Alice",
    profile: {
        email: "alice@example.com"
    }
};

// Optional Chaining & Nullish Coalescing
const email = user?.profile?.email ?? "no-email@example.com";
const age = user?.details?.age ?? 18;

// Promises & Async
const fetchData = async () => {
    return Promise.resolve(`User: ${email}, Age: ${age}`);
};

fetchData().then(result => {
    console.log("ES6 ~ ES2020 Result:");
    console.log(result);
});
