import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const API_URL_AUTH = environment.apiUrl + 'api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_URL_AUTH + 'signin', {
      username,
      password
    }, httpOptions).pipe(
      catchError((err) => {
        return EMPTY;
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(API_URL_AUTH + 'signup', {
      username,
      password
    }, httpOptions);
  }
}
