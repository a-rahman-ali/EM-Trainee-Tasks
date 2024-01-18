import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { IUser } from '../models/IUser';
import { IBook } from '../models/IBook';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  borrowBook(user: IUser, book: IBook): Observable<boolean> {
    const updatedBook: IBook = { ...book, book_count: book.book_count - 1 };
    user.pendingBorrows!.push(book.id);

    return this.http.put<boolean>(`${this.apiUrl}/books/${book.id}`, updatedBook)
      .pipe(
        switchMap((bookUpdated) => {
          if (bookUpdated) {
            return this.http.put<boolean>(`${this.apiUrl}/users/${user.id}`, user);
          }
          return of(false);
        })
      );
  }

  issueBook(userId: number, bookId: number): Observable<boolean> {
    return this.http.get<IUser>(`${this.apiUrl}/users/${userId}`).pipe(
      switchMap(user => {
        if (user) {
          const updatedUser: IUser = { ...user };
          updatedUser.borrowedBooks = [...(updatedUser.borrowedBooks || []), bookId];
          updatedUser.pendingBorrows = updatedUser.pendingBorrows?.filter(id => id !== bookId) || [];
  
          return this.http.put<boolean>(`${this.apiUrl}/users/${userId}`, updatedUser);
        } else {
          return of(false); 
        }
      })
    );
  }

  cancelIssue(userId: number, bookId: number): Observable<boolean> {
    return this.http.get<IUser>(`${this.apiUrl}/users/${userId}`).pipe(
      switchMap(user => {
        if (user) {
          const updatedUser: IUser = { ...user };
          updatedUser.pendingBorrows = updatedUser.pendingBorrows?.filter(id => id !== bookId) || [];
  
          return this.http.put<boolean>(`${this.apiUrl}/users/${userId}`, updatedUser).pipe(
            switchMap(userUpdated => {
              if (userUpdated) {
                return this.http.get<IBook>(`${this.apiUrl}/books/${bookId}`).pipe(
                  switchMap(book => {
                    if (book) {
                      const updatedBook: IBook = { ...book, book_count: book.book_count + 1 };
  
                      return this.http.put<boolean>(`${this.apiUrl}/books/${bookId}`, updatedBook);
                    } else {
                      return of(false);
                    }
                  })
                );
              } else {
                return of(false); 
              }
            })
          );
        } else {
          return of(false); 
        }
      })
    );
  }

  returnBook(user: IUser, book: IBook): Observable<boolean> {
    const updatedBook: IBook = { ...book, book_count: book.book_count + 1};
  
    const updatedBorrowedBooks = user.borrowedBooks?.filter(id => id !== book.id) || [];
  
    return this.http.put<boolean>(`${this.apiUrl}/books/${book.id}`, updatedBook)
      .pipe(
        switchMap((bookUpdated) => {
          if (bookUpdated) {
            user.borrowedBooks = updatedBorrowedBooks;
            return this.http.put<boolean>(`${this.apiUrl}/users/${user.id}`, user);
          }
          return of(false);
        })
      );
  }
}
