import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../components/form/login-form/login-form.component';
import { Observable, map } from 'rxjs';
import {
  HttpResponse,
  LOGIN_ENDPOINT,
  PROVOKE_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
  REGISTER_ENDPOINT,
  USER_INFO_ENDPOINT,
  url,
} from './constant';

import { RegisterForm } from '../components/form/register-form/register-form.component';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  private USER: string = '/user/';
  login(loginForm: LoginForm): Observable<any> {
    return this.http
      .post<HttpResponse>(url + this.USER + LOGIN_ENDPOINT, loginForm)
      .pipe(map((httpResponse) => httpResponse.data));
  }

  register(registerForm: RegisterForm): Observable<any> {
    return this.http
      .post<HttpResponse>(url + this.USER + REGISTER_ENDPOINT, registerForm)
      .pipe(map((httpResponse) => httpResponse.data));
  }

  getUserInfor(): Observable<any> {
    return this.http
      .get<HttpResponse>(url + this.USER + USER_INFO_ENDPOINT)
      .pipe(map((httpResponse) => httpResponse.data));
  }

  refreshToken(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<HttpResponse>(
      url + this.USER + REFRESH_TOKEN_ENDPOINT,
      refreshToken,
      { headers }
    );
  }

  provokeToken(email: string | null): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<HttpResponse>(
      url + this.USER + PROVOKE_ENDPOINT,
      email,
      { headers }
    );
  }
}
