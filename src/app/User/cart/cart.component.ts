import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BillingInfo } from 'src/app/DTO/BillingInfo';
import { IssueBook } from 'src/app/DTO/IssueBook';
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
  curUserId: any;

  billingInfo: BillingInfo = {
    quantity: 0,
    totalBookAmount: 0,
    deliveryType: '', // Set to the default option
    deliveryFee: 0,
    tax: 0,
    finalAmount: 0,
    Address: '', // You can set the address based on user data
  };

  constructor(private bookSvc: BooksService, private loginSvc: LoginService) {
    this.curUserId = Number(loginSvc.getLoggedinUserId());
  }
  ngOnInit(): void {
    this.getBookData();
  }

  chekoutForm: FormGroup = new FormGroup({
    delivery: new FormControl('home', [Validators.required]),
    rentPeriod: new FormControl('10', [Validators.required]),
  });

  getBookData() {
    if (this.curUserId !== undefined) {
      this.bookSvc.getCartItemsByUserId(this.curUserId).subscribe(
        (APIResult) => {
          if (APIResult.isSuccess) {
            this.cartItems = APIResult.data;
            this.cartItems.forEach((cur) => {
              cur.rentPeriod = +this.chekoutForm.controls['rentPeriod'].value;
            });
            this.onRentDaysChage();
            this.calculateBillingInfo();
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

  calculateBillingInfo() {
    this.billingInfo.quantity = this.cartItems.length;
    this.billingInfo.deliveryType = this.chekoutForm.controls['delivery'].value;
    this.billingInfo.totalBookAmount = this.calculateTotalBookAmount(); // Implement this function
    this.billingInfo.deliveryFee =
      this.billingInfo.deliveryType == 'pickup' ? 0 : 5.99; // Implement this function
    this.billingInfo.tax = +(
      (this.billingInfo.totalBookAmount + this.billingInfo.deliveryFee) *
      0.13
    ).toFixed(2); // Implement this function
    this.billingInfo.finalAmount = +(
      this.billingInfo.totalBookAmount +
      this.billingInfo.deliveryFee +
      this.billingInfo.tax
    ).toFixed(2); // Implement this function
  }

  calculateTotalBookAmount(): number {
    let totalBookAmount = 0;
    this.cartItems.forEach((cur) => {
      totalBookAmount += cur.totalRentPrice;
    });
    return +totalBookAmount.toFixed(2);
  }

  onRentDaysChage() {
    this.cartItems.forEach((cur) => {
      cur.totalRentPrice = +(
        cur.price +
        (+cur.rentPeriod / 100) * cur.price
      ).toFixed(2);
    });
    this.onDeliveryOptionChange();
  }

  getReturnDate(days: number): string {
    const currentDate = new Date();
    const returnDate = new Date(currentDate);
    returnDate.setDate(currentDate.getDate() + +days);

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return returnDate.toLocaleDateString('en-US', options);
  }

  onDeliveryOptionChange() {
    // Update billing info when the delivery option changes
    this.calculateBillingInfo();
  }

  removeFromCart(bookId: number) {
    if (!this.loginSvc.isLoggedin()) {
      this.bookSvc.showMessage('Please Login to remove a book.', 'danger');
      return;
    }

    let userId = Number(this.loginSvc.getLoggedinUserId());

    this.bookSvc.removeFromCart(userId, bookId).subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.bookSvc.showMessage(
            'Item removed from the cart successfully!',
            'success'
          );
          this.getBookData();
        } else {
          this.bookSvc.showMessage(APIResult.errorMessage, 'warning');
        }
      },
      error: (error) => {
        // Handle the error here
        if (error.status == 401) {
          // Handle unauthorized error if needed
        }
        this.error = true;
      },
    });
  }

  save() {
    let issueBookData: IssueBook[] = [];
    this.cartItems.forEach((cartItem) => {
      const issueBook: IssueBook = {
        bookId: cartItem.bookId,
        userId: this.curUserId,
        days: cartItem.rentPeriod,
      };

      issueBookData.push(issueBook);
    });

    if (this.chekoutForm.valid) {
      this.bookSvc.issueBooks(issueBookData).subscribe({
        next: (APIResult) => {
          if (APIResult.isSuccess) {
            this.getBookData();
            this.bookSvc.showMessage(
              'Purchase Successful!',
              'success',
              'TOPLevel'
            );
            console.log(APIResult);
          } else {
            console.log(APIResult);
            this.bookSvc.showMessage(APIResult.errorMessage, 'warning');
          }
        },
        error: (error) => {
          // Handle the error here
          if (error.status == 401) {
            // Handle unauthorized error if needed
          }
          this.error = true;
        },
      });
    }
  }
}
