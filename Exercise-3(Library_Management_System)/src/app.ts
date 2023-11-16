import PromptSync from "prompt-sync";
import { LibrarySystem } from "./LibrarySys";
import { User } from "./IUserType";

// creating prompt to fetch the input from user
const prompt = PromptSync();

console.log("Welcome to my Library Management System...!");
// My Application Execution call starts from here...!
const localLibrary = new LibrarySystem();
startApp();

function startApp(): void {
    while (true) {
        displayMenu();
        const choice = parseInt(prompt("Enter your choice: "));
        processUserInput(choice);
    }
}

function displayMenu(): void {
    console.log("\nChoose from the options below: ");
    console.log("1. Add Book");
    console.log("2. Remove Book");
    console.log("3. List Books");
    console.log("4. Search Books");
    console.log("5. Issue Book to user");
    console.log("6. Return Book to Library");
    console.log("7. Exit");
}

function processUserInput(choice: number): void {
    switch (choice) {
        case 1:
            const title = prompt("Enter the title of the book: ");
            const author = prompt("Enter the author of the book: ");
            const bookId = parseInt(prompt("Enter the book ID:"));
            localLibrary.addBook(title, author, bookId);
            break;
        case 2:
            const bookToRemove = parseInt(prompt("Enter the id of the book to remove: "));
            localLibrary.removeBook(bookToRemove);
            break;
        case 3:
            localLibrary.listBooks();
            break;
        case 4:
            const searchQuery = prompt("Enter the id or title or author of book to search: ");
            localLibrary.searchBooks(searchQuery);
            break;
        case 5:
            const userName = prompt("Enter your name: ");
            const userId  = parseInt(prompt("Enter your id: "));
            const user: User = {userId, name: userName, checkedOutBooks: [] };
            const bookToIssue = prompt("Enter the title of the book to issue: ");
            localLibrary.issueBook(user, bookToIssue);
            break;
        case 6:
            const userIdToReturn = parseInt(prompt("Enter your id: "));
            const bookToReturn = prompt("Enter the title of the book to return: ");
            localLibrary.returnBook(userIdToReturn, bookToReturn);
            break;
        case 7:
            console.log("Thanks for using my Application...!!");
            process.exit(0);
            break;
        default:
            console.log("\nInvalid choice. Please enter a valid option.");
    }
}



