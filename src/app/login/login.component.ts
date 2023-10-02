import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Shared/login.service';
import { userCred } from '../DTO/userCred';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private loginSvc: LoginService, private route: Router) {
    this.loginForm = new FormGroup({
      userId: new FormControl(),
      password: new FormControl(),
    });
  }

  loginForm: FormGroup;

  ngOnInit(): void {}

  save() {
    const loginData: userCred = {
      username: 'vedantp9@gmail.com',
      password: '1234',
    };

    this.loginSvc.generateToken(loginData).subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.loginSvc.saveTokens(APIResult.data);

          this.route.navigate(['']);
        }
      },
      error: (error) => {},
    });
  }
}
