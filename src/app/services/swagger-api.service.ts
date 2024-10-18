import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../Interfaces/Station.interface';
import { Seat } from '../Interfaces/Seat.interface';
import { Train } from '../Interfaces/Train.interface';
import { Vagon } from '../Interfaces/Vagon.interface';
import { Departure } from '../Interfaces/Departure.interface';

@Injectable({
  providedIn: 'root'
})
export class SwaggerAPIService {
  private apiURL = 'https://railway.stepprojects.ge/api';
  
  constructor(private http: HttpClient) { }

  getStations() : Observable<Station[]> {
    return this.http.get<Station[]>(`${this.apiURL}/stations`);
  }

  getTrains() : Observable<Train[]> {
    return this.http.get<Train[]>(`${this.apiURL}/trains`);
  }

  getVagons() : Observable<Vagon[]> {
    return this.http.get<Vagon[]>(`${this.apiURL}/vagons`);
  }

  getDepartures() : Observable<Departure[]> {
    return this.http.get<Departure[]>(`${this.apiURL}/departures`);
  }
}
