import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Book } from '../DTO/book';
import { environment } from '../environments/environment';
import { APIResponse } from '../DTO/APIResponse';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  bookApiUrl = environment.apiAddress + 'Books/';

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
}
