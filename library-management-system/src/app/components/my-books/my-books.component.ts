import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/models/IBook';
import { AuthService } from 'src/app/services/auth.service';
import { BooksLoadService } from 'src/app/services/books-load.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  borrowedBooks: IBook[] = [];

  constructor(
    private authService: AuthService,
    private bookService: BooksLoadService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }
  private loadBorrowedBooks(): void {
    const user = this.authService.getCurrentUser();

    if (user && user.borrowedBooks) {
      this.borrowedBooks = this.bookService.getBooks().filter(
        (book) => user.borrowedBooks!.includes(book.id)
      );
    }
  }

  returnBookClick(book: IBook): void {
    const user = this.authService.getCurrentUser();

    if (user && user.borrowedBooks) {
      this.transactionService.returnBook(user, book).subscribe(
        (transactionSuccess) => {
          if (transactionSuccess) {
            console.log(`User ${user.username} returned book ${book.title}`);
            this.router.navigate(['/book-catalog']);
          } else {
            console.log(`Failed to return book ${book.title}`);
          }
        },
        (error) => {
          console.error('Error during return transaction:', error);
        }
      );
    }
  }
}
