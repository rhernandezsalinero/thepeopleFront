import { Login } from './../models/login.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/login`, login)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  singup(login: Login) {
    return this.httpClient.post(`${environment.apiUrl}/signup`, login)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }
}
