import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/DTO/APIResponse';
import { environment } from 'src/app/environments/environment';
import { User } from '../DTO/User';
import { Address } from '../DTO/Address';
import { UpdatePassword } from '../DTO/UpdatePassword';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  bookApiUrl = environment.apiAddress + 'Users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.bookApiUrl + 'GetAllUsers');
  }

  getUserByUserId(userId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.bookApiUrl + `GetById?id=${userId}`);
  }

  createUser(userData: User): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.bookApiUrl}Create`, userData);
  }

  updateUser(userData: User, userId: number): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      `${this.bookApiUrl}Update?id=${userId}`,
      userData
    );
  }

  createAddress(addressData: Address, userId: number): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      `${this.bookApiUrl}CreateAddress?userId=${userId}`,
      addressData
    );
  }

  GetAddressByUserId(userId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `${this.bookApiUrl}GetAddressByUserId?userId=${userId}`
    );
  }

  updateAddress(addressData: Address, userId: number): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      `${this.bookApiUrl}UpdateAddress?userId=${userId}`,
      addressData
    );
  }

  updatePassword(password: UpdatePassword): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      `${this.bookApiUrl}UpdatePassword`,
      password
    );
  }
}
