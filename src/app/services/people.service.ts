import { Person } from './../models/person.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  getProfiles(search: string, startDate: string, endDate: string): Observable<any> {
    const params = { search: search, startDate: startDate, endDate: endDate }
    return this.httpClient.get(`${environment.apiUrl}/profiles`, { params: params })
      .pipe(
        catchError(error => {
          return error;
        })
      );
  }

  getProfile(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/profile/${id}`).pipe(
      catchError(error => {
        return error;
      })
    );
  }

  saveProfile(person: Person): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/profile`, person).pipe(
      catchError(error => {
        return error;
      })
    );
  }

  updateProfile(person: Person): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/profile/${person._id}`, person).pipe(
      catchError(error => {
        return error;
      })
    );
  }

  deleteProfile(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/profile/${id}`).pipe(
      catchError(error => {
        return error;
      })
    );
  }



}
