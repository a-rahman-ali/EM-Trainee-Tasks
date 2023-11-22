import PromptSync from "prompt-sync";
import { LibrarySystem } from "./LibrarySys";
import { IUser } from "./IUserType";
import { displayMenu, getBookTitle, getBookToRemove, getDetailsToAdd, getQueryString, getUserDetails } from "./menuAndOps";

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

// else if ladder reduced the complexity from 16(switch-case) to 8
function processUserInput(choice: number): void {
    if(choice === 1){
        const bookDetails = getDetailsToAdd();
        localLibrary.addBook(bookDetails.title, bookDetails.author, bookDetails.bookId);
    }
    else if(choice === 2){
        const bookToRemove = getBookToRemove();
        localLibrary.removeBook(bookToRemove);
    }
    else if(choice === 3){
        localLibrary.listBooks();
    }
    else if(choice === 4){
        const searchQuery = getQueryString();
        localLibrary.searchBooks(searchQuery);
    }
    else if(choice === 5){
        const userDetails = getUserDetails();
        const user: IUser = {userId: userDetails.userId, name: userDetails.userName, checkedOutBooks: [] };
        const bookToIssue = getBookTitle();
        localLibrary.issueBook(user, bookToIssue);
    }
    else if(choice === 6){
        const userIdToReturn = parseInt(prompt("Enter your id: "));
        const bookToReturn = prompt("Enter the title of the book to return: ");
        localLibrary.returnBook(userIdToReturn, bookToReturn);
    }
    else if(choice === 7){
        localLibrary.displayAllUsers();
    }
    else if(choice === 8){
        console.log("Thanks for using my Application...!!");
        process.exit(0);
    }
    else{
        console.log("\nInvalid choice. Please enter a valid option.");
    }
}

