import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../Interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = "http://localhost:5097/api"

  constructor(private http: HttpClient) { }

  LogIn(email: string, password: string): Observable<any> {

    let params = new HttpParams().set("email", email).set("password", password);

    return this.http.post(`${this.apiURL}/Auth/log-in`, null, {params: params});
  }

  SendVerificationCode(userId: number): Observable<any> {
    return this.http.post(`${this.apiURL}/Auth/send-verification-code/${userId}`, null);
  }

  VerifyVerificationCode(email: string, code: string): Observable<any> {
    let params: HttpParams = new HttpParams().set("email", email).set("code", code);

    return this.http.post(`${this.apiURL}/Auth/verify-verification-code`, null, {params: params});
  }

  VerifyUserAdmin(userId: number): Observable<any> {
    return this.http.post(`${this.apiURL}/Auth/is-user-admin/${userId}`, null);
  }

  IsUserVerified(userId: number): Observable<any> {
    return this.http.post(`${this.apiURL}/Auth/is-user-verified/${userId}`, null);
  }

  RegisterUser(addUserModel: any): Observable<ServiceResponse<number>> {
    return this.http.post<ServiceResponse<number>>(`${this.apiURL}/Auth/register`, addUserModel);
  }
}
