import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  AutoCompleteComponent,
  Location,
  PayloadFormElement,
} from '../auto-complete/auto-complete.component';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrls: ['./search-tool.component.css'],
})
export class SearchToolComponent implements OnInit {
  searchForm: FormGroup;
  listLocation: Location[] = [];
  @ViewChild(AutoCompleteComponent, { static: false })
  autoCompleteComponent!: AutoCompleteComponent;
  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.fb.group({});
  }

  ngOnInit() {
    const storedData = localStorage.getItem('formSearchHotel');
    const currentRouteName = this.route.snapshot.routeConfig?.path;
    if (storedData !== null && currentRouteName !== '') {
      const searchHotelForm = JSON.parse(storedData);
      this.searchForm.setValue({
        location: searchHotelForm.location,
        checkIn: searchHotelForm.checkIn,
        checkOut: searchHotelForm.checkOut,
      });
      this.filterLocation(searchHotelForm.location);
    } else {
      this.filterLocation(null);
    }
  }

  onSubmit() {
    console.log("onSubmit", this.searchForm.value);
    // if (this.searchForm.valid) {
    //   localStorage.setItem(
    //     'formSearchHotel',
    //     JSON.stringify(this.searchForm.value)
    //   );
    //   this.hotelService
    //     .requestListHotelOnLocation(this.searchForm.get('location')?.value.name)
    //     .pipe(
    //       tap((payload) =>
    //         this.hotelService.changeState({ data: payload, loading: false })
    //       )
    //     )
    //     .subscribe({
    //       next: (value) => {
    //         this.router.navigate([
    //           'user/hotel/list',
    //           this.searchForm.get('location')?.value.name,
    //         ]);
    //       },
    //     });
    // }
  }

  filterLocation(event: Location | null) {
    this.hotelService.getLocation(event?.name).subscribe({
      next: (locations) => (this.listLocation = locations),
    });
  }
}
