import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../Interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  RemoveTrain(trainId: number): Observable<ServiceResponse<boolean>> {
    return this.http.delete<ServiceResponse<boolean>>(`${this.url}/Train/remove-train/${trainId}`);
  }

  GetTrain(trainId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.url}/Train/get-train/${trainId}`);
  }

  AddTrain(addTrain: any): Observable<ServiceResponse<number>> {
    return this.http.post<ServiceResponse<number>>(`${this.url}/Train/add-train`, addTrain);
  }
}
