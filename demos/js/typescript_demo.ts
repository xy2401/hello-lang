// TypeScript 5.x Advanced Type System Demo
interface User<T = string> {
    id: number;
    name: string;
    data: T;
}

type ReadonlyUser<T> = {
    readonly [K in keyof User<T>]: User<T>[K];
};

const user: ReadonlyUser<{ role: string }> = {
    id: 1001,
    name: "TypeScript Developer",
    data: { role: "Architect" }
};

console.log("TypeScript 5.x Type System Result:");
console.log(`User: ${user.name} (${user.data.role})`);
