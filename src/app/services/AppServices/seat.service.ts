import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../Interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  GetAllVagonSeats(vagonId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.url}/Seat/get-all-vagon-seats/${vagonId}`);
  }

  BookSeat(bookSeatModel: any): Observable<ServiceResponse<true>> {
    return this.http.post<ServiceResponse<true>>(`${this.url}/Seat/book-seat`, bookSeatModel);
  }
}
