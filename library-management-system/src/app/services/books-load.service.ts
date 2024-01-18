import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IBook } from '../models/IBook';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class BooksLoadService {
  private booksSubject: BehaviorSubject<IBook[]> = new BehaviorSubject<IBook[]>([]);
  public books$: Observable<IBook[]> = this.booksSubject.asObservable();

  private pathToDBJson: string = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.http.get<IBook[]>(this.pathToDBJson).subscribe(
      (data) => {
        const booksWithInitializedBorrowedBooks = data.map(book => ({ ...book}));
        this.booksSubject.next(booksWithInitializedBorrowedBooks);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  public getUsersWithPendingBorrows(): Observable<IUser[]> {
    const url = 'http://localhost:3000/users?pendingBorrows=true';
    return this.http.get<IUser[]>(url);
  }
  
  public getBooks(): IBook[] {
    return this.booksSubject.value;
  }

  public addBook(newBook: IBook): Observable<IBook> {
    this.loadBooks();
    return this.http.post<IBook>(this.pathToDBJson, newBook);
  }
  public deleteBook(bookId: number): Observable<void> {
    const url = `${this.pathToDBJson}/${bookId}`;
    return this.http.delete<void>(url);
  }
  public updateBook(updatedBook: IBook): Observable<IBook> {
    const url = `${this.pathToDBJson}/${updatedBook.id}`;
    return this.http.put<IBook>(url, updatedBook);
  }
}
