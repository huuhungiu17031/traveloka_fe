import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfo, UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { EMAIL_LOCALSTORAGE, REFRESH_TOKEN } from '../../service/constant';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) {}
  isLogin: boolean = false;
  user!: UserInfo;
  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      if (user.email.length > 0 && user.roles.length > 0) {
        this.isLogin = true;
        this.user = user;
      }
    });
  }

  logout() {
    const email = localStorage.getItem(EMAIL_LOCALSTORAGE);
    this.cookieService.delete(REFRESH_TOKEN);
    // this.cookieService.delete(ACCESS_TOKEN);
    // this.authenticationService.provokeToken(email).subscribe((response) => {
    //   this.router.navigate(['user/hotel']);
    //   localStorage.removeItem(EMAIL_LOCALSTORAGE);

    //   this.userService.updateUserInfor({
    //     email: '',
    //     roles: [],
    //   });
    // });
  }
}
