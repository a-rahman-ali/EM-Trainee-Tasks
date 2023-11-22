"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    // public quantity: number = 1;
    constructor(title, author, bookId, checkedOut = false, quantity = 1) {
        this.quantity = quantity;
        this.title = title;
        this.author = author;
        this.checkedOut = checkedOut;
        this.bookId = bookId;
    }
}
exports.Book = Book;
