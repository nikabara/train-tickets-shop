import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://api.everrest.educata.dev/auth'

  constructor(private http: HttpClient) { }

  saveSignIn() : void {
    if (!!sessionStorage.getItem('accessToken')) {
      localStorage.setItem('isAuthed', 'true');
    }
  }

  isAuthenticated() : boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem("isAuthed") === 'true' ? true : false;
    }
    return false;
  }

  signOut() : void {
    sessionStorage.removeItem('accessToken')
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthed');
    window.location.reload();
  }

  signIn(userData: any) : Observable<any> {
    return this.http.post<any>(`${this.apiURL}/sign_in`, userData);
  }

  signUp(userData: any) : Observable<any> {
    return this.http.post<any>(`${this.apiURL}/sign_up`, userData);
  }

  signInTap(email: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>(`${this.apiURL}/sign_in`, { email, password }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
      }),
      map(() => true)
    );
  }

  getUser(token: string) : Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiURL, { headers })
  }

  refreshToken(refreshToken: string) : Observable<any> {
    return this.http.post<any>(`${this.apiURL}/refresh`, { refresh_token: refreshToken });
  }

  updateAccessToken(accessToken: string) : void {
    sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
  }

  verifyUserEmail(email: string) : Observable<any> {
    return this.http.post<any>(`${this.apiURL}/verify_email`, { email });
  }
}


// {
//   "firstName": "nick",
//   "lastName": "baratashvili",
//   "age": 17,
//   "email": "stepproject@gmail.com",
//   "password": "Stepproject123",
//   "address": "Some address",
//   "phone": "+995577894516",
//   "zipcode": "3301",
//   "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s",
//   "gender": "MALE"
// }