"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositMoney = exports.withdrawMoney = exports.displayAllAccountsDetails = exports.viewCustomerDetails = exports.viewBalance = exports.createCurrentAcc = exports.createSavingsAcc = exports.createAccount = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const accounts_1 = require("./accounts");
let Bank = []; // Add your accounts here
function createAccount() {
    console.log("1. Savings Account");
    console.log("2. Current Account");
    let choice = (Number)(prompt("Enter your choice: "));
    console.log();
    switch (choice) {
        case 1:
            createSavingsAcc();
            break;
        case 2:
            createCurrentAcc();
            break;
        default:
            console.log("Please choose from Available options");
            console.log();
            break;
    }
}
exports.createAccount = createAccount;
// Function to Create Savings Account
function createSavingsAcc() {
    let userName = prompt("Enter your Name: ");
    let userAge = getAgeFromUser();
    let userLocation = prompt("Enter your Location: ");
    let userState = prompt("Enter your State: ");
    let userCountry = prompt("Enter your Country: ");
    let userEmail = getEmailFromUser();
    let initialBalance = getBalanceFromUser("savings");
    let account = new accounts_1.SavingsAccount(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance);
    Bank.push(account);
    console.log(`Account No. ${account.getAccountNumber()} for ${account.getUserName()}`);
    console.log();
    // console.log(account);
}
exports.createSavingsAcc = createSavingsAcc;
// Function to Create Current Account  
function createCurrentAcc() {
    let userName = prompt("Enter your Name: ");
    let userAge = getAgeFromUser();
    let userLocation = prompt("Enter your Location: ");
    let userState = prompt("Enter your State: ");
    let userCountry = prompt("Enter your Country: ");
    let userEmail = getEmailFromUser();
    let initialBalance = getBalanceFromUser("current");
    let account = new accounts_1.CurrentAccount(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance);
    Bank.push(account);
    console.log(`Account No. ${account.getAccountNumber()} for ${account.getUserName()}`);
    console.log();
    // console.log(account);
}
exports.createCurrentAcc = createCurrentAcc;
// Function to get age from user
function getAgeFromUser() {
    let age;
    let ageAttempts = 0;
    while (true) {
        age = parseInt(prompt("Enter your Age: "));
        if (isNaN(age)) {
            console.log("Age must be a number. Please enter a valid age.");
        }
        else if (age < 18 || age > 68) {
            ageAttempts++;
            console.log("Age must be above 18 and below 68");
            if (ageAttempts >= 2) {
                console.log("You've exceeded the maximum number of attempts in entering age");
                process.exit(0);
            }
            continue;
        }
        else {
            break; // Valid age entered, exit loop
        }
    }
    return age;
}
// Function to get email from user
function getEmailFromUser() {
    let email;
    let emailAttempts = 0;
    while (true) {
        email = prompt("Enter your Email: ");
        let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            console.log("Enter email id in proper format");
            emailAttempts++;
            if (emailAttempts >= 2) {
                console.log("You've exceeded max no.of attempts in entering proper email");
                process.exit(0);
            }
            continue;
        }
        else {
            break; // Valid email entered, exit loop
        }
    }
    return email;
}
// Function to get Balance from user
function getBalanceFromUser(accType) {
    let balance;
    let balanceAttempts = 0;
    while (true) {
        balance = parseInt(prompt("Enter your Initial Balance: "));
        if (isNaN(balance) || (accType === "savings" && balance < 500)) {
            console.log("Initial balance must be a number and not less than 500.");
            balanceAttempts++;
            if (balanceAttempts >= 2) {
                console.log("You have exceeded the maximum number of attempts. Exiting application.");
                process.exit(0);
            }
            continue;
        }
        else if (isNaN(balance) || (accType === "current" && balance < 800)) {
            console.log("Initial balance must be a number and not less than 800.");
            balanceAttempts++;
            if (balanceAttempts >= 2) {
                console.log("You have exceeded the maximum number of attempts. Exiting application.");
                process.exit(0);
            }
            continue;
        }
        else {
            break; // Valid initial balance entered, exit loop
        }
    }
    return balance;
}
// Function to view the Balance of Customer by taking input of Account No
function viewBalance() {
    let accNo = prompt("Enter account number: ");
    let account = getAccountByNumber(accNo);
    if (account) {
        console.log(`Account Number: ${accNo} --> Balance: ${account.getBalance()}`);
    }
    else {
        console.log("Account not found");
    }
}
exports.viewBalance = viewBalance;
// Function that helps to retrieve single account details via account number
function viewCustomerDetails() {
    let accNo = prompt("Enter account number: ");
    let account = getAccountByNumber(accNo);
    if (account) {
        console.log("Customer Details:");
        console.log("------------------------------------------------");
        console.log(`| Account Number:   ${account.getAccountNumber()}`);
        console.log(`| Customer Name:    ${account.getUserName()}`);
        console.log(`| Age:              ${account.getUserAge()}`);
        console.log(`| Location:         ${account.getUserLocation()}`);
        console.log(`| State:            ${account.getUserState()}`);
        console.log(`| Country:          ${account.getUserCountry()}`);
        console.log(`| Email:            ${account.getUserEmail()}`);
        console.log(`| Balance:          ${account.getBalance()}`);
        console.log(`| Account Type:     ${account.getAccountType()}`);
        console.log("------------------------------------------------");
    }
    else {
        console.log("Account not found");
    }
}
exports.viewCustomerDetails = viewCustomerDetails;
// Function to display account holders details in tabluar format
function displayAllAccountsDetails() {
    console.log("+------------------+-----------------+------------+-----------------+----------------------+-----------------+---------------------+----------------+----------------+");
    console.log("| Account Number   | User Name       | User Age   | Location        | State                | Country         | Email               | Balance        | Account Type   |");
    console.log("+------------------+-----------------+------------+-----------------+----------------------+-----------------+---------------------+----------------+----------------+");
    for (const account of Bank) {
        const accountNumber = account.getAccountNumber().padEnd(15, ' ');
        const userName = account.getUserName().padEnd(15, ' ');
        const userAge = account.getUserAge().toString().padEnd(10, ' ');
        const userLocation = account.getUserLocation().padEnd(17, ' ');
        const userState = account.getUserState().padEnd(17, ' ');
        const userCountry = account.getUserCountry().padEnd(12, ' ');
        const userEmail = account.getUserEmail().padEnd(20, ' ');
        const balance = account.getBalance().toString().padEnd(15, ' ');
        const accountType = account.getAccountType().padEnd(15, ' ');
        console.log(`| ${accountNumber} | ${userName} | ${userAge} | ${userLocation} | ${userState} | ${userCountry} | ${userEmail} | ${balance} | ${accountType} |`);
    }
    console.log("+------------------+-----------------+------------+-----------------+----------------------+-----------------+---------------------+----------------+----------------+");
}
exports.displayAllAccountsDetails = displayAllAccountsDetails;
// Function to withdraw money
function withdrawMoney() {
    let accNo = prompt("Enter account number: ");
    let account = getAccountByNumber(accNo);
    if (account) {
        let amount = (Number)(prompt("Enter the amount to withdraw: "));
        if (account.getAccountType() === "Current") {
            account.withdraw(amount);
        }
        else if (account.getAccountType() === "Savings") {
            account.withdraw(amount);
        }
        else {
            console.log("Invalid account type.");
        }
    }
    else {
        console.log("Account not found");
    }
}
exports.withdrawMoney = withdrawMoney;
// Function to deposit money
function depositMoney() {
    let accNo = prompt("Enter account number: ");
    let account = getAccountByNumber(accNo);
    if (account) {
        let amount = (Number)(prompt("Enter the amount to deposit: "));
        if (account.getAccountType() === "Current") {
            account.deposit(amount);
        }
        else if (account.getAccountType() === "Savings") {
            account.deposit(amount);
        }
        else {
            console.log("Invalid account type.");
        }
    }
    else {
        console.log("Account not found");
    }
}
exports.depositMoney = depositMoney;
// Function that helps to fetch presence of Account
function getAccountByNumber(accountNumber) {
    for (let account of Bank) {
        if (account.getAccountNumber() === accountNumber) {
            return account;
        }
    }
    return null;
}
