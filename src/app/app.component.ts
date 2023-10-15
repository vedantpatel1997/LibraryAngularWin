import { AfterContentInit, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './Services/login.service';
import { RouteChangeService } from './Shared/route-change.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userId: Number | undefined;
  userInfo = {
    isUser: false,
    isAdmin: false,
    isLoggedin: false,
  };
  title = 'LibraryManagement.web';

  constructor(
    private route: Router,
    private loginSvc: LoginService,
    private routeChangeService: RouteChangeService
  ) {}

  ngOnInit(): void {
    this.routeChangeService.getRouteChangeObservable().subscribe(() => {
      // Perform actions based on the current route.
      this.userInfo.isLoggedin = this.loginSvc.isLoggedin();
      this.userInfo.isUser = this.loginSvc.haveAccess('User');
      this.userInfo.isAdmin = this.loginSvc.haveAccess('Admin');
    });
  }

  logOut() {
    this.loginSvc.logOut();
  }
}
