import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../Interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "http://localhost:5097/api"

  private readonly http: HttpClient = inject(HttpClient);

  GetUser(userId: number): Observable<ServiceResponse<any>> {
    const jwtAccessToken = localStorage.getItem('jwt_access_token_user');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtAccessToken}`);

    return this.http.get<ServiceResponse<any>>(`${this.apiURL}/User/admin/get-user/${userId}`, {headers: headers});
  }

  UpdateUser(userModel: any): Observable<ServiceResponse<boolean>> {
    const jwtAccessToken = localStorage.getItem('jwt_access_token_user');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtAccessToken}`);

    return this.http.put<ServiceResponse<boolean>>(`${this.apiURL}/User/admin/update-user`, userModel, {headers: headers});
  }
}
