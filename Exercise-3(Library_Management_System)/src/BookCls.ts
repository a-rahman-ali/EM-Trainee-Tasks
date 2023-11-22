export class Book {
    public title: string;
    public author: string;
    public bookId: number;
    public checkedOut: boolean;
    // public quantity: number = 1;

    constructor(title: string, author: string, bookId: number , checkedOut: boolean = false, public quantity: number = 1 ) {
        this.title = title;
        this.author = author;
        this.checkedOut = checkedOut;
        this.bookId = bookId;
    }
}
