import { Component, OnInit } from '@angular/core';
import { BooksLoadService } from '../../services/books-load.service';
import { IBook } from '../../models/IBook';

@Component({
  selector: 'app-categorize',
  templateUrl: './search-categorize.component.html',
  styleUrls: ['./search-categorize.component.css']
})
export class SearchCategorizeComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = '';
  categories: string[] = [];
  booksInCategory: IBook[] = [];
  booksToShow: IBook[] = [];
  isInputFocused: boolean = false;

  constructor(private booksLoadService: BooksLoadService) { }

  ngOnInit() {
    this.loadCategories();
    this.filterBooksByCategory();
  }

  loadCategories() {
    const allBooks = this.booksLoadService.getBooks();
    this.categories = Array.from(new Set(allBooks.map(book => book.category)));
  }
  
  booksInCategoryOne(category: string): IBook[] {
    return this.booksLoadService.getBooks().filter(book => book.category === category);
  }

  filterBooksByCategory() {
    if (this.selectedCategory) {
      this.booksInCategory = this.booksLoadService.getBooks().filter(book => book.category === this.selectedCategory);
    } else {
      this.booksInCategory = this.booksLoadService.getBooks();
    }

    this.applySearchFilter();
  }

  searchBooks() {
    this.applySearchFilter();
  }

  clearSearch() {
    this.searchQuery = '';
    this.applySearchFilter();
  }

  applySearchFilter() {
    this.booksToShow = this.booksInCategory.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) 
    );
  }
  onFocus() {
    this.isInputFocused = true;
  }

  onBlur() {
    this.isInputFocused = false;
  }

}
