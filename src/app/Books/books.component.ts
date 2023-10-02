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
  unauthorized: boolean = false;

  constructor(private booksSvc: BooksService) {}

  ngOnInit(): void {
    this.booksSvc.getProducts().subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.books = APIResult.data;
          console.log(APIResult);
        }
      },
      error: (error) => {
        // Handle the error here
        if (error.status == 401) {
          this.unauthorized = true;
        }
        this.error = true;
      },
    });
  }
}
