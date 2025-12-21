import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../Interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private apiURL = "http://localhost:5097/api"

  private readonly http: HttpClient = inject(HttpClient);

  GetUserCreditCards(userId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.apiURL}/UserCreditCard/get-user-credit-card-sensitive-data/${userId}`);
  }

  RemoveUserCrediCard(crediCardId: number): Observable<ServiceResponse<boolean>> {
    return this.http.delete<ServiceResponse<boolean>>(`${this.apiURL}/CreditCard/remove-credit-card/${crediCardId}`);
  }
}
