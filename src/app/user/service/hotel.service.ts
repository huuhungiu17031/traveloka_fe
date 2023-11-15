import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpResponse, url } from './constant';
interface HotelInitialState {
  loading: boolean;
  data: any;
}
@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private LOCATION: string = '/location';
  private initialState: HotelInitialState = {
    loading: false,
    data: null,
  };
  private hotelState = new BehaviorSubject<HotelInitialState>(
    this.initialState
  );
  current = this.hotelState.asObservable();
  constructor(private http: HttpClient) {}

  changeState(payload: HotelInitialState) {
    this.hotelState.next(payload);
  }

  requestListHotelOnLocation(location?: string | null, price?: number) {
    const params = location
      ? new HttpParams().set('location', location)
      : undefined;
    return this.http.get<any>(url + '/hotel/search', { params }).pipe(
      map((httpResponse) => {
        this.changeState({ loading: false, data: httpResponse.data });
        return httpResponse.data;
      })
    );
  }

  getLocation(location: string | null = null): Observable<any> {
    const params = location
      ? new HttpParams().set('location', location)
      : undefined;

    return this.http
      .get<HttpResponse>(url + this.LOCATION, { params })
      .pipe(map((httpResponse) => httpResponse.data));
  }
}
