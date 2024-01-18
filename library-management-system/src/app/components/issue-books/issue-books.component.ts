import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IBook } from 'src/app/models/IBook';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { BooksLoadService } from 'src/app/services/books-load.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-issue-books',
  templateUrl: './issue-books.component.html',
  styleUrls: ['./issue-books.component.css']
})
export class IssueBooksComponent {
  displayedColumns: string[] = ['username', 'userId', 'bookId' ,'bookName', 'approve/reject'];
  dataSource: MatTableDataSource<any>;

  constructor(private transactionService: TransactionService, private authService: AuthService, private http: HttpClient) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadPendingBorrows();
  }

  loadPendingBorrows(): void {
    this.authService.getUsers().subscribe((users: IUser[]) => {
      const borrowedBooks: any[] = [];

      users.forEach((user: IUser) => {
        if (user.pendingBorrows && user.pendingBorrows.length > 0) {
          user.pendingBorrows.forEach((bookId: number) => {
            this.http.get<any>(`http://localhost:3000/books/${bookId}`).subscribe(
              (book: IBook) => {
                if (book) {
                  borrowedBooks.push({
                    username: user.username || '',
                    userId: user.id || '',
                    bookId: book.id || '',
                    bookName: book.title || '',
                  });
                  this.dataSource.data = borrowedBooks;
                }
              },
              (bookError) => {
                console.error(`Error fetching book ${bookId}:`, bookError);
              }
            );
          });
        }
      });
    });
  }

  issueBook(userId: number, bookId: number): void {
    console.log("user: " + userId + " book: " + bookId);
    
    this.transactionService.issueBook(userId, bookId).subscribe(
      () => {
        console.log(`Book issued successfully for user ${userId}`);
        this.loadPendingBorrows();
      },
      (error) => {
        console.error('Error issuing book:', error);
      }
    );
  }

  cancelIssue(userId: number, bookId: number): void {
    this.transactionService.cancelIssue(userId, bookId).subscribe(
      () => {
        console.log(`Book issue cancelled successfully for user ${userId}`);
        this.loadPendingBorrows();
      },
      (error) => {
        console.error('Error cancelling book issue:', error);
      }
    );
  }
  myClick(borrow: any){
    console.log(borrow);
  }
}
