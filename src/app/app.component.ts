import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './Shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'LibraryManagement.web';

  ngOnInit(): void {
    this.userInfo.isLoggedin = this.loginSvc.isLoggedin();
  }
  userInfo = {
    isUser: false,
    isADmin: false,
    isLoggedin: false,
  };

  constructor(private route: Router, private loginSvc: LoginService) {}
  logOut() {
    this.loginSvc.logOut();
    this.userInfo.isLoggedin = false;
  }
}
