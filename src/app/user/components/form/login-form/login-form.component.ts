import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/user/service/authentication.service';
import { UserInfo, UserService } from 'src/app/user/service/user.service';
import { tap, switchMap } from 'rxjs';
import {
  ACCESS_TOKEN,
  EMAIL_LOCALSTORAGE,
  JwtToken,
  REFRESH_TOKEN,
} from 'src/app/user/service/constant';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { JsonFormData } from '../dynamic-form/dynamic-form.component';
import { FormService } from 'src/app/user/service/form.service';

export interface LoginForm {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  formData!: JsonFormData;

  constructor(
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private userService: UserService,
    private formService: FormService
  ) {}
  ngOnInit(): void {
    this.formService.loginForm().subscribe((jsonForm) => {
      this.formData = jsonForm;
    });
  }

  onSubmit(loginFormValue: LoginForm) {
    this.authenticationService
      .login(loginFormValue)
      .pipe(
        tap((data: JwtToken) => {
          this.cookieService.set(ACCESS_TOKEN, data.accessToken);
          this.cookieService.set(REFRESH_TOKEN, data.refreshToken);
        }),
        switchMap(() => this.authenticationService.getUserInfor()),
        tap((userInfo: UserInfo) => {
          this.userService.updateUserInfor(userInfo);
          localStorage.setItem(EMAIL_LOCALSTORAGE, userInfo.email);
        })
      )
      .subscribe({
        next: () =>
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successfully!',
            showConfirmButton: false,
            timer: 1500,
          }).then((result: any) => console.log(result)),
        error: (error) => console.log(error),
      });
  }
}
