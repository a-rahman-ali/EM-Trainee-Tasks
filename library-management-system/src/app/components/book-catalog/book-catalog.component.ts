import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IBook } from 'src/app/models/IBook';
import { AuthService } from 'src/app/services/auth.service';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Router } from '@angular/router';
import { BooksLoadService } from 'src/app/services/books-load.service';
import { TransactionService } from '../../services/transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css'],
})
export class BookCatalogComponent implements OnInit {
  books: IBook[] = [];

  constructor(
    protected authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private booksLoadService: BooksLoadService,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.books = this.booksLoadService.getBooks();
  }
  ngOnChanges(): void {
    this.books = this.booksLoadService.getBooks();
  }
  protected openBookDetailDialog(book: IBook): void {
    this.dialog.open(BookDetailsComponent, {
      width: '500px',
      data: { book },
    });
    this.router.navigate(['/book-catalog/books/', book.id]);
  }

  protected borrowClick(book: IBook): void {
    const user = this.authService.getCurrentUser();
  
    if (user) {
      if (user.pendingBorrows && user.pendingBorrows.length >= 3) {
        console.log('You cannot borrow more than 3 books. Please return previous ones to borrow another.');
        // alert('You cannot borrow more than 5 books. Please return previous ones to borrow another.');
        this.snackBar.open(
          'You cannot borrow more than 3 books. Please return previous ones to borrow another.',
          'Close',
          {
            duration: 5000,
            panelClass: ['borrow-limit-snackbar', 'mat-toolbar'],
          }
        );
    
      } else {
        this.transactionService.borrowBook(user, book).subscribe(
          (transactionSuccess) => {
            if (transactionSuccess) {
              console.log(`User ${user.username} borrowed book ${book.title}`);
              // this.router.navigate(['/my-books']);
            } else {
              console.log(`Failed to borrow book ${book.title}`);
            }
          },
          (error) => {
            console.error('Error during borrow transaction:', error);
          }
        );
      }
    }
  }
  isBookBorrowed(bookId: number): boolean {
    const user = this.authService.getCurrentUser();
    return  !!((user?.borrowedBooks && user?.borrowedBooks.includes(bookId)));
  }
  isBookPending(bookId: number): boolean {
    const user = this.authService.getCurrentUser();
    return  !!(user?.pendingBorrows && user.pendingBorrows.includes(bookId));
  }
}
