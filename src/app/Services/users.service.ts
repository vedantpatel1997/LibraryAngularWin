import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/DTO/APIResponse';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  bookApiUrl = environment.apiAddress + 'Users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.bookApiUrl + 'GetAllUsers');
  }
}
