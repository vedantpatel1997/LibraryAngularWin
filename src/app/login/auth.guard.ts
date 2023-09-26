import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Your authentication logic here
    const allowAccess: boolean = true;

    if (allowAccess) {
      return true; // User is authenticated, allow access
    } else {
      this.router.navigate(['/login']);
      return false; // Redirect to the login page
    }
  }
}
