import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Book } from '../DTO/book';
import { environment } from '../environments/environment';
import { APIResponse } from '../DTO/APIResponse';
import { IssueBook } from '../DTO/IssueBook';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  bookApiUrl = environment.apiAddress + 'Books/';
  bookUserTransactionApiUrl =
    environment.apiAddress + 'BooksUsersTransactions/';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.bookApiUrl + 'GetAllBooks');
  }
  getAllCategories(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.bookApiUrl + 'GetAllCategories');
  }
  addToCart(userId: number, bookId: number): Observable<APIResponse> {
    const body = { userId: userId, bookId: bookId };
    return this.http.post<APIResponse>(`${this.bookApiUrl}AddToCart`, body);
  }

  removeFromCart(userId: number, bookId: number): Observable<APIResponse> {
    const body = { userId: userId, bookId: bookId };

    return this.http.post<APIResponse>(
      `${this.bookApiUrl}RemoveFromCart`,
      body
    );
  }

  issueBooks(issueBooksData: IssueBook[]): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      `${this.bookUserTransactionApiUrl}IssueBooks`,
      issueBooksData
    );
  }
  submitBook(SubmitBooksData: {
    bookId: number;
    userId: number;
  }): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      `${this.bookUserTransactionApiUrl}SubmitBook`,
      SubmitBooksData
    );
  }

  getBooksByUserId(userId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `${this.bookUserTransactionApiUrl}GetBooksByUserID?userId=${userId}`
    );
  }

  getCartItemsByUserId(userId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `${this.bookApiUrl}GetCartItemsByUserId?userId=${userId}`
    );
  }

  getBooksByIds(bookIds: number[]): Observable<APIResponse> {
    // Define the headers if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Make the HTTP POST request with the array of bookIds
    return this.http.post<APIResponse>(
      this.bookApiUrl + 'GetBooksByIds',
      bookIds
    );
  }

  showMessage(message: string, alertType: string = 'info', level: string = '') {
    let alertContainer;
    if (level == '') {
      alertContainer = document.getElementById('liveAlertPlaceholder');
    } else {
      alertContainer = document.getElementById('liveAlertPlaceholder1');
    }

    const validAlertTypes = ['success', 'info', 'warning', 'danger'];

    if (validAlertTypes.includes(alertType)) {
      alertContainer!.innerHTML = `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    } else {
      console.error(
        'Invalid alert type. Valid types are: success, info, warning, danger'
      );
    }
  }
}
