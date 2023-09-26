import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Book } from './book';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  bookApiUrl = environment.apiAddress + 'Book/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookApiUrl + 'GetAllBooks');
  }
}
