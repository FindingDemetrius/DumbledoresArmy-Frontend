import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Challenge } from '../model/Challenge';
import { User } from '../model/User';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({ providedIn: 'root'})
export class ChallengeService {

    private baseUrl = "https://geoquiz-1e874.appspot.com/api/v1"

    constructor(private http: HttpClient) { }

    getUser(username: string): Observable<User> {
        const url = `${this.baseUrl}/users/${username}`
        return this.http.get<User>(url)
    }

    getAllChallenges(): Observable<Challenge[]> {
        const url = `${this.baseUrl}/`
        return this.http.get<Challenge[]>(url)
            .pipe(
                tap(challenges => console.log('fetched challenges')),
                catchError(this.handleError('getChallenges', []))
            );
    }

    getGenresList(): Observable<string[]> {
        const url = `${this.baseUrl}/genres`
        return this.http.get<string[]>(url)
            .pipe(
                tap(genres => console.log('fetched genres')),
                catchError(this.handleError('getGenres', []))
            )
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