import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBook } from 'src/app/models/IBook';
import { BooksLoadService } from 'src/app/services/books-load.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent {
  books: IBook[] = [];
  newBook: IBook = { id: 0, title: '', description: '', isbn13: '', book_count: 0, image: '', author: '', category: '' };
  isEditMode = false;
  selectedBook: IBook = { id: 0, title: '', description: '', isbn13: '', book_count: 0, image: '', author: '', category: '' };
  bookForm: FormGroup;
  categories: string[] = [];

  constructor(private formBuilder: FormBuilder, private loadBooks: BooksLoadService, private snackBar : MatSnackBar) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isbn13: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      book_count: [0, [Validators.required, this.minValueValidator(1)]],
      image: ['', [Validators.required, Validators.pattern(/^https:\/\/.*\.(jpg|png)$/)]],
      author: ['', Validators.required,  this.authorValidator()],
      category: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.books = this.loadBooks.getBooks();
    this.loadCategories();
  }

  loadCategories() {
    const allBooks = this.loadBooks.getBooks();
    this.categories = Array.from(new Set(allBooks.map(book => book.category)));
  }

  minValueValidator(minValue: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value !== null && value < minValue) {
        return { 'minValue': { minValue } };
      }

      return null;
    };
  }
  authorValidator() {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> | import("rxjs").Observable<{ [key: string]: any } | null> => {
      const value = control.value;
  
      if (value !== null) {
        // Check if the author name contains numeric values or special symbols
        if (/[\d~`!#$%^&*+=\-\[\]\\';,/{}|\\":<>?]/g.test(value)) {
          return of({ 'invalidAuthor': true });
        }
      }
  
      return of(null);
    };
  }
  getErrorMessage(controlName: string) {
    const control = this.bookForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('pattern')) {
      return 'Invalid ISBN-13 format, required 13 digit number';
    } else if (control?.hasError('min')) {
      return 'Book count must be greater than 0';
    }
    return '';
  }

  addBook() {
    if (this.bookForm.valid) {
      const newBook: IBook = {id: this.generateUniqueId(), ...this.bookForm.value};
  
      this.loadBooks.getBooks().push(newBook);
  
      this.loadBooks.addBook(newBook).subscribe(
        () => {
          this.snackBar.open('Book added successfully!', 'Dismiss', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error adding book:', error);
          this.snackBar.open('Error adding book. Please try again.', 'Dismiss', {
            duration: 3000,
          });
        }
      );
      this.books = this.books.filter(b => b.id !== newBook.id);
      this.resetForm();
    }
  }  
  editBook(book: IBook) {
    this.selectedBook = { ...book };
    this.isEditMode = true;
    this.bookForm.patchValue({
      title: this.selectedBook.title,
      description: this.selectedBook.description,
      isbn13: this.selectedBook.isbn13,
      book_count: this.selectedBook.book_count,
      image: this.selectedBook.image,
      author: this.selectedBook.author,
      category: this.selectedBook.category,
    });
  }

  updateBook() {
    if (this.bookForm.valid) {
      this.selectedBook = { ...this.selectedBook, ...this.bookForm.value };
  
      this.loadBooks.updateBook(this.selectedBook).subscribe(
        () => {
          this.snackBar.open('Book updated successfully!', 'Dismiss', {
            duration: 3000,
          });
  
          const updatedBooks = this.books.map(book =>
            book.id === this.selectedBook.id ? { ...book, ...this.selectedBook } : book
          );
          this.books = updatedBooks;
  
          this.isEditMode = false;
          this.resetForm();
        },
        (error) => {
          console.error('Error updating book:', error);
          this.snackBar.open('Error updating book. Please try again.', 'Dismiss', {
            duration: 3000,
          });
        }
      );
    }
  }

  deleteBook(bookId: number) {
    this.loadBooks.deleteBook(bookId).subscribe(
      () => {
        this.books = this.books.filter(b => b.id !== bookId);
        this.snackBar.open('Book deleted successfully!', 'Dismiss', {
          duration: 3000,
        });
      },
      (error: any) => {
        console.error('Error deleting book:', error);
        this.snackBar.open('Error deleting book. Please try again.', 'Dismiss', {
          duration: 3000,
        });
      }
    );
  }

  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  private resetForm() {
    this.bookForm.reset({
      title: '',
      description: '',
      isbn13: '',
      book_count: 0,
      image: '',
      author: '',
      category: ''
    });
  }

}
