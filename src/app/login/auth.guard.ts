import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private loginSvc: LoginService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Your authentication logic here
    const allowAccess: boolean = true;

    if (this.loginSvc.isLoggedin()) {
      return true; // User is authenticated, allow access
      console.log(true);
    } else {
      this.router.navigate(['/login']);
      console.log(false);
      return false; // Redirect to the login page
    }
  }
}
