import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginForm } from '../form/login-form/login-form.component';
import { RegisterForm } from '../form/register-form/register-form.component';
import { AuthenticationService } from '../../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ACCESS_TOKEN, JwtToken, REFRESH_TOKEN } from '../../service/constant';
import { UserService } from '../../service/user.service';
import { switchMap, tap } from 'rxjs';
interface DialogData {
  title: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnDestroy, OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DialogComponent>,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const title = this.data.title;
  }

  loginAction(loginFormValue: LoginForm) {
    this.authenticationService
      .login(loginFormValue)
      .pipe(
        tap((data: JwtToken) => {
          this.cookieService.set(ACCESS_TOKEN, data.accessToken);
          this.cookieService.set(REFRESH_TOKEN, data.refreshToken);
        }),
        switchMap(() => this.authenticationService.getUserInfor()),
        tap((userInfo) => this.userService.updateUserInfor(userInfo))
      )
      .subscribe({
        next: () => this.dialogRef.close(),
        error: (error) => console.log(error),
      });
  }

  registerAction(registerFormValue: RegisterForm) {
    this.authenticationService.register(registerFormValue).subscribe(
      (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Create user successfully!',
          showConfirmButton: false,
          timer: 1500,
        }).then((result: any) => this.dialogRef.close());
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Error',
          text: 'An error occurred during registration. Please try again.',
        });
      }
    );
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }
}
