import { Component, OnInit, OnDestroy } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
export interface PaginationResponse {
  content: any;
  last: boolean;
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
@Component({
  selector: 'app-booking-hotel',
  templateUrl: './booking-hotel.component.html',
  styleUrls: ['./booking-hotel.component.css'],
})
export class BookingHotelComponent implements OnInit, OnDestroy {
  listHotel: any;
  locationId!: string;
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramMap) =>
          this.hotelService.requestListHotelOnLocation(
            paramMap.get('locationId')
          )
        )
      )
      .subscribe((paginationResponse: PaginationResponse) => {
        this.listHotel = paginationResponse.content;
      });
  }
  ngOnDestroy(): void {}
}
