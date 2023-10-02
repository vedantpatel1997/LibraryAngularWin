import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Book } from './book';
import { environment } from '../environments/environment';
import { APIResponse } from '../DTO/APIResponse';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  bookApiUrl = environment.apiAddress + 'Books/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.bookApiUrl + 'GetAllBooks');
  }
}
