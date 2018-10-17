import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Challenge } from '../model/Challenge';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({ providedIn: 'root'})
export class ChallengeService {

    private baseUrl = "http://www.testurl.com/"

    constructor(private http: HttpClient) { }

    getAllChallenges(): Observable<Challenge[]> {
        return this.http.get<Challenge[]>(this.baseUrl+"/getChallenges")
            .pipe(
                tap(challenges => console.log('fetched challenges')),
                catchError(this.handleError('getChallenges', []))
            );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
     
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
     
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}