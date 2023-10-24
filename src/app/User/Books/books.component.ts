import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../Services/books.service';
import { Category } from '../../DTO/Category';
import { CategoryService } from '../../Services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { Book } from 'src/app/DTO/book';

@Component({
  selector: 'app-error',
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  categories: Category[] = [];
  filter: string = '';
  search: string = '';
  error: boolean = false;
  unauthorized: boolean = false;

  constructor(
    private booksSvc: BooksService,
    private loginSvc: LoginService,
    private categorySvc: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });

    this.categorySvc.getAllCategories().subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.categories = APIResult.data;
          console.log(APIResult);
        }
      },
      error: (error) => {
        // Handle the error here
        if (error.status == 401) {
        }
        this.error = true;
      },
    });

    this.booksSvc.getAllBooks().subscribe({
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

  addToCart(bookId: number) {
    if (!this.loginSvc.isLoggedin()) {
      this.booksSvc.showMessage('Please Login to add book.');
      return;
    }
    let userId = Number(this.loginSvc.getLoggedinUserId());

    this.booksSvc.addToCart(userId, bookId).subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.booksSvc.showMessage(
            'Item added to cart successfully!',
            'success'
          );
        }
        if (!APIResult.isSuccess) {
          this.booksSvc.showMessage(APIResult.errorMessage, 'success');
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

    // // Get the current cart items from localStorage or initialize an empty array
    // const cartItemsString = localStorage.getItem('Cart');
    // const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

    // // Check if the bookId is already in the cart
    // const index = cartItems.indexOf(bookId);

    // if (index !== -1) {
    //   // If bookId is already in the cart, remove it
    //   alert('Book is already in the cart');
    //   return;
    // } else {
    //   // If bookId is not in the cart, add it
    //   cartItems.push(bookId);
    // }

    // // Save the updated cart items back to localStorage
    // localStorage.setItem('Cart', JSON.stringify(cartItems));
  }

  getFilteredProducts() {
    if (!this.books) {
      return [];
    }

    let filteredBooks = this.books;

    if (this.filter !== '') {
      filteredBooks = filteredBooks.filter(
        (book: any) => book.category.name === this.filter
      );
    }

    if (this.search !== '') {
      const searchTerm = this.search.toLowerCase();
      filteredBooks = filteredBooks.filter((book: Book) => {
        return (
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.category.name.toLowerCase().includes(searchTerm)
        );
      });
    }

    return filteredBooks;
  }
}
