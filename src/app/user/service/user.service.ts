import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserInfo {
  email: string | null;
  roles: string[] | null;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfor = new BehaviorSubject<UserInfo>({
    email: null,
    roles: null,
  });
  currentUser = this.userInfor.asObservable();
  constructor() {}

  updateUserInfor(userInfo: UserInfo) {
    this.userInfor.next(userInfo);
  }
}
