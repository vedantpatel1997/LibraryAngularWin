import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../DTO/APIResponse';
import { userCred } from '../DTO/userCred';
import { Router } from '@angular/router';
import { APIToken } from '../DTO/APIToken';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  curUser: Number | undefined;
  bookApiUrl = environment.apiAddress + 'Authorize/';
  constructor(private http: HttpClient, private route: Router) {}

  generateToken(usercred: userCred): Observable<APIResponse> {
    // Prepare the request body with the user credentials
    const requestBody = {
      username: usercred.username,
      password: usercred.password,
    };

    // Make the POST request to the API endpoint with the request body
    return this.http.post<APIResponse>(
      this.bookApiUrl + 'GenerateToken',
      requestBody
    );
  }

  generateRefreshToken(): Observable<APIResponse> {
    const requestBody = {
      token: this.getTokenValue(),
      refreshToken: this.getRefreshTokenValue(),
    };
    return this.http.post<APIResponse>(
      this.bookApiUrl + 'GenerateRefreshToken',
      requestBody
    );
  }

  isLoggedin() {
    if (
      this.getLoggedinUserId() &&
      (this.haveAccess('User') ||
        this.haveAccess('Admin') ||
        this.haveAccess('Owner'))
    ) {
      return true;
    }
    return false;
  }
  getLoggedinUserId() {
    if (this.curUser !== null) return this.curUser;
    return false;
  }

  getTokenValue() {
    return localStorage.getItem('token') || '';
  }
  getRefreshTokenValue() {
    return localStorage.getItem('refreshToken') || '';
  }

  haveAccess(role: string) {
    try {
      // Attempt to retrieve the token from local storage
      const loggedInToken = localStorage.getItem('token') || '';

      if (loggedInToken === '') {
        // If the token is empty or not found, return false (no access)
        return false;
      }

      // Attempt to split the token and decode the middle part (payload)
      const tokenParts = loggedInToken.split('.');
      if (tokenParts.length !== 3) {
        // If the token doesn't have the expected three parts, it's invalid
        return false;
      }

      // Decode the middle part of the token (payload)
      const atobData = atob(tokenParts[1]);
      const finalData = JSON.parse(atobData);

      // Check if the role in the token matches the specified role
      if (finalData && finalData.role && finalData.role.trim() === role) {
        this.curUser = finalData.UserId;
        return true; // Role matches, access granted
      }
    } catch (error) {
      // Handle any potential errors, such as invalid token format or JSON parsing errors
      console.error('Error while checking access:');
    }

    // If any error occurred or access was not granted, return false
    return false;
  }

  saveTokens(tokenData: APIToken) {
    localStorage.setItem('token', tokenData.token);
    localStorage.setItem('refreshToken', tokenData.refreshToken);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.route.navigateByUrl('/login');
  }
}
