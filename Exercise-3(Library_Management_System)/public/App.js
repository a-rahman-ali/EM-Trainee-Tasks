"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const LibrarySys_1 = require("./LibrarySys");
const menuAndOps_1 = require("./menuAndOps");
// creating prompt to fetch the input from user
const prompt = (0, prompt_sync_1.default)();
console.log("Welcome to my Library Management System...!");
// My Application Execution call starts from here...!
const localLibrary = new LibrarySys_1.LibrarySystem();
startApp();
function startApp() {
    while (true) {
        (0, menuAndOps_1.displayMenu)();
        const choice = parseInt(prompt("Enter your choice: "));
        processUserInput(choice);
    }
}
// else if ladder reduced the complexity from 16(switch-case) to 8
function processUserInput(choice) {
    if (choice === 1) {
        const bookDetails = (0, menuAndOps_1.getDetailsToAdd)();
        localLibrary.addBook(bookDetails.title, bookDetails.author, bookDetails.bookId);
    }
    else if (choice === 2) {
        const bookToRemove = (0, menuAndOps_1.getBookToRemove)();
        localLibrary.removeBook(bookToRemove);
    }
    else if (choice === 3) {
        localLibrary.listBooks();
    }
    else if (choice === 4) {
        const searchQuery = (0, menuAndOps_1.getQueryString)();
        localLibrary.searchBooks(searchQuery);
    }
    else if (choice === 5) {
        const userDetails = (0, menuAndOps_1.getUserDetails)();
        const user = { userId: userDetails.userId, name: userDetails.userName, checkedOutBooks: [] };
        const bookToIssue = (0, menuAndOps_1.getBookTitle)();
        localLibrary.issueBook(user, bookToIssue);
    }
    else if (choice === 6) {
        const userIdToReturn = parseInt(prompt("Enter your id: "));
        const bookToReturn = prompt("Enter the title of the book to return: ");
        localLibrary.returnBook(userIdToReturn, bookToReturn);
    }
    else if (choice === 7) {
        localLibrary.displayAllUsers();
    }
    else if (choice === 8) {
        console.log("Thanks for using my Application...!!");
        process.exit(0);
    }
    else {
        console.log("\nInvalid choice. Please enter a valid option.");
    }
}
