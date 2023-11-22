import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { Observable } from 'rxjs';
import { User } from '../DTO/User';

@Injectable({
  providedIn: 'root',
})
export class roleGuard {
  curLoggedinUser: User;
  constructor(private router: Router, private loginSvc: LoginService) {
    this.curLoggedinUser = loginSvc.getUserData();
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Get the required role from route data

    // Check if the user is logged in
    if (this.loginSvc.isLoggedin()) {
      if (this.curLoggedinUser?.role == 'Owner') {
        return true;
      }

      const requiredRole = route.data['role'];
      // Check if the user has the required role
      if (this.loginSvc.haveAccess(requiredRole)) {
        return true; // User is authenticated and has access, allow access
      } else {
        alert('Access denied. User does not have the required role.');
        this.router.navigate(['/Books']);
        return false;
      }
    } else {
      // User is not logged in, redirect to the login page
      alert('Please login to continue');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
