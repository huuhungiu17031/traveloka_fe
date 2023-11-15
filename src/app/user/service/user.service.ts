import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserInfo {
  email: string;
  roles: string[];
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfor = new BehaviorSubject<UserInfo>({
    email: '',
    roles: [],
  });
  currentUser = this.userInfor.asObservable();
  constructor() {}

  updateUserInfor(userInfo: UserInfo) {
    this.userInfor.next(userInfo);
  }
}
