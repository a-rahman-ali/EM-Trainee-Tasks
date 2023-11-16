import { Book } from "./book";

export interface User {
    userId: number;
    name: string;
    checkedOutBooks: Book[];
}

export interface Admin {
    addBook(title: string, author: string, bookId: number): void;
    removeBook(bookId: number): void;
}