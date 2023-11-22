"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsAccount = exports.CurrentAccount = exports.BankAccount = void 0;
class BankAccount {
    constructor(userName, userAge, userLocation, userState, userCountry, userEmail, balance, accountType) {
        this.userName = userName;
        this.userAge = userAge;
        this.userLocation = userLocation;
        this.userState = userState;
        this.userCountry = userCountry;
        this.userEmail = userEmail;
        this.balance = balance;
        this.accountNumber = this.generateAccountNumber(accountType);
    }
    // 
    generateAccountNumber(accountType) {
        const prefix = accountType === "savings" ? "Sav" : "Curr";
        const random = Math.floor(Math.random() * 1000000);
        return `${prefix}${String(random).padStart(6, "0")}`;
    }
    getAccountType() {
        return this.accountNumber.startsWith("Sav") ? "Savings" : "Current";
    }
    deposit(amount) {
        if (amount < 0) {
            console.log("Deposit Amount cannot be negative.\n");
            return;
        }
        this.balance += amount;
        console.log(`Initial Balance: ${this.balance - amount}`);
        console.log(`Total Balance: ${this.balance}\n`);
    }
    withdraw(amount) {
        if (amount < 0) {
            console.log("Withdrawal Amount cannot be negative.\n");
            return;
        }
        if (this.balance >= amount && !(this.balance - amount <= 800)) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount}`);
            console.log(`Total Balance: ${this.balance}\n`);
        }
        else {
            console.log("Insufficient balance for withdrawal. You may use Overdraft.\n");
        }
    }
}
exports.BankAccount = BankAccount;
class CurrentAccount extends BankAccount {
    constructor(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance) {
        super(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance, "current");
    }
}
exports.CurrentAccount = CurrentAccount;
class SavingsAccount extends BankAccount {
    constructor(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance) {
        super(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance, "savings");
    }
}
exports.SavingsAccount = SavingsAccount;
