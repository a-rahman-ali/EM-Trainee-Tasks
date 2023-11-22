"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositMoney = exports.withdrawMoney = exports.displayAllAccountsDetails = exports.viewCustomerDetails = exports.viewBalance = exports.createCurrentAcc = exports.createSavingsAcc = exports.createAccount = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const accounts_1 = require("./accounts");
const BankApp_1 = require("./BankApp");
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
            console.log("Please choose from Available options\n");
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
    console.log(`Account No. ${account.accountNumber} for ${account.userName}\n`);
    // console.log(account);
}
exports.createSavingsAcc = createSavingsAcc;
// Function to Create Current Account  
function createCurrentAcc() {
    let userName = prompt("Enter your Name: ");
    let tempAge = getAgeFromUser();
    let userAge = tempAge;
    // (tempAge != -1 ? tempAge : start());
    let userLocation = prompt("Enter your Location: ");
    let userState = prompt("Enter your State: ");
    let userCountry = prompt("Enter your Country: ");
    let userEmail = getEmailFromUser();
    let initialBalance = getBalanceFromUser("current");
    let account = new accounts_1.CurrentAccount(userName, userAge, userLocation, userState, userCountry, userEmail, initialBalance);
    Bank.push(account);
    console.log(`Account No. ${account.accountNumber} for ${account.userName}\n`);
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
            console.log("Age must be a number. Please enter a valid age.\n");
        }
        else if (age < 18 || age > 68) {
            ageAttempts++;
            console.log("Age must be above 18 and below 68.\n");
            if (ageAttempts >= 2) {
                console.log("You've exceeded the maximum number of attempts in entering age.\n");
                // process.exit(0);
                return (0, BankApp_1.start)();
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
            console.log("Enter email id in proper format.\n");
            emailAttempts++;
            if (emailAttempts >= 2) {
                console.log("You've exceeded max no.of attempts in entering proper email.\n");
                // process.exit(0);
                return (0, BankApp_1.start)();
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
            console.log("Initial balance must be a number and not less than 500.\n");
            balanceAttempts++;
            if (balanceAttempts >= 2) {
                console.log("You've exceeded the maximum number of attempts in entering Balance.\n");
                // process.exit(0);
                return (0, BankApp_1.start)();
            }
            continue;
        }
        else if (isNaN(balance) || (accType === "current" && balance < 800)) {
            console.log("Initial balance must be a number and not less than 800.\n");
            balanceAttempts++;
            if (balanceAttempts >= 2) {
                console.log("You've exceeded the maximum number of attempts in entering Balance!\n");
                // process.exit(0);
                return (0, BankApp_1.start)();
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
        console.log(`Account Number: ${account.accountNumber} --> Balance: ${account.balance}\n`);
    }
    else {
        console.log("Account not found\n");
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
        console.log(`| Account Number:   ${account.accountNumber}`);
        console.log(`| Customer Name:    ${account.userName}`);
        console.log(`| Age:              ${account.userAge}`);
        console.log(`| Location:         ${account.userLocation}`);
        console.log(`| State:            ${account.userState}`);
        console.log(`| Country:          ${account.userCountry}`);
        console.log(`| Email:            ${account.userEmail}`);
        console.log(`| Balance:          ${account.balance}`);
        console.log(`| Account Type:     ${account.getAccountType()}`);
        console.log("------------------------------------------------\n");
    }
    else {
        console.log("Account not found\n");
    }
}
exports.viewCustomerDetails = viewCustomerDetails;
// Function to display account holders details in tabluar format
function displayAllAccountsDetails() {
    // removed the approach to print using console.log();
    const tableData = Bank.map(account => {
        return {
            'Account Number': account.accountNumber,
            'User Name': account.userName,
            'User Age': account.userAge,
            'Location': account.userLocation,
            'State': account.userState,
            'Country': account.userCountry,
            'Email': account.userEmail,
            'Balance': account.balance,
            'Account Type': account.getAccountType(),
        };
    });
    console.table(tableData);
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
            // (account as CurrentAccount).withdraw(amount);
        }
        else if (account.getAccountType() === "Savings") {
            account.withdraw(amount);
            // (account as SavingsAccount).withdraw(amount);
        }
        else {
            console.log("Invalid account type.\n");
        }
    }
    else {
        console.log("Account not found\n");
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
            console.log("Invalid account type.\n");
        }
    }
    else {
        console.log("Account not found. \n");
    }
}
exports.depositMoney = depositMoney;
// Function that helps to fetch presence of Account
function getAccountByNumber(accountNumber) {
    for (let account of Bank) {
        if (account.accountNumber.toLowerCase() === accountNumber.toLowerCase()) {
            return account;
        }
    }
    return null;
}
