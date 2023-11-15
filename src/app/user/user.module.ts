import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ShareModule } from '../share/share.module';
import { StickyHeaderDirective } from './directive/sticky-header.directive';
import { LoginFormComponent } from './components/form/login-form/login-form.component';
import { RegisterFormComponent } from './components/form/register-form/register-form.component';
import { BookingHotelComponent } from './page/booking-hotel/booking-hotel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchToolComponent } from './components/search-tool/search-tool.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { DatePickerRangeComponent } from './components/date-picker-range/date-picker-range.component';
import { ListHotelComponent } from './components/list-hotel/list-hotel.component';
import { CustomCardComponent } from './components/custom-card/custom-card.component';
import { DetailHotelComponent } from './page/detail-hotel/detail-hotel.component';
import { ListSortComponent } from './components/list-sort/list-sort.component';
import { DynamicFormComponent } from './components/form/dynamic-form/dynamic-form.component';
import { ErrorDisplayComponent } from './components/form/error-display/error-display.component';

const routes: Routes = [
  {
    path: 'hotel',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      { path: 'login', component: LoginFormComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterFormComponent, pathMatch: 'full' },
      {
        path: 'details/:hotelId',
        component: DetailHotelComponent,
      },
      {
        path: 'list/:locationId',
        component: BookingHotelComponent,
      },

      { path: '', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'hotel', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    UserLayoutComponent,
    StickyHeaderDirective,
    LoginFormComponent,
    RegisterFormComponent,
    BookingHotelComponent,
    SearchToolComponent,
    AutoCompleteComponent,
    DatePickerRangeComponent,
    ListHotelComponent,
    CustomCardComponent,
    ListSortComponent,
    DynamicFormComponent,
    ErrorDisplayComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class UserModule {}
