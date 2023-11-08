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
      console.log(false);
      this.loginSvc.logOut();
      this.loginSvc.logout();
      alert('Please Login !');
      this.router.navigate(['/login']);
      return false; // Redirect to the login page
    }
  }
}
