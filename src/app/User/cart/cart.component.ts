import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/Services/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  error: boolean = false;
  constructor(private bookSvc: BooksService) {}
  ngOnInit(): void {
    // Get the bookIds from local storage and parse it as JSON
    const bookIdsString = localStorage.getItem('Cart');
    if (bookIdsString) {
      const bookIds: number[] = JSON.parse(bookIdsString);
      console.log(bookIds);

      // Now you can call your service method with the array of bookIds
      this.bookSvc.getBooksByIds(bookIds).subscribe({
        next: (APIResult) => {
          if (APIResult.isSuccess) {
            console.log(APIResult);
          }
        },
        error: (error) => {
          // Handle the error here
          if (error.status == 401) {
            console.log(error);
          }
          this.error = true;
        },
      });
    }
  }
}
