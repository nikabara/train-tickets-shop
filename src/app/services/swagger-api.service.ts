import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../Interfaces/Station.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwaggerAPIService {
  private apiURL = 'https://railway.stepprojects.ge/api/stations';
  
  constructor(private http: HttpClient) { }

  getStations() : Observable<Station[]> {
    return this.http.get<Station[]>(this.apiURL);
  }
}
