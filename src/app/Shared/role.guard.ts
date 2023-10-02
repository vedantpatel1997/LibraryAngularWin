import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class roleGuard {
  constructor(private router: Router, private loginSvc: LoginService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Your authentication logic here
    const hasAccess: boolean = this.loginSvc.haveAccess('Admin');

    if (hasAccess) {
      return true; // User is authenticated, allow access
    } else {
      console.log('access denied');
      return this.router.createUrlTree(['/login']); // Redirect to the login page
    }
  }
}
