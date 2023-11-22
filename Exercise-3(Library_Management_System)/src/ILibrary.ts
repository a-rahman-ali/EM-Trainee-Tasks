import { Book } from "./BookCls";
import { IUser } from "./IUserType";

export interface ILibrary {
    books: Book[];
    users: IUser[];
    addBook(title: string, author: string, bookId: number): void;
    removeBook(bookId: number): void;
    listBooks(): void;
    searchBooks(query: string): void;
    issueBook(user: IUser, bookTitle: string): void;
    returnBook(user: number, bookTitle: string): void;
}