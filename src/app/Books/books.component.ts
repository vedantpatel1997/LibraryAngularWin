import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BooksService } from './books.service';

@Component({
  selector: 'app-error',
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  error: boolean = false;

  constructor(private booksSvc: BooksService) {}

  ngOnInit(): void {
    this.booksSvc.getProducts().subscribe({
      next: (books) => {
        this.books = books;
        // console.log(this.books);
      },
      error: (error) => {
        // Handle the error here
        console.error('An error occurred while fetching books:', error);
        this.error = true;
      },
    });
  }
}
