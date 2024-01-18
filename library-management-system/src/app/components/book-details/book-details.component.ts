import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IBook } from 'src/app/models/IBook';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  @Input() book: IBook;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<BookDetailsComponent>, private router: Router) {
    this.book = data.book;
  }
  closeDialog(): void {
    this.dialogRef.close();
    this.router.navigate(['/book-catalog'])
  }
}
