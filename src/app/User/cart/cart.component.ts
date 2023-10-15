import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/DTO/book';
import { BooksService } from 'src/app/Services/books.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  error: boolean = false;
  cartItems: Book[] = [];
  curUserId: number | undefined;

  constructor(private bookSvc: BooksService, private loginSvc: LoginService) {
    this.curUserId = Number(loginSvc.getLoggedinUserId());
  }
  ngOnInit(): void {
    // // Get the bookIds from local storage and parse it as JSON
    // const bookIdsString = localStorage.getItem('Cart');
    // if (bookIdsString) {
    //   const bookIds: number[] = JSON.parse(bookIdsString);
    //   console.log(bookIds);

    //   // Now you can call your service method with the array of bookIds
    //   this.bookSvc.getBooksByIds(bookIds).subscribe(
    //     (APIResult) => {
    //       if (APIResult.isSuccess) this.cartItems = APIResult.data;
    //     },
    //     (error) => {
    //       this.error = true;
    //       console.error('Error:', error);
    //     }
    //   );
    // }

    if (this.curUserId !== undefined) {
      this.bookSvc.getCartItemsByUserId(this.curUserId).subscribe(
        (APIResult) => {
          if (APIResult.isSuccess) {
            this.cartItems = APIResult.data;
          } else {
            this.error = true;
            // Handle other possible error scenarios here
            console.error('API Error:', APIResult.errorMessage);
          }
        },
        (error) => {
          // Handle network or unexpected errors here
          this.error = true;
          console.error('Network Error:', error);
        }
      );
    }
  }
}
