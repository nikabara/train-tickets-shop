// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Station } from '../Interfaces/Station.interface';
// import { Seat } from '../Interfaces/Seat.interface';
// import { Train } from '../Interfaces/Train.interface';
// import { Vagon } from '../Interfaces/Vagon.interface';
// import { Departure } from '../Interfaces/Departure.interface';
// import { Person } from '../Interfaces/Person.interface';
// import { Ticket } from '../Interfaces/Ticket.interface';
// import { RegisterTicket } from '../Interfaces/RegisterTicket.interface';

// @Injectable({
//   providedIn: 'root'
// })
//   export class SwaggerAPIService {
//   private apiURL = 'https://railway.stepprojects.ge/api';
  
//   constructor(private http: HttpClient) { }

//   getStations() : Observable<Station[]> {
//     return this.http.get<Station[]>(`${this.apiURL}/stations`);
//   }

//   getTrains() : Observable<Train[]> {
//     return this.http.get<Train[]>(`${this.apiURL}/trains`);
//   }

//   getVagons() : Observable<Vagon[]> {
//     return this.http.get<Vagon[]>(`${this.apiURL}/vagons`);
//   }

//   getDepartures() : Observable<Departure[]> {
//     return this.http.get<Departure[]>(`${this.apiURL}/departures`);
//   }

//   getTickets() : Observable<Ticket[]> {
//     return this.http.get<Ticket[]>(`${this.apiURL}/tickets`);
//   }

//   getSeat(seatId: string) : Observable<Seat> {
//     return this.http.get<Seat>(`${this.apiURL}/seat/${seatId}`)
//   }

//   postTicket(ticket: RegisterTicket) : Observable<RegisterTicket> {
//     return this.http.post<RegisterTicket>(`${this.apiURL}/tickets/register`, ticket);
//   }

//   checkTicketStatus(ticketId: string) : Observable<any> {
//     return this.http.get<any>(`${this.apiURL}/tickets/checkstatus/${ticketId}`)
//   }

//   confirmTicket(ticketId: string) : Observable<Ticket> {
//     return this.http.get<Ticket>(`${this.apiURL}/tickets/confirm/${ticketId}`);
//   }

//   cancelTicket(ticketId: string) : Observable<Ticket> {
//     return this.http.delete<Ticket>(`${this.apiURL}/tickets/cancel/${ticketId}`);
//   }

//   cancelAllTickets() : Observable<any> {
//     return this.http.delete<any>(`${this.apiURL}/tickets/cancelAll`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../Interfaces/Station.interface';
import { Seat } from '../Interfaces/Seat.interface';
import { Train } from '../Interfaces/Train.interface';
import { Vagon } from '../Interfaces/Vagon.interface';
import { Departure } from '../Interfaces/Departure.interface';
import { Person } from '../Interfaces/Person.interface';
import { Ticket } from '../Interfaces/Ticket.interface';
import { RegisterTicket } from '../Interfaces/RegisterTicket.interface';

@Injectable({
  providedIn: 'root'
})
  export class SwaggerAPIService {
    
  constructor(private http: HttpClient) { }

  getStations() : Observable<Station[]> {
    return this.http.get<Station[]>(`api/stations`);
  }

  getTrains() : Observable<Train[]> {
    return this.http.get<Train[]>(`api/trains`);
  }

  getVagons() : Observable<Vagon[]> {
    return this.http.get<Vagon[]>(`api/vagons`);
  }

  getDepartures() : Observable<Departure[]> {
    return this.http.get<Departure[]>(`api/departures`);
  }

  getTickets() : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`api/tickets`);
  }

  getSeat(seatId: string) : Observable<Seat> {
    return this.http.get<Seat>(`api/seat/${seatId}`)
  }

  postTicket(ticket: RegisterTicket) : Observable<RegisterTicket> {
    return this.http.post<RegisterTicket>(`api/tickets/register`, ticket);
  }

  checkTicketStatus(ticketId: string) : Observable<any> {
    return this.http.get<any>(`api/tickets/checkstatus/${ticketId}`)
  }

  confirmTicket(ticketId: string) : Observable<Ticket> {
    return this.http.get<Ticket>(`api/tickets/confirm/${ticketId}`);
  }

  cancelTicket(ticketId: string) : Observable<Ticket> {
    return this.http.delete<Ticket>(`api/tickets/cancel/${ticketId}`);
  }

  cancelAllTickets() : Observable<any> {
    return this.http.delete<any>(`api/tickets/cancelAll`);
  }
}
