import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdatePassword } from 'src/app/DTO/UpdatePassword';
import { BooksService } from 'src/app/Services/books.service';
import { LoginService } from 'src/app/Services/login.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  updateFrom: boolean = false;
  curUserId: number;

  ngOnInit(): void {
    this.disableUpdate();
    this.passwordForm.controls['password'].valueChanges.subscribe((res) => {
      this.passwordsMatching();
    });
    this.passwordForm.controls['confirmPassword'].valueChanges.subscribe(
      (res) => {
        this.passwordsMatching();
      }
    );
  }

  constructor(
    private userSvc: UsersService,
    private loginSvc: LoginService,
    private bookSvc: BooksService
  ) {
    this.curUserId = Number(this.loginSvc.getLoggedinUserId());
  }

  passwordForm: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: (control) => this.passwordsMatching() }
  );

  passwordsMatching() {
    if (this.passwordForm) {
      let pass = this.passwordForm.controls['password'].value;
      let confirmPass = this.passwordForm.controls['confirmPassword'].value;
      if (pass != confirmPass) {
        return { passwordsNotMatching: true };
      }
    }
    return null;
  }

  enableUpdate() {
    this.passwordForm.enable();
    this.updateFrom = true;
  }

  disableUpdate() {
    this.passwordForm.disable();
    this.updateFrom = false;
    this.passwordForm.reset();
  }

  save() {
    if (this.passwordForm.valid) {
      let passwordData: UpdatePassword = {
        userId: this.curUserId,
        oldPassword: this.passwordForm.controls['oldPassword'].value,
        newPassword: this.passwordForm.controls['password'].value,
      };
      console.log(passwordData);
      this.userSvc.updatePassword(passwordData).subscribe({
        next: (APIResult) => {
          if (APIResult.isSuccess) {
            this.bookSvc.showMessage(
              `Password succesfully Updated.`,
              'success'
            );
            console.log(APIResult);
            this.disableUpdate();
          } else {
            this.bookSvc.showMessage(APIResult.errorMessage, 'warning');
          }
        },
        error: (error) => {
          // Handle API call errors here
          this.bookSvc.showMessage(
            `<i class="fa-solid fa-triangle-exclamation fa-lg"></i> Something went wrong !`,
            'warning'
          );
          console.log(error);
        },
      });
    }
  }
}
