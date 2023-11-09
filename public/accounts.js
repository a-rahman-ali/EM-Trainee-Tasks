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
    generateAccountNumber(accountType) {
        const prefix = accountType === "savings" ? "Sav" : "Curr";
        const random = Math.floor(Math.random() * 1000000);
        return `${prefix}${String(random).padStart(6, "0")}`;
    }
    static isValidEmail(email) {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailPattern.test(email);
    }
    getUserName() {
        return this.userName;
    }
    getUserAge() {
        return this.userAge;
    }
    getUserLocation() {
        return this.userLocation;
    }
    getUserState() {
        return this.userState;
    }
    getUserCountry() {
        return this.userCountry;
    }
    getUserEmail() {
        return this.userEmail;
    }
    getBalance() {
        return this.balance;
    }
    getAccountNumber() {
        return this.accountNumber;
    }
    getAccountType() {
        return this.getAccountNumber().startsWith("Sav") ? "Savings" : "Current";
    }
}
exports.BankAccount = BankAccount;
class CurrentAccount extends BankAccount {
    constructor(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance) {
        super(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance, "current");
        this.generateAccountNumber("current");
    }
    getAccountType() {
        return "Current";
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Initial Balance: ${this.balance - amount}`);
        console.log(`Total Balance: ${this.balance}`);
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount}`);
            console.log(`Total Balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient balance for withdrawal. You may use Overdraft.");
        }
    }
}
exports.CurrentAccount = CurrentAccount;
class SavingsAccount extends BankAccount {
    constructor(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance) {
        super(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance, "savings");
        this.generateAccountNumber("savings");
    }
    getAccountType() {
        return "Savings";
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Initial Balance: ${this.balance - amount}`);
        console.log(`Total Balance: ${this.balance}`);
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount}`);
            console.log(`Total Balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient balance for withdrawal.");
        }
    }
}
exports.SavingsAccount = SavingsAccount;
