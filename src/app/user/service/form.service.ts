import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private httpClient: HttpClient) {}

  loginForm(): Observable<any> {
    return this.httpClient.get('assets/loginForm.json');
  }

  registerForm(): Observable<any> {
    return this.httpClient.get('assets/registerForm.json');
  }
}
