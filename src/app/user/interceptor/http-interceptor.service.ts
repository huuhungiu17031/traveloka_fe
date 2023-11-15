import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, catchError, map, throwError } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import {
  ACCESS_TOKEN,
  EMAIL_LOCALSTORAGE,
  JwtToken,
  REFRESH_TOKEN,
  REFRESH_TOKEN_ENDPOINT,
  USER_INFO_ENDPOINT,
} from '../service/constant';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {
  private countUnauthorizeError: number = 0;
  private excludedEndPoint: string[] = [
    USER_INFO_ENDPOINT,
    REFRESH_TOKEN_ENDPOINT,
  ];
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestUrl = request.url;
    const checkedEndPoint = this.excludedEndPoint.some((endPoint) =>
      requestUrl.includes(endPoint)
    );
    const accessToken = this.cookieService.get(ACCESS_TOKEN);
    if (checkedEndPoint && accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return next
      .handle(request)
      .pipe(catchError((error) => this.handleAuthError(error)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error && error.status === 401 && this.countUnauthorizeError !== 1) {
      const refreshToken = this.cookieService.get(REFRESH_TOKEN);
      this.countUnauthorizeError++;
      this.authenticationService
        .refreshToken(refreshToken)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (jwtToken: JwtToken) => {
            this.cookieService.set(ACCESS_TOKEN, jwtToken.accessToken);
            this.cookieService.set(REFRESH_TOKEN, jwtToken.refreshToken);
            return of(
              'We refreshed the token now do again what u were trying to do'
            );
          },
          error: (err: any) => {
            const email = localStorage.getItem(EMAIL_LOCALSTORAGE);
            this.authenticationService.provokeToken(email).subscribe({
              next: (result) => this.router.navigateByUrl('/'),
              complete: () => this.handleClearLocalStorageAndCookies(),
            });
          },
        });
      return of('Attempting to Refresh Tokens');
    } else {
      this.countUnauthorizeError = 0;
      return throwError(() => error);
    }
  }

  handleClearLocalStorageAndCookies = () => {
    localStorage.removeItem(EMAIL_LOCALSTORAGE);
    this.cookieService.delete(ACCESS_TOKEN);
    this.cookieService.delete(REFRESH_TOKEN);
  };
}
