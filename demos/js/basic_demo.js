// 4.1 结构化数据定义 (Class)
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getInfo() {
        return `${this.name} (${this.age} years old)`;
    }
}

// 3.1 函数定义与参数 (Function)
function calculateBonus(base, ratio = 0.1) {
    return base * ratio;
}

// 1.1 变量声明与常量
const lang = "JavaScript";
// 1.2 基本数据类型
let age = 25;
const salary = 8500.50;
const isActive = true;

console.log(`Language: ${lang}`);

// 2.1 条件分支
if (isActive) {
    console.log("Status: Active Worker");
} else {
    console.log("Status: Inactive Worker");
}

// 2.2 集合与循环遍历
const skills = ["V8 Engine", "Async/Await", "ES6+"];
console.log("Skills:", skills.join(" "));

// 3.1 函数调用
const bonus = calculateBonus(salary, 0.1);
console.log(`Calculated Bonus: $${bonus}`);

// 4.1 实例化类
const p = new Person("Alice", age);
console.log("Person Info:", p.getInfo());
