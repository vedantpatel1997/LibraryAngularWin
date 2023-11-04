import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { userCred } from '../DTO/userCred';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      /* Add this CSS to your component's stylesheet or a global stylesheet */
      .form-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%; /* Ensure the container covers the full form area */
        background-color: rgba(
          255,
          255,
          255,
          0.5
        ); /* Increase the transparency */
      }

      .transparent {
        opacity: 0.5;
        transition: opacity 1s;
      }

      .spinner-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1; /* Ensure it's above the form */
        display: flex;
        align-items: center;
        justify-content: center;
        background: none; /* Remove background from the spinner-container */
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  invalid: boolean = false;
  spinnerVisible: boolean = false;

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

    this.spinnerVisible = true;
    this.loginSvc.generateToken(loginData).subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.loginSvc.saveTokens(APIResult.data);
          if (this.loginSvc.haveAccess('Admin')) {
            console.log('Works');
            this.invalid = false;
            this.route.navigate(['/Admin/Dashboard']);
            this.spinnerVisible = false;
          } else {
            this.route.navigate(['']);
            this.spinnerVisible = false;
          }
        } else if (!APIResult.isSuccess) {
          this.invalid = true;
          this.spinnerVisible = false;
        }
      },
      error: (error) => {
        this.spinnerVisible = false;
      },
    });
  }
}
