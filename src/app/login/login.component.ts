import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { userCred } from '../DTO/userCred';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private loginSvc: LoginService, private route: Router) {}

  loginForm: FormGroup = new FormGroup({
    emailOrUsername: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  ngOnInit(): void {
    // this.loginForm.controls['emailOrUsername'].valueChanges.subscribe((res) => {
    //   console.log(this.loginForm.controls['emailOrUsername']);
    // });
  }

  save() {
    const loginData: userCred = {
      // username: 'yash@gmail.com',
      // password: '1234',
      username: this.loginForm.controls['emailOrUsername'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.loginSvc.generateToken(loginData).subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.loginSvc.saveTokens(APIResult.data);
          if (this.loginSvc.haveAccess('Admin')) {
            console.log('Works');
            this.route.navigate(['/Admin/Dashboard']);
          } else {
            this.route.navigate(['']);
          }
        }
      },
      error: (error) => {},
    });
  }
}
