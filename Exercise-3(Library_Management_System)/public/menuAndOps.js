"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookToRemove = exports.getQueryString = exports.getBookTitle = exports.getUserDetails = exports.getDetailsToAdd = exports.displayMenu = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
function displayMenu() {
    console.log("\nChoose from the options below: ");
    console.log("1. Add Book");
    console.log("2. Remove Book");
    console.log("3. List Books");
    console.log("4. Search Books");
    console.log("5. Issue Book to user");
    console.log("6. Return Book to Library");
    console.log("7. List Users");
    console.log("8. Exit");
}
exports.displayMenu = displayMenu;
function getDetailsToAdd() {
    const title = prompt("Enter the title of the book: ");
    const author = prompt("Enter the author of the book: ");
    const bookId = parseInt(prompt("Enter the book ID:"));
    return { title, author, bookId };
}
exports.getDetailsToAdd = getDetailsToAdd;
function getUserDetails() {
    const userName = prompt("Enter your name: ");
    const userId = parseInt(prompt("Enter your id: "));
    return { userName, userId };
}
exports.getUserDetails = getUserDetails;
function getBookTitle() {
    return prompt("Enter the title of the book to issue: ");
}
exports.getBookTitle = getBookTitle;
function getQueryString() {
    return prompt("Enter the id or title or author of book to search: ");
}
exports.getQueryString = getQueryString;
function getBookToRemove() {
    return parseInt(prompt("Enter the id of the book to remove: "));
}
exports.getBookToRemove = getBookToRemove;
