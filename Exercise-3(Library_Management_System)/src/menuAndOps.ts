import PromptSync from "prompt-sync";
const prompt = PromptSync();

export function displayMenu(): void {
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

export function getDetailsToAdd(): {title: string, author: string, bookId: number} {
    const title = prompt("Enter the title of the book: ");
    const author = prompt("Enter the author of the book: ");
    const bookId = parseInt(prompt("Enter the book ID:"));
    return {title, author, bookId};
}

export function getUserDetails(): {userName: string, userId: number}{
    const userName = prompt("Enter your name: ");
    const userId = parseInt(prompt("Enter your id: "));
    return {userName, userId};
}

export function getBookTitle(): string {
    return prompt("Enter the title of the book to issue: ");
}

export function getQueryString(): string {
    return prompt("Enter the id or title or author of book to search: ");
}

export function getBookToRemove(): number{
    return parseInt(prompt("Enter the id of the book to remove: "));
}