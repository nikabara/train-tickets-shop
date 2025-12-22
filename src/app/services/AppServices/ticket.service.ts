import { ServiceResponse } from './../../Interfaces/common/ServiceResponse.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  GetAllUserTickets(userId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.url}/Ticket/get-all-user-tickets/${userId}`);
  }

  CancelTicket(ticketId: number): Observable<ServiceResponse<any>> {
    return this.http.delete<ServiceResponse<any>>(`${this.url}/Ticket/cancel-ticket/${ticketId}`);
  }
}
