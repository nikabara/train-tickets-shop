import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ServiceResponse } from '../../Interfaces/common/ServiceResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainFilterService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  FilterTrains(filterModel: any): Observable<ServiceResponse<any[]>> {
    return this.http.post<ServiceResponse<any[]>>(`${this.url}/TrainFilter/filter-trains`, filterModel);
  }
}
