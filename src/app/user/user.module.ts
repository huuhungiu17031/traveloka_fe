import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ShareModule } from '../share/share.module';
import { StickyHeaderDirective } from './directive/sticky-header.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoginFormComponent } from './components/form/login-form/login-form.component';
import { RegisterFormComponent } from './components/form/register-form/register-form.component';
import { BookingHotelComponent } from './page/booking-hotel/booking-hotel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchToolComponent } from './components/search-tool/search-tool.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptor/http-interceptor.service';
import { AutoCompleteFormComponent } from './components/form/auto-complete-form/auto-complete-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'hotel',
        component: BookingHotelComponent,
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    UserLayoutComponent,
    StickyHeaderDirective,
    DialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    BookingHotelComponent,
    SearchToolComponent,
    AutoCompleteFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    ReactiveFormsModule,
  ],
  providers: [
  
  ],
})
export class UserModule {}
