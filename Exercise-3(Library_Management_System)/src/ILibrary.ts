import { Book } from "./book";
import { User } from "./IUserType";

export interface Library {
    books: Book[];
    users: User[];
    addBook(title: string, author: string, bookId: number): void;
    removeBook(bookId: number): void;
    listBooks(): void;
    searchBooks(query: string): void;
    issueBook(user: User, bookTitle: string): void;
    returnBook(user: number, bookTitle: string): void;
}