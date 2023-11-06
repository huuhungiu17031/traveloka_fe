import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserInfo, UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog, private userService: UserService) {}
  isLogin: boolean = false;
  user!: UserInfo;
  ngOnInit(): void { 
    this.userService.currentUser.subscribe((user) => {
      if (user.email !== null && user.roles !== null) {
        this.isLogin = true;
        this.user = user;
      }
    });
  }

  openDialog(title: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
    });
  }
}
