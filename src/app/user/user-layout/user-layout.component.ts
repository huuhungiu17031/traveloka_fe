import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../service/constant';
import { UserService } from '../service/user.service';
import { Subscription, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const accessToken = this.cookieService.check(ACCESS_TOKEN);
    const refreshToken = this.cookieService.check(REFRESH_TOKEN);
    if (accessToken && refreshToken) {
      const userSubscription = this.authenticationService
        .getUserInfor()
        .subscribe({
          next: (data) => this.userService.updateUserInfor(data),
          error: (error) => console.log(error),
        });
      this.subscriptions.push(userSubscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
