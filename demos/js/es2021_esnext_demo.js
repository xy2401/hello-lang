// ES2021 ~ ESNext Features Demo
class BankAccount {
    #balance = 1000; // Private Class Field

    deposit(amount) {
        this.#balance += amount;
        return this.#balance;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount();
account.deposit(500);

const items = ['apple', 'banana', 'cherry'];
const lastItem = items.at(-1); // Array.prototype.at()

console.log("ES2021 ~ ESNext Result:");
console.log(`Account Balance: $${account.getBalance()}`);
console.log(`Last Item via .at(-1): ${lastItem}`);
